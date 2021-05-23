import React, { useReducer, useEffect } from "react";
import AuthContext from "../auth/AuthContext";
import AuthReducer from "./AuthReducer";
import axios from "axios";
import setAuth from "../../utils/setAuthToken";
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
  DELETE_USER,
  GET_USERS_ERROR
} from "../types.js";
const userInfoStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : [];
function AuthState(props) {
  const initialState = {
    loading: true,
    isAuthenticated: false,
    error: null,
    message: null,
    userData: userInfoStorage,
    users:null
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const loginUser = async (formData) => {
  
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post("/api/users/login", formData, config);
      dispatch({ type: LOGIN_USER, payload: data });
    } catch (err) {
      dispatch({
        type: LOGIN_ERROR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

  const registerUser = async (formData) => {
    console.log(formData);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post("/api/users/register", formData, config);

      dispatch({ type: REGISTER_USER, payload: data });
    } catch (err) {
      dispatch({
        type: REGISTER_ERROR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
  const getUsers = async (id) => {
    if (state.userData.token) {
      setAuth(state.userData.token);
    }
    try {
      const { data } = await axios.get("/api/users/profiles");
      console.log(data);
      dispatch({ type: GET_USERS, payload: data });
    } catch (err) {
      console.log(err.response.data.message);
      dispatch({
        type: GET_USERS_ERROR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
  const updateUser = async (id,formData) => {
    console.log(formData,id)
    if (state.userData.token) {
      setAuth(state.userData.token);
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.put(`/api/users/profile/${id}`, formData, config);
      console.log(data)
      dispatch({ type: UPDATE_USER, payload: data });
       getUsers()
    } catch (err) {
      dispatch({
        type: GET_USERS_ERROR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
   const deleteUser = async (id) => {
     if (state.userData.token) {
       setAuth(state.userData.token);
     }
  
     try {
       const { data } = await axios.delete(`/api/users/profile/${id}`);
       dispatch({ type: DELETE_USER, payload: data });
    getUsers()
     } catch (err) {
       dispatch({
         type: GET_USERS_ERROR,
         payload:
           err.response && err.response.data.message
             ? err.response.data.message
             : err.message,
       });
     }
   };
  const logout = () => {
    localStorage.removeItem("userInfo");
    dispatch({ type: LOGOUT_USER });
    document.location.href = "/login";
  };
  useEffect(
    () => {
      localStorage.setItem("userInfo", JSON.stringify(state.userData));
    },
    //eslint-disable-next-line
    [state.userData]
  );
  const clearErrors = () => {
    dispatch({ type: CLEAR_ERROR });
  };
  const clearMessages = () => {
    dispatch({ type: CLEAR_MESSAGE });
  };

  return (
    <AuthContext.Provider
      value={{
        userDetails: state.userDetails,
        updateUser,
        logout,
        clearErrors,
        deleteUser,
        loginUser,
        registerUser,
        getUsers,
        clearMessages,
        message: state.message,
        error: state.error,
        isAuthenticated: state.isAuthenticated,
        userData: state.userData,
        loading: state.loading,
        users: state.users,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthState;
