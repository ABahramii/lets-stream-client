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

function App() {
    const isLogin = checkLogin();

    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Lobby />} />
                    <Route path="/lobby" element={<LobbyBkp />} />
                    <Route path="/join" element={<Join />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<CreateUser />} />
                    <Route path="/room/:UUID" element={<Room />}/>
                    <Route path="/room/create" element={isLogin ? <CreateRoom /> : <Lobby />}/>
                    <Route path="/room/edit/:UUID" element={isLogin ? <EditRoom /> : <Lobby />}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
