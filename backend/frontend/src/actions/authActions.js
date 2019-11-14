export const login = (user) => {
    console.log(user);
    localStorage.setItem("token", user.token);
    return dispatch => {
      dispatch({
        type: "LOGIN",
        user: user
      });
    }
}
export const logout = (user) => {
    console.log(user);
    localStorage.removeItem("token");
    return dispatch => {
      dispatch({
        type: "LOGOUT",
        user: user
      });
    }
}
