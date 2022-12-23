import {useState} from "react";
import useAuthRequest from "./useAuthRequest";
// import ApiRoutes from "../config/ApiRoutes";

const useCheckLogin = () => {

    const [isLogin, setLogin] = useState(null);
    const [getUserInfoReg] = useAuthRequest()

    const checkLogin = async () => {
        await getUserInfoReg({
            // Todo
            // url: ApiRoutes.USER_INFO_URL,
            method: "GET"
        }).then(res => {
            setLogin(true)
            return true;
        }).catch(e => {
            setLogin(false)
            return false;
        });
    }

    return [checkLogin, isLogin];

}

export default useCheckLogin;
