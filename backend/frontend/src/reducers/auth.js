const initialState = {
  user: null,
  isAuthenticated: false
};

export default (state = initialState, action = {}) => {
  console.log(action);
  switch (action.type) {
      case "LOGIN":
        state = {
          ...state,
          user: action.user,
          isAuthenticated: true
        };
        break;
      case "LOGOUT":
        state = {
          ...state,
          user: null,
          isAuthenticated: false
        };
        break;
  }
  return state;
}
