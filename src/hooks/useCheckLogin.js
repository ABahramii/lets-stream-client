import {useEffect, useState} from "react";
import useFetch from "./useFetch";
import {BASE_URL} from "../config/Url";

export const useCheckLogin = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [tokenValidReq] = useFetch();

    const checkLogin = async () => {
        const token = localStorage.getItem("token");
        console.log(token);

        if (token) {
            const url = `${BASE_URL}/auth/token/isValid/${token}`;

            tokenValidReq({
                url: url,
                method: "GET",
            }).then(res => {
                console.log(res);
                const body = res.data;
                setIsLogin(body.isTokenValid);
            }).catch(exp => {
                setIsLogin(false);
            })
        } else {
            console.log("i have not this")
            setIsLogin(false);
        }
    }


    useEffect(() => {
        console.log("try to checkLogin");
        checkLogin();
    }, []);

    return {isLogin};
}
