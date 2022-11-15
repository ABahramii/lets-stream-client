import "./room.css";
import {useState} from "react";
import {useAuthContext} from "../../hooks/useAuthContext";

export default function Room() {
    const { state: user } = useAuthContext();
    const [memberCount, setMemberCount] = useState(1);

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
                            <p>{memberCount}</p>
                        </div>
                        <div className="member_wrapper">
                            <span className="green_dot"></span>
                            <p>ChatRoom</p>
                        </div>
                        <div className="member_wrapper">
                            <span className={user.connected ? "green_dot" : "red_dot"}></span>
                            <p>{ user.username }</p>
                        </div>
                    </section>

                    <section id="chat_container">
                        <div className="message-wrapper">
                            <p>Dennis</p>
                            <p className="message">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, accusamus animi dolores labore
                                laudantium
                                molestiae nihil non, possimus quas quidem quo quos sed temporibus.
                                Accusantium blanditiis et maiores unde voluptate!
                            </p>
                        </div>
                        <div className="message-wrapper">
                            <p>Dennis</p>
                            <p className="message">
                                hello world
                            </p>
                        </div>
                    </section>
                </main>
            }
        </>
    );
}
