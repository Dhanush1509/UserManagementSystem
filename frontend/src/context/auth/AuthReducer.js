import {
  LOGIN_ERROR,
  LOGIN_USER,
  CLEAR_ERROR,
  REGISTER_USER,
  REGISTER_ERROR,
  LOGOUT_USER,
  GET_USERS,
  UPDATE_USER,
  CLEAR_MESSAGE,
GET_USERS_ERROR,
DELETE_USER
} from "../types.js";
const authReducer = (state, action) => {
  switch (action.type) {
  
    case REGISTER_USER:
      return {
        ...state,
        message: action.payload.message,
        isAuthenticated: true,
        userData: action.payload,
        loading: false,
      };
    case LOGIN_USER:
      return {
        ...state,
        isAuthenticated: true,
        message: action.payload.message,
        userData: action.payload,
        loading: false,
      };
      case DELETE_USER: return {
        ...state,
        isAuthenticated: true,
        message: action.payload.message,
        loading: false,
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        isAuthenticated: true,
      };
    case UPDATE_USER:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        message:action.payload.message
      };
  
    case GET_USERS_ERROR:
    case REGISTER_ERROR:
    case LOGIN_ERROR:
      return {
        ...state,
        error: action.payload,
        isAuthenticated: false,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: null,
      };
    case LOGOUT_USER:
      return {
        ...state,
        userData: [],
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
