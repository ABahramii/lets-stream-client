import "./join.css"

export default function Join() {
    return (
        <>
            {/*<nav className="navbar">
                <div className="nav--list">
                    <Link to="/">
                        <h3 className="logo">
                            <img src={logoImage} alt="Site Logo"/>
                            <span>Let's Stream</span>
                        </h3>
                    </Link>
                </div>

                <div className="nav__links">
                    <Link to="/" className="nav__link">
                        Lobby
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ede0e0" viewBox="0 0 24 24">
                            <path d="M20 7.093v-5.093h-3v2.093l3 3zm4 5.907l-12-12-12 12h3v10h7v-5h4v5h7v-10h3zm-5 8h-3v-5h-8v5h-3v-10.26l7-6.912 7 6.99v10.182z"/>
                        </svg>
                    </Link>
                    Todo: route must be changed
                    <Link to="/join" className="nav__link create__room__btn">
                        Create Room
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ede0e0" viewBox="0 0 24 24">
                            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"/>
                        </svg>
                    </Link>
                </div>
            </nav>*/}

            <main id="room__lobby__container">

                <div id="form__container">
                    <div id="form__container__header">
                        <p>👋 Create or Join Room</p>
                    </div>


                    <form id="lobby__form">

                        <div className="form__field__wrapper">
                            <label>Your Name</label>
                            <label>
                                <input type="text" name="name" required placeholder="Enter your display name..."/>
                            </label>
                        </div>

                        <div className="form__field__wrapper">
                            <label>Room Name</label>
                            <label>
                                <input type="text" name="room" placeholder="Enter room name..."/>
                            </label>
                        </div>

                        <div className="form__field__wrapper">
                            <button type="submit">Go to Room
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path
                                        d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}
