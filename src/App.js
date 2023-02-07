import {BrowserRouter, Route, Routes} from "react-router-dom";
import Room from "./pages/room/Room";
import Join from "./pages/join/Join";
import Navbar from "./components/Navbar";
import LobbyBkp from "./pages/lobby/LobbyBkp";
import Login from "./pages/login/Login";
import CreateRoom from "./pages/room/CreateRoom";
import checkLogin from "./service/checkLogin";
import CreateUser from "./pages/user/CreateUser";
import EditRoom from "./pages/room/EditRoom";
import Lobby from "./pages/lobby/Lobby";
import { createTheme, ThemeProvider } from "@mui/material";
import UserRooms from "./pages/room/UserRooms";
import JoinPrivate from "./pages/join/JoinPrivate";

function App() {
    const isLogin = checkLogin();

    const muiTheme = createTheme({
        palette:{
            primary:{
                // the main color of the site
                main:"#845695",
                // change these until its good looking if needed
                light:"#b274c9",
                dark:"#5e3d69",
            },
            // apply dark mode for mui components
            mode: 'dark',
        }
    })

    return (
        <div className="App">
            {/* main theme provider for mui */}
            <ThemeProvider theme={muiTheme}>
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Lobby />} />
                        <Route path="/lobby" element={<LobbyBkp />} />
                        <Route path="/join" element={<Join />} />
                        <Route path="/private/join" element={isLogin ? <JoinPrivate /> : <Lobby />} />
                        <Route path="/login" element={!isLogin ? <Login /> : <Lobby />} />
                        <Route path="/signup" element={<CreateUser />} />
                        <Route path="/room/:UUID" element={<Room />}/>
                        <Route path="/room/create" element={isLogin ? <CreateRoom /> : <Lobby />}/>
                        <Route path="/room/edit/:UUID" element={isLogin ? <EditRoom /> : <Lobby />}/>
                        <Route path="/user/rooms" element={isLogin ? <UserRooms /> : <Lobby />}/>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
}

export default App;
