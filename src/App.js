import {BrowserRouter, Route, Routes} from "react-router-dom";
import Connect from "./pages/Connect";
import Room from "./pages/room/Room";
import Signing from "./components/Signing";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Connect />} />
                    <Route path="/room" element={<Room />} />
                    <Route path="/s" element={<Signing />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
