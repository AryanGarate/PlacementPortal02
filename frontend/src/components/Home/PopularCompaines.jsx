import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "react-bootstrap";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";
import { SiInfosys, SiTcs, SiWipro } from "react-icons/si";
import "./PopularCompanies.css";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Wipro",
      location: "Bangalore, India",
      openPositions: 15,
      icon: <SiWipro />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Banglore, India",
      openPositions: 5,
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Wipro",
      location: "Bangalore, India",
      openPositions: 15,
      icon: <SiWipro />,
    },
    {
      id: 4,
      title: "Infosys",
      location: "Bangalore, India",
      openPositions: 30,
      icon: <SiInfosys />,
    },
    {
      id: 5,
      title: "TCS",
      location: "Mumbai, India",
      openPositions: 25,
      icon: <SiTcs />,
    },
    {
      id: 6,
      title: "Wipro",
      location: "Bangalore, India",
      openPositions: 15,
      icon: <SiWipro />,
    },
  ];

  return (
    <div className="companies">
      <Container>
        <h3 className="text-center my-4">TOP COMPANIES</h3>
        <Row>
          {companies.map((element) => (
            <Col md="4" sm="6" xs="12" key={element.id} className="mb-4">
              <Card className="text-center h-100">
                <CardBody>
                  <div className="icon mb-3">{element.icon}</div>
                  <CardTitle tag="h5">{element.title}</CardTitle>
                  <CardText>{element.location}</CardText>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default PopularCompanies;
