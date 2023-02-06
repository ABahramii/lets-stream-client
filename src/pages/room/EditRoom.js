import "./createRoom.css"
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import useAuthRequest from "../../hooks/useAuthRequest";

export default function EditRoom() {
    const {UUID} = useParams();
    const [request] = useAuthRequest();

    const [roomName, setRoomName] = useState("");
    const [roomImage, setRoomImage] = useState(null);
    const [imageName, setImageName] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);
    const [privateCode, setPrivateCode] = useState("");
    const [imgRequired, setImgRequired] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        request({
            url: `room/fetch/${UUID}`,
            method: "GET",
        }).then(res => {
            if (res.data) {
                makePageData(res.data);
            } else {
                navigate("/");
            }
        }).catch(exp => {
            console.log("err: ", JSON.stringify(exp))
            // navigate("/join");
        })
    }, [])

    const makePageData = (data) => {
        setRoomName(data.name);
        setImageName(data.imageName);
        setIsPrivate(data.privateRoom);
        setPrivateCode(data.privateCode ? data.privateCode : "");
    }

    const handleEdit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", roomName);
        if (roomImage) {
            formData.append("image", roomImage);
            formData.append("imageName", imageName);
        }
        formData.append("active", true)
        formData.append("privateRoom", isPrivate);
        formData.append("privateCode", privateCode);

        request({
            url: `/room/edit/${UUID}`,
            method: "PUT",
            data: formData
        }).then(res => {
            console.log(res);
            if (res.code === 200) {
                // Todo: alert room created successfully
                navigate("/");
            }
        }).catch(exp => {
            console.log(JSON.stringify(exp))
            // Todo: use toast
        })

    }

    const addImage = (file) => {
        setImgRequired(true);
        setRoomImage(file);
        setImageName(file.name);
    }

    const handleCheckbox = () => {
        let newState = !isPrivate;
        if (!newState) {
            setPrivateCode("");
        }
        setIsPrivate(!isPrivate);
    }

    return (
        <>
            <div id="room__lobby__container">
                <div id="form__container">
                    <div id="form__container__header">
                        <p>Edit Room</p>
                    </div>

                    <form id="lobby__form" onSubmit={handleEdit}>
                        <div className="form__field__wrapper">
                            <label>Room name</label>
                            <label>
                                <input type="text"
                                       name="name"
                                       onChange={e => setRoomName(e.target.value)}
                                       value={roomName}
                                       required
                                       placeholder="Enter room name..."
                                />
                            </label>
                        </div>

                        <div className="wrapper">
                            <div className="file-input">
                                {/*Todo: check file type and size*/}
                                <input
                                    type="file"
                                    id="file"
                                    className="file"
                                    required={imgRequired}
                                    aria-label="File browser example"
                                    onChange={(e) => addImage(e.target.files[0])}
                                />
                                <label htmlFor="file">
                                    Select image
                                </label>
                                <p className="file-name">{imageName}</p>
                            </div>
                        </div>

                        <div className="wrapper">
                            <label>private</label>
                            <input
                                type="checkbox"
                                checked={isPrivate}
                                onChange={handleCheckbox}
                            />
                        </div>

                        {isPrivate &&
                            <div className="form__field__wrapper">
                                <label>Private code</label>
                                <label>
                                    <input type="text"
                                           name="name"
                                           onChange={e => setPrivateCode(e.target.value)}
                                           value={privateCode}
                                           placeholder="Enter room private code..."
                                    />
                                </label>
                            </div>
                        }

                        <div className="form__field__wrapper">
                            <button> Edit </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
