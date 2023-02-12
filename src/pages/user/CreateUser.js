import {useState} from "react";
import {useNavigate} from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import authData from "../../data/authData";

export default function CreateUser() {
    const onlyAlphabetReg = /^[A-Za-z\s]+$/;

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const [signupRequest] = useFetch();

    const handleLogin = (event) => {
        event.preventDefault();
        if (password.length >= 8) {
            signupRequest({
                url: `/users/create`,
                method: "POST",
                data: {
                    name,
                    username,
                    password
                }
            }).then(res => {
                const data = res.data;
                authData.saveAuthData(data.accessToken, data.accessTokenExpireAt, data.username);
                navigate("/");
                window.location.reload();
            }).catch(exp => {
                // Todo: use toast
                alert("username already taken.")
            });
        } else {
            alert("password must be at least 8 character");
        }
    }

    const handleInputNameChange = (event) => {
        const {value} = event.target;

        if (value === "" || onlyAlphabetReg.test(value)) {
            setName(value);
        }
    }

    return (
        <div>
            <div id="room__lobby__container">
                <div id="form__container">
                    <div id="form__container__header">
                        <p>Signup</p>
                    </div>

                    <form id="lobby__form" onSubmit={handleLogin}>
                        <div className="form__field__wrapper">
                            <label>Name</label>
                            <label>
                                <input type="text"
                                       name="name"
                                       onChange={event => handleInputNameChange(event)}
                                       value={name}
                                       required
                                       placeholder="Enter your name..."
                                />
                            </label>
                        </div>

                        {/*Todo: username must include at least one char*/}
                        <div className="form__field__wrapper">
                            <label>Username</label>
                            <label>
                                <input type="text"
                                       name="username"
                                       onChange={e => setUsername(e.target.value)}
                                       value={username}
                                       required
                                       placeholder="Enter your username..."
                                />
                            </label>
                        </div>

                        {/*Todo: check password weakness*/}
                        <div className="form__field__wrapper">
                            <label>Password</label>
                            <label>
                                <input
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    required
                                    placeholder="Enter your password..."
                                />
                            </label>
                        </div>

                        <div className="form__field__wrapper">
                            <button> Signup </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
