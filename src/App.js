import {BrowserRouter, Route, Routes} from "react-router-dom";
import Room from "./pages/room/Room";
import Join from "./pages/join/Join";
import Navbar from "./components/Navbar";
import Lobby from "./pages/lobby/Lobby";
import Login from "./pages/login/Login";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Lobby />} />
                    <Route path="/join" element={<Join />} />
                    <Route path="/room/:UUID" element={<Room />}/>
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
