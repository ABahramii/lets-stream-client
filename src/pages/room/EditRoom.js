import "./createRoom.css"
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import useAuthRequest from "../../hooks/useAuthRequest";

export default function EditRoom() {
    const {UUID} = useParams();
    const [request] = useAuthRequest();

    const [roomName, setRoomName] = useState("");
    const [roomImage, setRoomImage] = useState(null);
    const [imageName, setImageName] = useState("");
    const [isActive, setIsActive] = useState(true);
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
        setIsActive(data.active);
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
        formData.append("active", isActive)
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
                navigate("/user/rooms");
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
                    <div className="edit_header">
                        <Link to="/user/rooms">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path
                                    d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
                            </svg>
                        </Link>
                        <p>Edit Room</p>
                        <div></div>
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

                        <div className="active_wrapper">
                            <label>Active</label>
                            <input
                                className="active_checkbox"
                                type="checkbox"
                                checked={isActive}
                                onChange={() => setIsActive(!isActive)}
                            />
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
