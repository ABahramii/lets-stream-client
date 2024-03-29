import "../pages/room/room.css"
import {useEffect, useRef, useState} from "react";
import {Client, LocalStream} from "ion-sdk-js";
import {IonSFUJSONRPCSignal} from "ion-sdk-js/lib/signal/json-rpc-impl";
import {RPC_SIGNAL_URL} from "../config/Url";

export default function Stream({roomKey, isPub}) {
    const config = {
        iceServers: [
            {
                urls: "stun:stun.l.google.com:19302",
            },
        ],
    };
    const pubVideo = useRef();
    const subVideo = useRef();
    const [client, setClient] = useState(null);

    const [localStream, setLocalStream] = useState(null);

    const [showJoin, setShowJoin] = useState(true);
    const [showButtons, setShowButtons] = useState(false);
    const [micIsEnable, setMicIsEnable] = useState(false);
    const [cameraIsEnable, setCameraIsEnable] = useState(false);
    const [screenIsShared, setScreenIsShared] = useState(false);

    const [cameraBtnClass, setCameraBtnClass] = useState("active");
    const [micBtnClass, setMicBtnClass] = useState("active");
    const [screenBtnClass, setScreenBtnClass] = useState("");

    useEffect(() => {
        const signal = new IonSFUJSONRPCSignal(RPC_SIGNAL_URL);

        let cc = new Client(signal, config);
        setClient(cc);

        signal.onopen = () => cc.join(roomKey);

        cc.ontrack = (track, stream) => {
            console.log("got track: ", track.id, "for stream: ", stream.id);

            if (stream === null) {
                console.log("stream is null");
            }

            track.onunmute = () => {
                console.log("ready to subscribe")
                subVideo.current.srcObject = stream;
                subVideo.current.autoplay = true;
                subVideo.current.muted = false;

                stream.onremovetrack = () => {
                    try {
                        subVideo.current.srcObject = null;
                    } catch (err) {
                        console.log("error: ", err);
                    }
                }
            }
        }
    }, []);

    const shareCamera = () => {
        setShowJoin(false);
        setShowButtons(true);
        LocalStream.getUserMedia({
            resolution: 'vga',
            audio: true,
            codec: "vp8"
        })
            .then((media) => {
                setLocalStream(media);
                setMicIsEnable(true);
                setCameraIsEnable(true);

                console.log("local stream set.")

                pubVideo.current.srcObject = media;
                pubVideo.current.autoplay = true;
                pubVideo.current.controls = true;
                pubVideo.current.muted = true;
                client.publish(media);
            }).catch(console.error);
    }

    // Todo: reload page for subscriber
    const handleCamera = () => {
        if (cameraIsEnable) {
            localStream.mute("video");
            setCameraIsEnable(false);
            setCameraBtnClass("");
        } else {
            localStream.unmute("video");
            setCameraIsEnable(true);
            setCameraBtnClass("active");
        }
    }

    const handleMic = () => {
        if (micIsEnable) {
            localStream.mute("audio");
            setMicIsEnable(false);
            setMicBtnClass("");
        } else {
            localStream.unmute("audio");
            setMicIsEnable(true);
            setMicBtnClass("active");
        }
    }

    const handleScreen = () => {
        if (screenIsShared) {
            setScreenIsShared(false);
            setScreenBtnClass("");
            setCameraIsEnable(true);
            setCameraBtnClass("active");
            shareCamera();
        } else {
            LocalStream.getDisplayMedia({
                resolution: 'hd',
                video: true,
                audio: true,
                codec: "vp8"
            })
                .then((media) => {
                    console.log("hello then");
                    afterShareScreen();
                    setLocalStream(media);
                    pubVideo.current.srcObject = media;
                    pubVideo.current.autoplay = true;
                    pubVideo.current.controls = true;
                    pubVideo.current.muted = true;
                    client.publish(media);
                }).catch(console.error);
        }
    }

    const afterShareScreen = () => {
        setScreenIsShared(true);
        setScreenBtnClass("active");
        setCameraIsEnable(false);
        setCameraBtnClass("");
    }

    const handleLeave = () => {
        client.close();
        window.location.reload();
    }

    return (
        <section id="stream__container">

            <div id="stream__box">
                <div className="video__container" id="user-container-2269">
                    <div className="video-player" id="user-2269">
                        <div id="agora-video-player-track-cam-fc6e2136" className="ab">
                            {isPub &&
                                <video id="video_track-cam-fc6e2136" className="agora_video_player"
                                       ref={pubVideo}
                                />
                            }
                            {!isPub &&
                                <video id="video_track-cam-fc6e2136" className="agora_video_player"
                                       ref={subVideo}
                                       controls
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>

            {isPub && showButtons &&
                <div className="stream__actions">
                    <button id="camera-btn" className={cameraBtnClass} onClick={handleCamera}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path
                                d="M5 4h-3v-1h3v1zm10.93 0l.812 1.219c.743 1.115 1.987 1.781 3.328 1.781h1.93v13h-20v-13h3.93c1.341 0 2.585-.666 3.328-1.781l.812-1.219h5.86zm1.07-2h-8l-1.406 2.109c-.371.557-.995.891-1.664.891h-5.93v17h24v-17h-3.93c-.669 0-1.293-.334-1.664-.891l-1.406-2.109zm-11 8c0-.552-.447-1-1-1s-1 .448-1 1 .447 1 1 1 1-.448 1-1zm7 0c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0-2c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5z"/>
                        </svg>
                    </button>
                    <button id="mic-btn" className={micBtnClass} onClick={handleMic}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path
                                d="M12 2c1.103 0 2 .897 2 2v7c0 1.103-.897 2-2 2s-2-.897-2-2v-7c0-1.103.897-2 2-2zm0-2c-2.209 0-4 1.791-4 4v7c0 2.209 1.791 4 4 4s4-1.791 4-4v-7c0-2.209-1.791-4-4-4zm8 9v2c0 4.418-3.582 8-8 8s-8-3.582-8-8v-2h2v2c0 3.309 2.691 6 6 6s6-2.691 6-6v-2h2zm-7 13v-2h-2v2h-4v2h10v-2h-4z"/>
                        </svg>
                    </button>
                    <button id="screen-btn" className={screenBtnClass} onClick={handleScreen}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path
                                d="M0 1v17h24v-17h-24zm22 15h-20v-13h20v13zm-6.599 4l2.599 3h-12l2.599-3h6.802z"/>
                        </svg>
                    </button>
                    <button id="leave-btn" onClick={handleLeave}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M16 10v-5l8 7-8 7v-5h-8v-4h8zm-16-8v20h14v-2h-12v-16h12v-2h-14z"/>
                        </svg>
                    </button>
                </div>
            }

            {isPub && showJoin &&
                <button id="join-btn" onClick={shareCamera}>Join Stream</button>
            }
        </section>
    );
};
