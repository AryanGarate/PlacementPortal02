import React from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./About.css"; // Custom CSS file

const AboutUs = () => {
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">About CDAC Mumbai</h2>
      <Row className="mb-5">
        <Col md={6}>
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIR2MZKjpFCinkrZ9n8f-F31E-hD8-_zvWDOdodkbh4w&s"
            className="about-image"
            style={{ width: "450px" }}
          />
        </Col>
        <Col md={6}>
          <h3>About CDAC</h3>
          <p className="about-text">
            The Centre for Development of Advanced Computing (C-DAC) is a
            premier R&D organization of the Ministry of Electronics and
            Information Technology (MeitY) for carrying out R&D in IT,
            Electronics, and associated areas. CDAC Mumbai has been at the
            forefront of research and development in the field of information
            technology and electronics.
          </p>
          <h3>CDAC Mumbai</h3>
          <p className="about-text">
            CDAC Mumbai is one of the leading centers focusing on various
            aspects of IT, including software development, high-performance
            computing, and professional training programs. The center is
            renowned for its innovative solutions and contributions to the
            industry.
          </p>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col>
          <h3>Placement Information</h3>
          <p className="about-text">
            CDAC Mumbai has a strong placement cell that facilitates campus
            recruitment for its students. The center has a stellar record of
            placing students in top IT companies and organizations. The
            placement cell provides guidance and support to students throughout
            the recruitment process.
          </p>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col>
          <Card className="director-card">
            <Row noGutters>
              <Col md={4}>
                <Image
                  src="images/cpsir.jpg"
                  fluid
                  className="director-image"
                />
              </Col>
              <Col md={8}>
                <Card.Body>
                  <Card.Title>Senior Director - CDAC Mumbai</Card.Title>
                  <Card.Text>
                    <strong>Name:</strong> Dr. C.P.Johnson
                  </Card.Text>
                  <Card.Text>
                    <strong>About:</strong> Dr. C.P.Johnson is the Senior
                    Director of CDAC Mumbai. With extensive experience in the IT
                    industry and academia, Dr. C.P.Johnson has been instrumental
                    in leading several key projects at CDAC Mumbai. Under their
                    leadership, the center has achieved significant milestones
                    in research and development.
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <br></br>
    </Container>
  );
};

export default AboutUs;
