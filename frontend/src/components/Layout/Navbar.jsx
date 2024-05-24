import React, { useContext, useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { Context } from "../../index";

const Navbars = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(data.message);
      //console.log(toast.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="navbarShow">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/d/db/C-DAC_LogoTransp.png"
            alt="CDAC Mumbai Logo"
            width="60px"
          />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setShow(!show)}
        >
          <GiHamburgerMenu />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav" className={show ?"show" : ""}>
          <Nav className="me-auto">
            <LinkContainer to="/" onClick={() => setShow(false)}>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/about" onClick={() => setShow(false)}>
              <Nav.Link>AboutUs</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/job/getall" onClick={() => setShow(false)}>
              <Nav.Link>All Placements</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/applications/me" onClick={() => setShow(false)}>
              <Nav.Link>
                {user && user.role === "TPO"
                  ? "Applicant's Applications"
                  : "My Applications"}
              </Nav.Link>
            </LinkContainer>
            {user && user.role === "TPO" && (
              <>
                <LinkContainer to="/job/post" onClick={() => setShow(false)}>
                  <Nav.Link>Post New Job</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/job/me" onClick={() => setShow(false)}>
                  <Nav.Link>View Your Jobs</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
          <Button variant="outline-light" onClick={handleLogout} type="button">
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbars;
