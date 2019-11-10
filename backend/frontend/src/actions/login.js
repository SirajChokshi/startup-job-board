export const login = (user) => {
    console.log(user);
    return dispatch => {
        localStorage.setItem("token", user.token);
    }
}
