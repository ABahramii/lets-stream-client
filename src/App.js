import {BrowserRouter, Route, Routes} from "react-router-dom";
import Room from "./pages/room/Room";
import Signing from "./components/Signing";
import Join from "./pages/join/Join";
import Navbar from "./components/Navbar";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Join />} />
                    <Route path="/join" element={<Join />} />
                    <Route path="/room" element={<Room />} />
                    <Route path="/s" element={<Signing />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
