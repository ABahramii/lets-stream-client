import "./room.css";
import {useEffect, useState} from "react";
import {useAuthContext} from "../../hooks/useAuthContext";
import { over } from "stompjs";
import SockJS from "sockjs-client";

import testImg from "../../images/dark-logo.png";

let stompClient = null;

export default function Room() {
    const { state: user } = useAuthContext();
    const [chatsCount, setChatsCount] = useState(1);
    const [sendMessage, setSendMessage] = useState("");
    const [publicChats, setPublicChats] = useState([]);
    const [privateChats, setPrivateChats] = useState(new Map());
    const [tab, setTab] = useState("PUBLIC");

    useEffect(() => {
        if (user) {
            console.log("hello register");
            registerUser();
        }
    }, []);

    const registerUser = () => {
        let sock = new SockJS("http://localhost:8080/ws");
        stompClient = over(sock);
        stompClient.debug = null;
        stompClient.connect({}, onConnected, onError)
    }

    const onConnected = () => {
        stompClient.subscribe("/chatroom/public", onPublicMessageReceived);
        stompClient.subscribe("/user/" + user.username + "/private", onPrivateMessageReceived);
        userJoin();
    }

    const userJoin = () => {
        console.log("user joinded");
        let chatMessage = {
            senderName: user.username,
            message: sendMessage,
            date: new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"}),
            status: "JOIN"
        }
        stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    }

    const onPublicMessageReceived = (payload) => {
        const payloadData = JSON.parse(payload.body);
        switch (payloadData.status) {
            case "JOIN":
                // privateChats.set(payloadData.senderName, []);
                // setPrivateChats(prevState => new Map(prevState));
                setPrivateChats(prevState => {
                    let map = new Map(prevState);
                    map.set(payloadData.senderName, []);
                    return map;
                });
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

    const onPrivateMessageReceived = (payload) => {
        const payloadData = JSON.parse(payload.body);
        if (privateChats.get(payloadData.senderName)) {
            setPrivateChats(prevState => {
                let map = new Map(prevState);
                map.get(payloadData.senderName).push(payloadData);
                return map;
            });
        } else {
            let num = chatsCount + 1;
            setChatsCount(num);

            let list = [];
            list.push(payloadData);

            setPrivateChats(prevState => {
                let map = new Map(prevState);
                map.set(payloadData.senderName, list);
                return map;
            });
        }
    }

    const onError = (err) => {
        console.log(err)
    }

    /*const handleChatClick = (chat) => {
        console.log(chat, Date.now());
        setTab(chat);
    }*/

    /*const handleSendPublicMessage = () => {
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

    /*const handleSendPrivateMessage = () => {
        if (stompClient) {
            let chatMessage = {
                senderName: user.username,
                receiverName: tab,
                message: sendMessage,
                date: Date.now().toString(),
                status: "MESSAGE"
            }
            console.log("private message", chatMessage)
            if (user.username !== tab) {
                // privateChats.get(tab).push(sendMessage);
                // setPrivateChats(new Map(privateChats));
                console.log("send message to " + tab);
                console.log("before update private chates: ", privateChats.get(tab));
                setPrivateChats(prevState => {
                    let map = new Map(prevState);
                    map.get(tab).push(sendMessage);
                    return map;
                });
            }
            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
            setSendMessage("");
        }
    }*/

    const handleKeyDown = (event) => {
        event.preventDefault();
        if (event.key === 'Enter') {
            console.log(sendMessage);
        }
    }

    return (
        <>
            { user &&
                <main className="container">
                    <div id="room__container">

                        {/* Todo: section 1 */}
                        <section id="members__container">
                            <div id="members__header">
                                <p>Participants</p>
                                <strong id="members__count">{chatsCount}</strong>
                            </div>

                            <div id="member__list">
                                <div className="member__wrapper">
                                    <span className="green__icon"></span>
                                    <p className="member_name">{user.username}</p>
                                </div>
                                <div className="member__wrapper">
                                    <span className="green__icon"></span>
                                    <p className="member_name">afshin</p>
                                </div>
                                <div className="member__wrapper">
                                    <span className="green__icon"></span>
                                    <p className="member_name">james gosling</p>
                                </div>
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
                                            <img className="avatar__md" src="../../images/dark-logo.png"/>
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
                                    value={sendMessage}
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
