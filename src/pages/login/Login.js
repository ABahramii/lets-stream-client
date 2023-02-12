import "../join/join.css"
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import authData from "../../data/authData";
import Swal from 'sweetalert2'

import withReactContent from 'sweetalert2-react-content'

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const [loginReq] = useFetch();
    const MySwal = withReactContent(Swal);
    const handleLogin = (event) => {
        event.preventDefault();
        loginReq({
            url: `/auth/authenticate`,
            method: "POST",
            data: {
                username,
                password
            }
        }).then(res => {
            const data = res.data;
            authData.saveAuthData(data.accessToken, data.accessTokenExpireAt, data.username);
            navigate("/");
            window.location.reload();
        }).catch(exp => {
            console.log(JSON.stringify(exp))
            // Todo: use toast
            alert("Username or Password is incorrect!");
        })
    }

    return (
        <>
            <div id="room__lobby__container">
                <div id="form__container">
                    <div id="form__container__header">
                        <p>Login</p>
                    </div>

                    <form id="lobby__form" onSubmit={handleLogin}>
                        <div className="form__field__wrapper">
                            <label>Username</label>
                            <label>
                                <input type="text"
                                       name="name"
                                       onChange={e => setUsername(e.target.value)}
                                       value={username}
                                       required
                                       placeholder="Enter your username..."
                                />
                            </label>
                        </div>

                        <div className="form__field__wrapper">
                            <label>Password</label>
                            <label>
                                <input
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    placeholder="Enter your password..."
                                />
                            </label>
                        </div>

                        <div className="form__field__wrapper">
                            <button> Login
                                {/*<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
                                </svg>*/}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
