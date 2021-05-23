import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";
import AlertContext from "../../context/alert/AlertContext";
const Login = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { loading, clearErrors, loginUser, error, isAuthenticated, userData,getUsers } =
    useContext(AuthContext);

  const { setAlert, alerts } = useContext(AlertContext);

  const { email, password } = user;
  useEffect(() => {
    if (error === "Invalid email or password") {
      setAlert(error, "white", "red");
      clearErrors();
    }
   if (userData.length !== 0) {
     props.history.push("/");
   }
 

    //eslint-disable-next-line
  }, [error,userData]);



  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(email,password)
   
    if (email === "" || password === "") {
      setAlert("Fields cannot be empty", "white", "red");
      clearErrors();
    
    } else {
      loginUser({ email, password });

    }
  };
  return (
    <div
      className="form-container"
 
    >
      <h2 style={{ color: "black" }}>Sign In</h2>

      <Form onSubmit={onSubmit}>
        <Form.Group controlId="formGroupEmail" style={{ marginTop: "10px" }}>
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={onChange}
            required
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
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" style={{ marginTop: "10px" }}>
          <>Login</>
        </Button>
      </Form>
      <p style={{ textAlign: "left", color: "black" }} className="mt-3">
        New User? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};
export default Login;
