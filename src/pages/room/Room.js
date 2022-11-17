import "./room.css";
import {useEffect, useState} from "react";
import {useAuthContext} from "../../hooks/useAuthContext";
import { over } from "stompjs"
import SockJS from "sockjs-client"

let stompClient = null;

export default function Room() {
    const { state: user } = useAuthContext();
    const [chatsCount, setChatsCount] = useState(1);
    const [sendMessage, setSendMessage] = useState("");
    const [publicChats, setPublicChats] = useState([{senderName: "ab", date: "NOV 17", status: "MESSAGE", message: "hello world"}]);
    const [privateChats, setPrivateChats] = useState(new Map());
    const [tab, setTab] = useState("PUBLIC");

    useEffect(() => {
        if (user) {
            registerUser();
        }
    }, []);

    const registerUser = () => {
        let sock = new SockJS("http://localhost:8080/ws");
        stompClient = over(sock);
        stompClient.connect({}, onConnected, onError)
    }

    const onConnected = () => {
        stompClient.subscribe("/chatroom/public", onPublicMessageReceived);
        stompClient.subscribe("/user/" + user.username + "/private", onPrivateMessageReceived);
        userJoin();
    }

    const userJoin = () => {
        let chatMessage = {
            senderName: user.username,
            message: sendMessage,
            date: Date.now().toString(),
            status: "JOIN"
        }
        stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    }

    const onPublicMessageReceived = (payload) => {
        const payloadData = JSON.parse(payload.body);
        switch (payloadData.status) {
            case "JOIN":
                privateChats.set(payloadData.senderName, []);
                setPrivateChats(new Map(privateChats));
                break;
            case "MESSAGE":
                publicChats.push(payloadData);
                setPublicChats(...publicChats);
                console.log("chats\n", publicChats);
                break;
            default:
                break;
        }
    }

    const onPrivateMessageReceived = (payload) => {
        const payloadData = JSON.parse(payload.body);
        if (privateChats.get(payloadData.senderName)) {
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
        } else {
            let num = chatsCount + 1;
            setChatsCount(num);

            let list = [];
            list.push(payloadData);
            privateChats.set(payloadData.senderName, list);
            setPrivateChats(new Map(privateChats));
        }
    }

    const onError = (err) => {
        console.log(err)
    }

    const handleChatClick = (chat) => {
        console.log(chat, Date.now());
        setTab(chat);
    }

    const handleSendPublicMessage = () => {
        if (stompClient) {
            let chatMessage = {
                senderName: user.username,
                message: sendMessage,
                date: Date.now().toString(),
                status: "MESSAGE"
            }
            console.log("hello send public msg")
            stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
            setSendMessage("");
        } else {
            console.log("stompClient is null");
        }
    }

    const handleSendPrivateMessage = () => {
        if (stompClient) {
            let chatMessage = {
                senderName: user.username,
                receiverName: tab,
                message: sendMessage,
                date: Date.now().toString(),
                status: "MESSAGE"
            }
            if (user.username !== tab) {
                privateChats.get(tab).push(sendMessage);
                setPrivateChats(new Map(privateChats));
            }
            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
            setSendMessage("");
        }
    }

    return (
        <>
            <header>
                <h1>{user.username} </h1>
            </header>

            { user &&
                <main id="room_container">
                    <section id="participants_container">
                        <div id="participants_header">
                            <p>Room Members</p>
                            <p>{chatsCount}</p>
                        </div>
                        <div className="member_wrapper">
                            <span className="green_dot"></span>
                            <button onClick={() => handleChatClick("PUBLIC")}>ChatRoom</button>
                        </div>
                        {
                            [...privateChats.keys()].map((name, index) => (
                            <div key={index} className="member_wrapper">
                                <span className="green_dot"></span>
                                <button onClick={() => handleChatClick(name)}>{name}</button>
                            </div>
                            ))
                        }
                    </section>

                    {tab === "PUBLIC" &&
                        <section id="chat_container">
                            {
                                publicChats.map((msg, index) => (
                                    <div key={index} className="message-wrapper">
                                        <p>{msg.senderName} - {msg.date}</p>
                                        <p className="message">
                                            {msg.message}
                                        </p>
                                    </div>
                                ))
                            }
                            <div>
                                <input
                                    type="text"
                                    value={sendMessage}
                                    onChange={(event) => setSendMessage(event.target.value)}
                                />
                                <button onClick={handleSendPublicMessage}>send</button>
                            </div>
                        </section>
                    }

                    {tab !== "PUBLIC" &&
                        <section id="chat_container">
                            {
                                privateChats.get(tab).map((msg) => (
                                    <div className="message-wrapper">
                                        <p>{msg.senderName} - {msg.date}</p>
                                        <p className="message">
                                            {msg.message}
                                        </p>
                                    </div>
                                ))
                            }
                        </section>
                    }

                </main>
            }
        </>
    );
}
