import React,{useContext} from "react";
import { Navbar, Nav } from "react-bootstrap";
import AuthContext from "../../context/auth/AuthContext"
const Appbar = () => {
    const {logout,userData}=useContext(AuthContext)
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <div className="container-fluid">
          <Navbar.Brand>User Management System</Navbar.Brand>
          {userData && (
            <div onClick={logout}>
              {" "}
              <Nav>
                {" "}
                <Nav.Link>Logout</Nav.Link>{" "}
              </Nav>
            </div>
          )}{" "}
        </div>
      </Navbar>
    </div>
  );
};

export default Appbar;
 