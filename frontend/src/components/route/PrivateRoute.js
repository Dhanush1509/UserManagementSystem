import React,{useContext} from "react";
import { Route, Redirect } from "react-router-dom";

import AuthContext from "../../context/auth/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const {userData}=useContext(AuthContext)
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        userData.length>0? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
