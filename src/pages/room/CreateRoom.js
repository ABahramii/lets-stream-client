import "./createRoom.css"
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import useAuthRequest from "../../hooks/useAuthRequest";

export default function CreateRoom() {
    const [roomName, setRoomName] = useState("");
    const [roomImage, setRoomImage] = useState(null);
    const [imageName, setImageName] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);
    const [privateCode, setPrivateCode] = useState("");

    const navigate = useNavigate();
    const [createRequest] = useAuthRequest();

    const handleCreate = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', roomName);

        formData.append('image', roomImage);
        formData.append('active', true)
        formData.append('privateRoom', isPrivate);
        formData.append('privateCode', privateCode);


        createRequest({
            url: "/room/create",
            method: 'POST',
            data: formData
        }).then(res => {
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
            <main id="room__lobby__container">
                <div id="form__container">
                    <div id="form__container__header">
                        <p>Create Room</p>
                    </div>

                    <form id="lobby__form" onSubmit={handleCreate}>
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
                                    required
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
                            <button> Create </button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}
