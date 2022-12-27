const saveAuthData = (token, tokenExpiredAt) => {
    localStorage.setItem("token", token)
    localStorage.setItem("tokenExpiredAt", tokenExpiredAt)
}

export default saveAuthData;
