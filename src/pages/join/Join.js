import "./join.css"
import {useAuthContext} from "../../hooks/useAuthContext";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

export default function Join() {

    const [username, setUsername] = useState("");
    const [roomName, setRoomName] = useState("");

    const {dispatch} = useAuthContext();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({type: "CONNECT", payload: username});
        navigate("/room");
    }

    return (
        <>
            <main id="room__lobby__container">

                <div id="form__container">
                    <div id="form__container__header">
                        <p>👋 Create or Join Room</p>
                    </div>

                    <form id="lobby__form" onSubmit={handleSubmit}>
                        <div className="form__field__wrapper">
                            <label>Your Name</label>
                            <label>
                                <input type="text"
                                       name="name"
                                       onChange={(e) => setUsername(e.target.value)}
                                       value={username}
                                       required
                                       placeholder="Enter your display name..."
                                />
                            </label>
                        </div>

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
