import "./room.css";
import {useState} from "react";
import {useAuthContext} from "../../hooks/useAuthContext";
// import { over } from "stompjs";
// import SockJS from "sockjs-client";

// import { Client, Message } from '@stomp/stompjs';


import testImg from "../../images/dark-logo.png";
import { useStomp } from "usestomp-hook/lib";

// let stompClient = null;

export default function Room() {
    const { state: user } = useAuthContext();
    const [sendMessage, setSendMessage] = useState("");
    const [publicChats, setPublicChats] = useState([]);
    const [members, setMembers] = useState([]);

    // const [stompClient, setStompClient] = useState();

    /*const { disconnect, subscribe, unsubscribe, subscriptions, send, isConnected } =
        useStomp({
            brokerURL: "ws://localhost:8080/ws",
        }, () => registerUser);*/
    const {subscribe, send} =
        useStomp({
            brokerURL: "ws://localhost:8080/ws",
        }, () => registerUser());


    /*useEffect(() => {
        if (user) {
            console.log("hello register");
            registerUser();
        }
    }, []);*/

    const registerUser = () => {
        // stompClient.connect({}, onConnected, (err) => console.log(err))
        console.log("in registerUser body")
        onConnected();
    }

    const onConnected = () => {
        subscribe("/chatroom/public", (body) => {
            // console.log(body);
            switch (body.status) {
                case "JOIN":
                    console.log("JOIN: i called", body.senderName);
                    console.log(members);
                    setMembers(prevState => [...prevState, body.senderName]);
                    console.log(members);

                    break;
                case "MESSAGE":
                    console.log("message received");
                    console.log(publicChats);
                    setPublicChats(prev => [...prev, body] );
                    console.log("chats\n", publicChats);
                    break;
                default:
                    break;
            }
        });
        // stompClient.subscribe("/user/" + user.username + "/private", onPrivateMessageReceived);
        userJoin();
    }

    const userJoin = () => {
        let chatMessage = {
            senderName: user.username,
            message: sendMessage,
            date: new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"}),
            status: "JOIN"
        }
        console.log("in userJoin body", chatMessage)
        send("/app/message", chatMessage, {});
    }

    const onPublicMessageReceived = (payloadData) => {
        // const payloadData = JSON.parse(payload.body);
        console.log("hello public message", payloadData)
        switch (payloadData.status) {
            case "JOIN":
                console.log("JOIN: i called", payloadData.senderName);
                console.log(members);
                setMembers(prevState => [...prevState, payloadData.senderName]);
                console.log(members);

                break;
            case "MESSAGE":
                console.log("message received");
                console.log(publicChats);
                setPublicChats(prev => [...prev, payloadData] );
                console.log("chats\n", publicChats);
                break;
            default:
                break;
        }
    }

    const handleKeyDown = (event) => {
        event.preventDefault();
        if (event.key === "Enter") {
            console.log(sendMessage);
        }
    }

    /*const sendPublicMessage = () => {
        if (stompClient) {
            let chatMessage = {
                senderName: user.username,
                message: sendMessage,
                date: Date.now().toString(),
                status: "MESSAGE"
            }
            stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
            setSendMessage("");
        }
    }*/

    return (
        <>
            { user &&
                <main className="container">
                    <div id="room__container">

                        {/* Todo: section 1 */}
                        <section id="members__container">
                            <div id="members__header">
                                <p>Participants</p>
                                <strong id="members__count">{members.length}</strong>
                            </div>

                            <div id="member__list">
                                {/*<div className="member__wrapper">
                                    <span className="green__icon"></span>
                                    <p className="member_name">{user.username}</p>
                                </div>*/}

                                {
                                    members.map((member, index) => (
                                        <div key={index} className="member__wrapper">
                                            <span className="green__icon"></span>
                                            <p className="member_name">{member}</p>
                                        </div>
                                    ))
                                }


                                {/*<div className="member__wrapper">
                                    <span className="green__icon"></span>
                                    <p className="member_name">afshin</p>
                                </div>
                                <div className="member__wrapper">
                                    <span className="green__icon"></span>
                                    <p className="member_name">james gosling</p>
                                </div>*/}
                            </div>
                        </section>

                        {/* Todo: section 2*/}
                        <section id="stream__container">
                            <div id="stream__box"></div>

                            <div id="streams__container"></div>

                            <div className="stream__actions">
                                <button id="camera-btn" className="active">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path
                                            d="M5 4h-3v-1h3v1zm10.93 0l.812 1.219c.743 1.115 1.987 1.781 3.328 1.781h1.93v13h-20v-13h3.93c1.341 0 2.585-.666 3.328-1.781l.812-1.219h5.86zm1.07-2h-8l-1.406 2.109c-.371.557-.995.891-1.664.891h-5.93v17h24v-17h-3.93c-.669 0-1.293-.334-1.664-.891l-1.406-2.109zm-11 8c0-.552-.447-1-1-1s-1 .448-1 1 .447 1 1 1 1-.448 1-1zm7 0c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0-2c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5z"/>
                                    </svg>
                                </button>
                                <button id="mic-btn" className="active">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path
                                            d="M12 2c1.103 0 2 .897 2 2v7c0 1.103-.897 2-2 2s-2-.897-2-2v-7c0-1.103.897-2 2-2zm0-2c-2.209 0-4 1.791-4 4v7c0 2.209 1.791 4 4 4s4-1.791 4-4v-7c0-2.209-1.791-4-4-4zm8 9v2c0 4.418-3.582 8-8 8s-8-3.582-8-8v-2h2v2c0 3.309 2.691 6 6 6s6-2.691 6-6v-2h2zm-7 13v-2h-2v2h-4v2h10v-2h-4z"/>
                                    </svg>
                                </button>
                                <button id="screen-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path
                                            d="M0 1v17h24v-17h-24zm22 15h-20v-13h20v13zm-6.599 4l2.599 3h-12l2.599-3h6.802z"/>
                                    </svg>
                                </button>
                                <button id="leave-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M16 10v-5l8 7-8 7v-5h-8v-4h8zm-16-8v20h14v-2h-12v-16h12v-2h-14z"/>
                                    </svg>
                                </button>
                            </div>

                            <button id="join-btn">Join Stream</button>
                        </section>

                        {/* Todo: section 3*/}
                        <section id="messages__container">
                            <div id="messages">
                                {
                                    publicChats.map((msg, index) => (
                                        <div key={index} className="message__wrapper">
                                            <ima className="avatar__md" src="../../images/dark-logo.png"/>
                                            <div className="message__body">
                                                <strong className="message__author">{msg.senderName}</strong>
                                                <small className="message__timestamp">{msg.date}</small>
                                                <p className="message__text">{msg.message}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                                <div className="message__wrapper">
                                    <img className="avatar__md" src={testImg} alt="world"/>
                                    <div className="message__body">
                                        <strong className="message__author">Amir</strong>
                                        <small className="message__timestamp">9:33 AM</small>
                                        <p className="message__text">hello world, front-end is not bad ! </p>
                                    </div>
                                </div>
                            </div>

                            <form id="message__form">
                                <input
                                    type="text"
                                    onChange={(event) => setSendMessage(event.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Send a message...."
                                />
                            </form>

                        </section>
                    </div>
                </main>
            }
        </>
    );
}
