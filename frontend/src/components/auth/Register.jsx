import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";
import AlertContext from "../../context/alert/AlertContext";

const Register = (props) => {
  const {
    loading,
    clearErrors,
    registerUser,
    error,
    isAuthenticated,
    userData,
    message,
    clearMessages,
  } = useContext(AuthContext);

  const { setAlert, alerts } = useContext(AlertContext);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    address:""
  });
  const { username, email, password, password2,address } = user;
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  useEffect(() => {
    if (error === "User already exists") {
      setAlert(error, "white", "red");
      clearErrors();
    }
     if (userData.length !== 0) {
       props.history.push("/");
     }


    //eslint-disable-next-line
  }, [error, message,userData]);



  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "" || password2 === "" || username === ""||address === "") {
      setAlert("Fields cannot be empty", "white", "red");
      clearErrors();
    } else if (password !== password2) {
      setAlert("Passwords did not match", "white", "red");
      clearErrors();
    } else {
    
      registerUser({ username, email, password,address });
    }
  };
  return (
    <div
      className="form-container"
      style={{ textAlign: "left", color: "black" }}
    >
      <h2 style={{ color: "black" }}>Sign Up</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="formGroupuser" style={{ marginTop: "10px" }}>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={onChange}
            maxLength="30"
          />
        </Form.Group>
        <Form.Group controlId="formGroupEmail" style={{ marginTop: "10px" }}>
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group controlId="formGroupAddress" style={{ marginTop: "10px" }}>
          <Form.Control
            type="text"
            placeholder="Address"
            name="address"
            value={address}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group controlId="formGroupPassword" style={{ marginTop: "10px" }}>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
          />
        </Form.Group>
        <Form.Group
          controlId="formGroupPassword1"
          style={{ marginTop: "10px" }}
        >
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={onChange}
            minLength="6"
          />
        </Form.Group>
        <Button variant="primary" type="submit" style={{ marginTop: "10px" }}>
          <>Submit</>
        </Button>
      </Form>
      <p style={{ textAlign: "left", color: "black" }} className="mt-3">
        Have an account?
        <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};
export default Register;
