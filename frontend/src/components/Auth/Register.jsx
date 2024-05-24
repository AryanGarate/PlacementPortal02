import React, { useContext, useState } from "react";
import { Context } from "../../index";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { Container, Row, Col, Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Register.css";
import Cookies from "js-cookie";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [prn, setPrn] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://127.0.0.1:4000/api/v1/user/register",
        { name, email, prn, phone, password, role },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (data.success) {
        // Store the token in a cookie
        Cookies.set("token", data.token, { expires: 30 });
      }
      toast.success(data.message);
      setName("");
      setEmail("");
      setPrn("");
      setPhone("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <section
        className="authPage"
        style={{ backgroundColor: "#f8f9fa", padding: "40px 0" }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} className="text-center mb-4">
              <Image
                src="https://cdac.in/index.aspx?id=img_Mumbai-cb"
                alt="CDAC Banner"
                fluid
                className="banner-image"
              />
            </Col>
            <Col md={8} lg={6} className="form-container">
              <div className="header text-center mb-4">
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr23p1FugM3qOjk981oR_gAEwiuVAm8VfsAXkWhHEKsA&s"
                  alt="CDAC logo"
                  fluid
                  className="logo-image"
                />
                <h3 className="mt-3">Create a new account</h3>
              </div>
              <Form>
                <Form.Group className="mb-3 inputTag">
                  <Form.Label>Register As</Form.Label>
                  <div className="d-flex align-items-center">
                    <Form.Select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="form-control-with-icon"
                    >
                      <option value="">Select Role</option>
                      <option value="Student">Student</option>
                      <option value="TPO">TPO</option>
                    </Form.Select>
                    <FaRegUser className="ms-2 icon" />
                  </div>
                </Form.Group>
                <Form.Group className="mb-3 inputTag">
                  <Form.Label>Name</Form.Label>
                  <div className="d-flex align-items-center">
                    <Form.Control
                      type="text"
                      placeholder="Enter A Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control-with-icon"
                    />
                    <FaPencilAlt className="ms-2 icon" />
                  </div>
                </Form.Group>
                <Form.Group className="mb-3 inputTag">
                  <Form.Label>Email Address</Form.Label>
                  <div className="d-flex align-items-center">
                    <Form.Control
                      type="email"
                      placeholder="abc@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control-with-icon"
                    />
                    <MdOutlineMailOutline className="ms-2 icon" />
                  </div>
                </Form.Group>
                <Form.Group className="mb-3 inputTag">
                  <Form.Label>PRN Number</Form.Label>
                  <div className="d-flex align-items-center">
                    <Form.Control
                      type="number"
                      placeholder="12345678"
                      value={prn}
                      onChange={(e) => setPrn(e.target.value)}
                      className="form-control-with-icon"
                    />
                    <FaUser className="ms-2 icon" />
                  </div>
                </Form.Group>
                <Form.Group className="mb-3 inputTag">
                  <Form.Label>Phone Number</Form.Label>
                  <div className="d-flex align-items-center">
                    <Form.Control
                      type="number"
                      placeholder="12345678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-control-with-icon"
                    />
                    <FaPhoneFlip className="ms-2 icon" />
                  </div>
                </Form.Group>
                <Form.Group className="mb-3 inputTag">
                  <Form.Label>Password</Form.Label>
                  <div className="d-flex align-items-center">
                    <Form.Control
                      type="password"
                      placeholder="Your Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control-with-icon"
                    />
                    <RiLock2Fill className="ms-2 icon" />
                  </div>
                </Form.Group>
                <Button
                  type="submit"
                  onClick={handleRegister}
                  variant="primary"
                  className="w-100"
                >
                  Register
                </Button>
                <div className="text-center mt-3">
                  <Link to="/login">Login Now</Link>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Register;
