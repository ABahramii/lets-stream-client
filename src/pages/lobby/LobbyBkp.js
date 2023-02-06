import "./lobby.css"
import {useState} from "react";
import membersIcon from '../../images/members-icon.png'


export default function LobbyBkp() {

    const [rooms, setRooms] = useState([
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk2ovDI44rCXwzd5gln9wHMO0z3Hsx2KB-8Q&usqp=CAUlPSqkM17H/AM+3+9/K1KlSqWI//9k=TpLk7pofiN1KlTXJm+DIlS40qVbnOUX6glPSqkM17H/AM+3+9/K1KlSqWI//9k=",
            memberCount: 12,
            name: "Let's stream",
            owner: "amir bahrami"
        },
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk2ovDI44rCXwzd5gln9wHMO0z3Hsx2KB-8Q&usqp=CAUlPSqkM17H/AM+3+9/K1KlSqWI//9k=TpLk7pofiN1KlTXJm+DIlS40qVbnOUX6glPSqkM17H/AM+3+9/K1KlSqWI//9k=",
            memberCount: 12,
            name: "Let's stream",
            owner: "amir bahrami"
        },
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk2ovDI44rCXwzd5gln9wHMO0z3Hsx2KB-8Q&usqp=CAUlPSqkM17H/AM+3+9/K1KlSqWI//9k=TpLk7pofiN1KlTXJm+DIlS40qVbnOUX6glPSqkM17H/AM+3+9/K1KlSqWI//9k=",
            memberCount: 12,
            name: "Let's stream",
            owner: "amir bahrami"
        },
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk2ovDI44rCXwzd5gln9wHMO0z3Hsx2KB-8Q&usqp=CAUlPSqkM17H/AM+3+9/K1KlSqWI//9k=TpLk7pofiN1KlTXJm+DIlS40qVbnOUX6glPSqkM17H/AM+3+9/K1KlSqWI//9k=",
            memberCount: 12,
            name: "Let's stream",
            owner: "amir bahrami"
        },
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk2ovDI44rCXwzd5gln9wHMO0z3Hsx2KB-8Q&usqp=CAUlPSqkM17H/AM+3+9/K1KlSqWI//9k=TpLk7pofiN1KlTXJm+DIlS40qVbnOUX6glPSqkM17H/AM+3+9/K1KlSqWI//9k=",
            memberCount: 12,
            name: "Let's stream",
            owner: "amir bahrami"
        },
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk2ovDI44rCXwzd5gln9wHMO0z3Hsx2KB-8Q&usqp=CAUlPSqkM17H/AM+3+9/K1KlSqWI//9k=TpLk7pofiN1KlTXJm+DIlS40qVbnOUX6glPSqkM17H/AM+3+9/K1KlSqWI//9k=",
            memberCount: 12,
            name: "Let's stream",
            owner: "amir bahrami"
        },
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk2ovDI44rCXwzd5gln9wHMO0z3Hsx2KB-8Q&usqp=CAUlPSqkM17H/AM+3+9/K1KlSqWI//9k=TpLk7pofiN1KlTXJm+DIlS40qVbnOUX6glPSqkM17H/AM+3+9/K1KlSqWI//9k=",
            memberCount: 12,
            name: "Let's stream",
            owner: "amir bahrami"
        }
    ]);

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

        /*<div className='w-full rounded-lg h-full flex  justify-center relative top-20 pb-10'>
            <div className='w-4/5 rounded-lg h-full flex text-gray-50 flex-wrap items-end justify-left '>
            {
                rooms?.map((room) =>
                    <div className=' w-[475px] bg-neutral-700  flex flex-col rounded-lg  justify-center items-center px-2 pb-4 m-2 mt-0 mb-4'>
                        <div className={'m-3 w-full'}>
                            <img src={room.img} className={'rounded-lg w-full object-cover'}/>
                        </div>
                        <div className='p-3 w-full flex flex-row items-center'>
                            <img src={membersIcon} className={'w-7 h-7 object-cover mr-3'}/>
                            <div className={'flex items-center pt-2'}>Members count  {room.memberCount}</div>
                        </div>
                        <div className={'font-bold text-[24px] w-full p-2 flex justify-start m-2'}>
                            {room.name}
                        </div>
                        <div className={'flex flex-row justify-between w-full mb-3'}>
                            <div className={'p-2 text-[17px]'}>{room.owner}</div>
                            <div className={'bg-purple-700 rounded-lg mx-2 px-2 py-1 cursor-pointer'}>Join stream
                            </div>
                        </div>

                    </div>
                )
            }
            </div>
        </div>*/
    );
}
