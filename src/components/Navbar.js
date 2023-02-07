import "./navbar.css"
import logoImage from "../images/dark-logo.png"
import {Link} from "react-router-dom";
import checkLogin from "../service/checkLogin";
import {useEffect, useState} from "react";
import { Divider, IconButton, Menu, MenuItem, Popover } from "@mui/material";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CastConnectedOutlinedIcon from '@mui/icons-material/CastConnectedOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';

export default function Navbar() {
    const [isLogin, setIsLogin] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);


    useEffect(() => {
        setIsLogin(checkLogin());
    }, [isLogin])

    return (
        <nav className="navbar">
            <div className="nav--list">
                <Link to="/">
                    <h3 className="logo">
                        <img src={logoImage} alt="Site Logo"/>
                        <span>Let's Stream</span>
                    </h3>
                </Link>
            </div>

            <div className="nav__links">
                <Link to="/join" className="nav__link">
                    Join
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ede0e0" viewBox="0 0 24 24">
                        <path d="M20 7.093v-5.093h-3v2.093l3 3zm4 5.907l-12-12-12 12h3v10h7v-5h4v5h7v-10h3zm-5 8h-3v-5h-8v5h-3v-10.26l7-6.912 7 6.99v10.182z"/>
                    </svg>
                </Link>
                {!isLogin &&
                    <Link to="/login" className="nav__link">
                        Login
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ede0e0" viewBox="0 0 24 24">
                            <path d="M20 7.093v-5.093h-3v2.093l3 3zm4 5.907l-12-12-12 12h3v10h7v-5h4v5h7v-10h3zm-5 8h-3v-5h-8v5h-3v-10.26l7-6.912 7 6.99v10.182z"/>
                        </svg>
                    </Link>
                }
                {isLogin &&
                    <Link to="/room/create" className="nav__link create__room__btn">
                        Create Room
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ede0e0" viewBox="0 0 24 24">
                            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"/>
                        </svg>
                    </Link>
                }

                {/* MUI icon button for popup menu */}
                <IconButton
                    id="user-icon"
                    sx={{
                        color:"white"
                    }}
                    onClick={()=>{setMenuOpen(true)}}
                >
                    <AccountCircleOutlinedIcon/>
                </IconButton>

                <Menu
                    // connecting the menu to user-icon btn
                    anchorEl={document.getElementById("user-icon")}
                    open={menuOpen}
                    onClose={()=>{setMenuOpen(false)}}
                >
                    <MenuItem >
                        <Link to="/signup" className="nav__link">
                            Profile
                        </Link>
                    </MenuItem>
                    <MenuItem >
                        <Link to="/signup" className="nav__link">
                            Profile
                        </Link>
                    </MenuItem>
                    <MenuItem >
                        <Link to="/signup" className="nav__link">
                            Profile
                        </Link>
                    </MenuItem>
                    <Divider/>
                    <MenuItem
                        // styling with MUI sx property
                        sx={{
                            display:"flex",
                            gap:"5px"
                        }}
                    >
                        <SecurityOutlinedIcon/>
                        <Link to="/signup" className="nav__link">
                            Profile
                        </Link>
                    </MenuItem>

                    {/* styling with css classNames */}
                    <MenuItem className="popup_menu_item">
                        <CastConnectedOutlinedIcon/>
                        <Link to="/signup" className="nav__link">
                            Profile
                        </Link>
                    </MenuItem>

                </Menu>
            </div>
        </nav>
    );
}
