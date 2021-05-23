import React, { useContext } from "react";
import alertContext from "../../context/alert/AlertContext";
import { Alert, Container,Button } from "react-bootstrap";

function AlertComponent() {
  const AlertContext = useContext(alertContext);
  const { alerts } = AlertContext;
  return alerts.map((alert, index) => (
    <Container className="p-1" style={{textAlign:"center"}}>
      <Button
        className="mt-1"
        style={{
          color: alert.color,
          backgroundColor: alert.bgColor,
        }}
        variant={alert.bgColor === "#28b62c" ? "success" : alert.bgColor==="#ff1436"?"danger":""}
      >
        {alert.msg}
      </Button>
    </Container>
  ));
}

export default AlertComponent;
