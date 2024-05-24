import React, { useContext } from "react";
//import { Context } from "../../index";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { Container, Row, Col } from "react-bootstrap";
//import "./Footer.css";

const Footer = () => {
  //   const { isAuthorized } = useContext(Context);

  return (
    <footer
      style={{
        backgroundColor: "#212529",
        color: "#fff",
        padding: "10px 0",
        height: "50px",
        position: "fixed",
        bottom: "0",
        width: "100%",
      }}
    >
      <Container>
        <Row className="justify-content-between align-items-center">
          <Col md="6" className="text-center text-md-start">
            &copy; 2024 All Rights Reserved By CDACMumbai PlacementPortal
          </Col>
          <Col md="6" className="text-center text-md-end">
            <Link
              to={"https://www.cdac.in/index.aspx?id=mumbai"}
              target="_blank"
              className="text-white me-3"
            >
              <FaFacebookF />
            </Link>
            <Link
              to={"https://www.cdac.in/index.aspx?id=mumbai"}
              target="_blank"
              className="text-white me-3"
            >
              <FaYoutube />
            </Link>
            <Link
              to={"https://www.cdac.in/index.aspx?id=mumbai"}
              target="_blank"
              className="text-white me-3"
            >
              <FaLinkedin />
            </Link>
            <Link
              to={"https://www.cdac.in/index.aspx?id=mumbai"}
              target="_blank"
              className="text-white"
            >
              <RiInstagramFill />
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

// import React from "react";

// const Footer = () => {
//   return <div>Footer</div>;
// };

// export default Footer;
