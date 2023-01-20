import "./room.css";
import {useEffect, useState} from "react";
import testImg from "../../images/dark-logo.png";
import {useStomp} from "usestomp-hook/lib";
import useFetch from "../../hooks/useFetch";
import {useNavigate, useParams} from "react-router-dom";
import checkLogin from "../../service/checkLogin";
import Stream from "../../components/Stream";

export default function Room() {
    const {UUID} = useParams();
    const [sendMessage, setSendMessage] = useState("");
    const [chats, setChats] = useState([]);
    const [members, setMembers] = useState([]);

    const [fetchRoomRequest] = useFetch();
    const [fetchMembersReq] = useFetch();
    const [fetchChatsReq] = useFetch();
    const navigate = useNavigate();

    const {subscribe, send} = useStomp(
        {
            brokerURL: "ws://localhost:8080/ws"
        },
        () => onConnected()
    );

    useEffect(() => {
        fetchRoomRequest({
            url: `room/exists/${UUID}`,
            method: "GET",
        }).then(res => {
            if (res.data.exists) {
                fetchMembers();
                fetchChats();
            } else {
                // Todo: navigate to NotFound page
                navigate("/join");
            }
        }).catch(exp => {
            navigate("/join");
        })
    }, []);

    const fetchMembers = () => {
        fetchMembersReq({
            url: `/room/${UUID}/members`,
            method: "GET",
        }).then(res => {
            setMembers(members.concat(res.data));
        }).catch(exp => {
            console.log("could not fetch users")
        })
    }

    const fetchChats = () => {
        fetchChatsReq({
            url: `/room/${UUID}/chats`,
            method: "GET",
        }).then(res => {
            setChats(chats.concat(res.data));
        }).catch(exp => {
            console.log("could not fetch users")
        })
    }

    const onConnected = () => {
        subscribe(`/room/members/${UUID}`, (data) => {
            onMemberJoin(data);
        });
        subscribe(`/room/chats/${UUID}`, (data) => {
            onChatReceived(data);
        });
        memberJoin();
    }

    const memberJoin = () => {
        if (localStorage.getItem("username") == null && localStorage.getItem("guestName") == null) {
            navigate("/join");
            window.location.reload();
        }

        let isLogin = checkLogin();
        let member = {
            name: isLogin ? localStorage.getItem("username") : localStorage.getItem("guestName"),
            user: isLogin
        }
        send(`/app/member/${UUID}`, member, {});
    }

    const onMemberJoin = (data) => {
        if (data.name !== undefined) {
            setMembers(prevState => [...prevState, data]);
        }
    }

    const onChatReceived = (data) => {
        let chat = {
            message: data.message,
            time: data.time,
            senderName: data.senderName,
            senderIsUser: data.senderIsUser
        }
        setChats(prevState => [...prevState, chat]);
    }

    const handleSendMessage = (event) => {
        event.preventDefault();
        if (sendMessage !== "") {
            sendChat();
            setSendMessage("");
        }
    }

    // Todo: send request with authentication
    const sendChat = () => {
        let isLogin = checkLogin();

        if (isLogin) {
            let chat = {
                message: sendMessage,
                time: new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"}),
                senderName: localStorage.getItem("username"),
                senderIsUser: isLogin
            }
            send(`/app/chat/${UUID}`, chat, {});
        } else {
            // Todo: toast -> you must logged in to send message
        }
    }

    return (
        <>
            <main className="container">
                <div id="room__container">

                    {/* Todo: section 1 */}
                    <section id="members__container">
                        <div id="members__header">
                            <p>Participants</p>
                            <strong id="members__count">{members.length}</strong>
                        </div>

                        <div id="member__list">
                            {
                                members.map((member, index) => (
                                    <div key={index} className="member__wrapper">
                                        <span className="green__icon"></span>
                                        <p className="member_name">{member.name}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </section>

                    {/* Todo: section 2*/}
                    <Stream />

                    {/* Todo: section 3*/}
                    {/*let messagesContainer = document.getElementById('messages');*/}
                    {/*messagesContainer.scrollTop = messagesContainer.scrollHeight;*/}
                    <section id="messages__container">
                        <div id="messages">
                            {
                                chats.map((chat, index) => (
                                    <div key={index} className="message__wrapper">
                                        {/*<img className="avatar__md" src={testImg} alt="world"/>*/}
                                        <div className="message__body">
                                            <strong className="message__author">{chat.senderName}</strong>
                                            <small className="message__timestamp">{chat.time}</small>
                                            <p className="message__text">{chat.message}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        <form id="message__form" onSubmit={handleSendMessage}>
                            <input
                                type="text"
                                value={sendMessage}
                                onChange={(event) => setSendMessage(event.target.value)}
                                placeholder="Send a message...."
                            />
                        </form>

                    </section>
                </div>
            </main>
        </>
    );
}
