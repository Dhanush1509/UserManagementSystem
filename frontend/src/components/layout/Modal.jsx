import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth/AuthContext";
import AlertContext from "../../context/alert/AlertContext";
import {  Modal, Button, Form } from "react-bootstrap";
const Example = () => {
      const { updateUser,users } = useContext(AuthContext);
          const { setAlert,clearAlert,clearErrors } = useContext(AlertContext);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    address: "",
  });
  const { username, email, address } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (
      email === "" ||      username === "" ||
      address === ""
    ) {
      setAlert("Fields cannot be empty", "white", "red");
      clearErrors();
    } else {
      updateUser({ username, email,address });
    }
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
     
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="formGroupEmail">
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={onChange}
                maxLength="30"
              />
            </Form.Group>
            <Form.Group controlId="formGroupEmail">
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group controlId="formGroupAddress">
              <Form.Control
                type="text"
                placeholder="Address"
                name="address"
                value={address}
                onChange={onChange}
              />
            </Form.Group>
          
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Example;
