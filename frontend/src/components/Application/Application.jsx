import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../index";

const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [prn, setPrn] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState("");
  const [resume, setResume] = useState(null);

  const { user } = useContext(Context);
  const { isAuthorized } = useContext(Context);

  const navigateTo = useNavigate();

  // Function to handle file input changes
  const handleFileChange = (event) => {
    const resume = event.target.files[0];
    setResume(resume);
  };

  const { id } = useParams();
  console.log(id.params);
  const handleApplication = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("prn", prn);
    formData.append("course", course);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/application/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/json",
          },
        }
      );

      setName("");
      setEmail("");
      setCoverLetter("");
      setPrn("");
      setPhone("");
      setCourse("");
      setResume("");
      toast.success(data.message);
      navigateTo("/job/getall");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthorized || (user && user.role === "TPO")) {
    navigateTo("/");
    // return null;
  }

  return (
    <section className="application my-5">
      <Container style={{ width: "40%" }}>
        <h3 className="text-center mb-4">Application Form</h3>
        <Form onSubmit={handleApplication}>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formName">
                <Form.Label>Your Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formEmail">
                <Form.Label>Your Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formPhone">
                <Form.Label>Your PRN Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter your PRN number"
                  value={prn}
                  onChange={(e) => setPrn(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formPhone">
                <Form.Label>Your Phone Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formAddress">
                <Form.Label>Your Course</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your Course"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formCoverLetter">
                <Form.Label>Cover Letter</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Cover letter..."
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formResume">
                <Form.Label>Select Resume</Form.Label>
                <Form.Control
                  type="file"
                  accept=".pdf, .jpg, .png"
                  onChange={handleFileChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button
            variant="primary"
            type="submit"
            className="w-45"
            onSubmit={handleApplication}
          >
            Send Application
          </Button>
        </Form>
      </Container>
    </section>
  );
};

export default Application;
