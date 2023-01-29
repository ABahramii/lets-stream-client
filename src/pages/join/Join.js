import "./join.css"
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import checkLogin from "../../service/checkLogin";
import useFetch from "../../hooks/useFetch";
import authData from "../../data/authData";
import testImg from "../../images/dark-logo.png";

export default function Join() {
    const [guestName, setGuestName] = useState("");
    const [roomName, setRoomName] = useState("");

    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    const [fetchRoomRequest] = useFetch();
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

    const joinRoom = (roomUUID) => {
        let member = {};
        setIsLogin(checkLogin());

        // Todo: handle this item in user member join method
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

        checkJoinRequest({
            url: `room/${roomUUID}/checkJoin`,
            method: "POST",
            data: member
        }).then(res => {
            if (res.data.canJoin) {
                navigate(`/room/${roomUUID}`);
            } else {
                // Todo: duplicate error with toast
                console.log("user already exists at room");
            }
        }).catch(exp => {
            console.log(JSON.stringify(exp));
        })
    }


    const handleJoin = (event) => {
        event.preventDefault();

        fetchRoomRequest({
            url: `/room/${roomName}`,
            method: "GET",
        }).then(res => {
            if (res.data) {
                joinRoom(res.data);
            }
        }).catch(exp => {
            // Todo: toast message
            console.log("room not found");
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
                                    required
                                    placeholder="Enter room name..."
                                />
                            </label>
                        </div>

                        {/*Todo: select avatar when user logged in */}
                        {/*<div className="form__field__wrapper">
                            <label>Select Avatar</label>
                            <div id="avatar__selection">
                                <img className="avatar__option avatar__option__selected" src={testImg} alt=""/>
                                <img className="avatar__option" src={testImg} alt=""/>
                                <img className="avatar__option" src={testImg} alt=""/>
                                <img className="avatar__option" src={testImg} alt=""/>
                                <img className="avatar__option" src={testImg} alt=""/>
                                <img className="avatar__option" src={testImg} alt=""/>
                                <img className="avatar__option" src={testImg} alt=""/>
                            </div>
                        </div>*/}

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
