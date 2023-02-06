import "./lobby.css"
import {useEffect, useState} from "react";
import membersIcon from '../../images/members-icon.png'
import checkLogin from "../../service/checkLogin";
import useFetch from "../../hooks/useFetch";
import {BASE_URL} from "../../config/Url";
import authData from "../../data/authData";
import {useNavigate} from "react-router-dom";


export default function Lobby() {

    const navigate = useNavigate();
    const [request] = useFetch();
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        request({
            url: "/room",
            method: "GET",
        }).then(res => {
            const data = res.data;
            if (data) {
                setRooms(rooms.concat(data));
            }
        }).catch(exp => {
            console.log(JSON.stringify(exp));
        })
    }, []);

    const imageLink = (uuid) => {
        return `${BASE_URL}/room/image/${uuid}`;
    }

    const joinRoom = (roomUUID) => {
        let member = {};
        let isLogin = checkLogin();

        if (isLogin) {
            request({
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
            navigate("/join")
        }

        request({
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

    const onError = () => {
        authData.removeAuthData();
        navigate("/login");
        window.location.reload();
    }

    const handleJoin = (event, uuid) => {
        event.preventDefault();
        joinRoom(uuid);
    }

    return (
        <div className="a1">
            <div className='a2'>
                {
                    rooms.map((room, index) =>
                        <div key={index} className='a3'>
                            <div className="a4">
                                <img src={imageLink(room.uuid)} className="a5"/>
                            </div>
                            <div className='a6'>
                                <img src={membersIcon} className="a7"/>
                                <div className="a8">{room.memberCount} watching</div>
                            </div>
                            <div className={'a9'}>
                                {room.name}
                            </div>
                            <div className={'a10'}>
                                <div className={'a11'}>{room.owner}</div>
                                <div className={'a12'} onClick={(event) => handleJoin(event, room.uuid)}>Join stream</div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}
