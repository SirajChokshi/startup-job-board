//import { SET_CURRENT_USER } from '../actions/login';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case "LOGIN":
      return {
        isAuthenticated: true,
        user: action.user
      };
    case  "LOGOUT":
      return {
        isAuthenticated: false,
        user: {}
      }
    default: return state;
  }
}
