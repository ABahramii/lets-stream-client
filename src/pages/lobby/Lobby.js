import "./Lobby.css"
import {useEffect, useState} from "react";
import membersIcon from '../../images/members-icon.png'
import checkLogin from "../../service/checkLogin";
import useFetch from "../../hooks/useFetch";


export default function Lobby() {

    const [fetchRoomRequest] = useFetch();


    const [rooms, setRooms] = useState([
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk2ovDI44rCXwzd5gln9wHMO0z3Hsx2KB-8Q&usqp=CAUlPSqkM17H/AM+3+9/K1KlSqWI//9k=TpLk7pofiN1KlTXJm+DIlS40qVbnOUX6glPSqkM17H/AM+3+9/K1KlSqWI//9k=",
            memberCount: 12,
            name: "Let's stream",
            owner: "amir bahrami"
        },
    ]);

    useEffect(() => {
        fetchRoomRequest({
            url: `room/exists/`,
            method: "GET",
        }).then(res => {

        }).catch(exp => {
            console.log(JSON.stringify(exp));
        })
    }, []);

    return (
        <div className="a1">
            <div className='a2'>
                {
                    rooms?.map((room) =>
                        <div className='a3'>
                            <div className="a4">
                                <img src={room.img} className="a5"/>
                            </div>
                            <div className='a6'>
                                <img src={membersIcon} className="a7"/>
                                <div className="a8">Members count  {room.memberCount}</div>
                            </div>
                            <div className={'a9'}>
                                {room.name}
                            </div>
                            <div className={'a10'}>
                                <div className={'a11'}>{room.owner}</div>
                                <div className={'a12'}>Join stream
                                </div>
                            </div>

                        </div>
                    )

                }
            </div>
        </div>
    );
}
