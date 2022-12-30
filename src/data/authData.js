const saveAuthData = (token, tokenExpiredAt, username) => {
    localStorage.setItem("token", token)
    localStorage.setItem("tokenExpiredAt", tokenExpiredAt)
    localStorage.setItem("username", username)
}

export default saveAuthData;
