import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from "react-bootstrap";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";
import "./HeroSection.css";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "141",
      subTitle: "Live Placement drive",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "920",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "240",
      subTitle: "Student",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "3,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];

  return (
    <>
      <div className="heroSection">
        <Container>
          <Row className="align-items-center">
            <Col md="6" className="title">
              <h1>
                Welcome to the CDAC Mumbai Placement Portal
              </h1>

              <p>. Here, you canexplore numerous opportunities to match your talents and skills.
               Placement Drive that suits your interests and skills</p>
            </Col>
            <Col md="6" className="image">
              <img
                src="https://dynamic.placementindia.com/blog_images/20200824101840_image1.jpg"
                alt="hero"
                className="img-fluid"
              />
            </Col>
          </Row>
          <Row className="details mt-4">
            {details.map((element) => (
              <Col md="3" sm="6" xs="12" key={element.id} className="mb-3">
                <Card className="text-center h-100">
                  <CardBody>
                    <div className="icon mb-2">{element.icon}</div>
                    <CardTitle tag="h5">{element.title}</CardTitle>
                    <CardText>{element.subTitle}</CardText>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default HeroSection;
