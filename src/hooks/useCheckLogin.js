import {useEffect, useState} from "react";
import useFetch from "./useFetch";

export const useCheckLogin = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [tokenValidReq] = useFetch();

    const checkLogin = async () => {
        const token = localStorage.getItem("token");
        const tokenExpiration = localStorage.getItem("tokenExpiredAt");

        if (token) {
            const url = `/auth/token/isValid/${token}`;

            tokenValidReq({
                url: url,
                method: "GET",
            }).then(res => {
                // console.log(res);
                const body = res.data;
                setIsLogin(body.isTokenValid);
            }).catch(exp => {
                setIsLogin(false);
            })
        } else {
            // console.log("i have not this")
            setIsLogin(false);
        }
    }


    useEffect(() => {
        // console.log("try to checkLogin");
        checkLogin();
    }, []);

    return {isLogin};
}
