const saveAuthData = (token, tokenExpiredAt, username) => {
    localStorage.setItem("token", token);
    localStorage.setItem("tokenExpiredAt", tokenExpiredAt);
    localStorage.setItem("username", username);
}

const removeAuthData = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiredAt");
    localStorage.removeItem("username");
}

const authData = {
    saveAuthData,
    removeAuthData
}

export default authData;
