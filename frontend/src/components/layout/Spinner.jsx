import React from 'react'

import {  Spinner } from "react-bootstrap";
const Spin = () => {
    return (
      <div style={{ textAlign: "center" }}>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
          style={{ width: "10vw", height: "10vw", marginTop: "10vw" }}
          variant="success"
        />
      </div>
    );
}

export default Spin
