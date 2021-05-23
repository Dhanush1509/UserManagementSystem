import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth/AuthContext";
import AlertContext from "../../context/alert/AlertContext";
import { Modal, Button, Form, Table } from "react-bootstrap";
import {TiUserDelete} from "react-icons/ti"
import { RiEditBoxFill} from "react-icons/ri";
import Spin from "./Spinner"
const HomeTable = (props) => {
  const { users, getUsers, updateUser, clearErrors,loading,message,deleteUser,clearMessages,userData } = useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);
  useEffect(() => {

  getUsers()
  }, []);

  const [userId, setUserId] = useState(null);
  const [Index, setIndex] = useState("");
  const [user, setUser] = useState({
    username: "",
    email: "",
    address: "",
  });
  useEffect(() => {
    if (users && users.length > 0) {
      setUser({
        username: users[Number(Index)].username,
        email: users[Number(Index)].email,
        address: users[Number(Index)].address,
      });
    }
    if(message==="updated Successfully"){
       clearMessages();
       getUsers()
      setAlert(message, "white", "#28b62c");
    } 
    if (message === "Deletion Successful") {
      clearMessages()
        getUsers();
      setAlert(message, "white", "#ff1436");
    }    if (!userData && userData.length !== 0) {
      props.history.push("/login");
    }
  }, [Index,message,userData]);
 
 const { username, email, address } = user;
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || username === "" || address === "") {
      setAlert("Fields cannot be empty", "white", "red");
      clearErrors();
    } else {
      updateUser({ username, email, address });
    }
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
const handleChange = ()=>{
  updateUser(userId,{username,email,address})
  handleClose()
}
const handleChangeDelete = () => {
deleteUser(userId);
  handleCloseDelete();
};
  return loading?<Spin/>:users&&users.length>0 ? (
    <div style={{ overflowX: "auto", padding: "20px" }}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Username</th>
            <th>Email</th>
            <th>Address</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.address}</td>
              <td
                onClick={() => {
                  setUserId(u._id);
                  setIndex(String(index));
                  handleShow();
                }}
                style={{ cursor: "pointer" }}
              >
                <RiEditBoxFill
                  size={24}
                  style={{ color: "rgba(0,0,255,0.6)" }}
                />
              </td>
              <td
                onClick={() => {
                  setUserId(u._id);
                  handleShowDelete();
                }}
                style={{ cursor: "pointer" }}
              >
                <TiUserDelete
                  size={24}
                  style={{ color: "rgba(255,0,0,0.6)" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <>
        {show && (
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
              <Button variant="primary" onClick={handleChange}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        )}

        {showDelete && (
          <Modal show={showDelete} onHide={handleCloseDelete}>
            <Modal.Header>
              <Modal.Title>Are you sure to Delete?</Modal.Title>
            </Modal.Header>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDelete}>
                Close
              </Button>
              <Button variant="danger" onClick={handleChangeDelete}>
                Delete User
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </>
    </div>
  ) : (
    <></>
  );
};

export default HomeTable;
