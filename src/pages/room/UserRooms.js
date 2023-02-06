import "../lobby/lobby.css"
import "./userRooms.css"

import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import membersIcon from "../../images/members-icon.png";
import {BASE_URL} from "../../config/Url";
import useAuthRequest from "../../hooks/useAuthRequest";

export default function UserRooms() {
    const navigate = useNavigate();
    const [authRequest] = useAuthRequest();
    const [rooms, setRooms] = useState([]);

    const imageLink = (uuid) => {
        return `${BASE_URL}/room/image/${uuid}`;
    }

    useEffect(() => {
        authRequest({
            url: "/room/user/rooms",
            method: "GET",
        }).then(res => {
            const data = res.data;
            if (data) {
                setRooms(rooms.concat(data));
            }
        }).catch(exp => {
            console.log("exception: ", JSON.stringify(exp));
        })
    }, []);

    const handleJoin = (event, uuid) => {

    }

    return (
        <div className="a1">
            <div className="a2">
                {
                    rooms.map((room, index) =>
                        <div key={index} className="a3">
                            <div className="a4">
                                <img src={imageLink(room.uuid)} className="a5"/>
                            </div>
                            <div className="a6">
                                <img src={membersIcon} className="a7"/>
                                <div className="a8">{room.memberCount} watching</div>
                            </div>
                            <div className={"a9"}>
                                <span className={room.active === true ? "green_icon" : "red_icon"}></span>
                                {room.name}
                            </div>
                            <div className="buttons">
                                <div className="button join_button" onClick={(event) => handleJoin(event, room.uuid)}>Join</div>
                                <div className="button edit_button" onClick={(event) => handleJoin(event, room.uuid)}>Edit</div>
                                <div className="button remove_button" onClick={(event) => handleJoin(event, room.uuid)}>Remove</div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}
