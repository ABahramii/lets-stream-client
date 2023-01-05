import "./join.css"
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import checkLogin from "../../service/checkLogin";
import useFetch from "../../hooks/useFetch";
import authData from "../../data/authData";

export default function Join() {
    const [guestName, setGuestName] = useState("");
    const [roomName, setRoomName] = useState("");

    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    const [fetchUserRequest] = useFetch();
    const [checkJoinRequest] = useFetch();

    useEffect(() => {
        setIsLogin(checkLogin());
    }, [isLogin])

    const onError = () => {
        authData.removeAuthData();
        navigate("/login");
        window.location.reload();
    }

    const handleJoin = (event) => {
        event.preventDefault();
        let member = {};
        setIsLogin(checkLogin());

        if (isLogin) {
            fetchUserRequest({
                url: "/auth/token/isValid",
                method: "POST",
                data: {
                    username: localStorage.getItem("username"),
                    token: localStorage.getItem("token")
                }
            }).then(res => {
                if (res.data.isTokenValid) {
                    member.name = localStorage.getItem("username");
                    member.user = true;
                } else {
                    onError();
                }
            }).catch(exp => {
                onError();
            })
        } else {
            localStorage.setItem("guestName", guestName);
            member.name = guestName;
            member.user = false;
        }

        console.log("member: ", member)

        checkJoinRequest({
            url: `room/4ba4c171-8023-450f-ac2d-aa6d15257ce5/checkJoin`,
            method: "POST",
            data: member
        }).then(res => {
            console.log(res.data);
            if (res.data.canJoin) {
                navigate("/room")
            } else {
                // Todo: duplicte error with toast
                console.log("user already exists at room");
            }
        }).catch(exp => {
            console.log(JSON.stringify(exp));
        })
    }

    return (
        <>
            <main id="room__lobby__container">

                <div id="form__container">
                    <div id="form__container__header">
                        <p>👋 Join Room</p>
                    </div>

                    <form id="lobby__form" onSubmit={handleJoin}>
                        {!isLogin &&
                            <div className="form__field__wrapper">
                                <label>Your Name</label>
                                <label>
                                    <input type="text"
                                           name="name"
                                           onChange={(e) => setGuestName(e.target.value)}
                                           value={guestName}
                                           required
                                           placeholder="Enter your display name..."
                                    />
                                </label>
                            </div>
                        }

                        <div className="form__field__wrapper">
                            <label>Room Name</label>
                            <label>
                                <input
                                    type="text"
                                    onChange={(e) => setRoomName(e.target.value)}
                                    value={roomName}
                                    placeholder="Enter room name..."
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
            </main>
        </>
    );
}
