import "./join.css"
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import checkLogin from "../../service/checkLogin";
import useAuthRequest from "../../hooks/useAuthRequest";
import useFetch from "../../hooks/useFetch";
import authData from "../../data/authData";

export default function JoinPrivate() {
    const [roomPrivateCode, setRoomPrivateCode] = useState("");

    const navigate = useNavigate();
    const [request] = useAuthRequest();
    const [checkJoinRequest] = useFetch();

    const joinRoom = (roomUUID) => {
        const username = localStorage.getItem("username");

        if (username) {
            const member = {
                name: localStorage.getItem("username"),
                user: true
            }
            checkJoinRequest({
                url: `room/${roomUUID}/checkJoin`,
                method: "POST",
                data: member
            }).then(res => {
                if (res.data.canJoin) {
                    navigate(`/room/${roomUUID}`);
                } else {
                    // Todo: duplicate error with toast
                    alert("You Already Exists At Room");
                }
            }).catch(exp => {
                console.log(JSON.stringify(exp));
            })
        } else {
            authData.removeAuthData();
            navigate("/login");
        }
    }


    const handleJoin = (event) => {
        event.preventDefault();
        request({
            url: `/room/private/${roomPrivateCode}`,
            method: "GET",
        }).then(res => {
            if (res.data) {
                joinRoom(res.data);
            }
        }).catch(exp => {
            alert("Room Not Found");
        })
    }

    return (
        <div id="room__lobby__container">
            <div id="form__container">
                <div id="form__container__header">
                    <p>👋 Join Room</p>
                </div>

                <form id="lobby__form" onSubmit={handleJoin}>
                    <div className="form__field__wrapper">
                        <label>Room Private Code</label>
                        <label>
                            <input
                                type="text"
                                onChange={(e) => setRoomPrivateCode(e.target.value)}
                                value={roomPrivateCode}
                                required
                                placeholder="Enter room private code..."
                            />
                        </label>
                    </div>
                    <div className="form__field__wrapper">
                        <button> Go to Room
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path
                                    d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
