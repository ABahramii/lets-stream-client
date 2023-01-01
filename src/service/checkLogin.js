const checkLogin = () => {
    const token = localStorage.getItem("token");
    const tokenExpiration = localStorage.getItem("tokenExpiredAt");

    return token != null && tokenExpiration > new Date();
}

export default checkLogin;
