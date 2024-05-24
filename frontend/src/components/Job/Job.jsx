import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../index";
import { Container, Card, Row, Col, Button } from "react-bootstrap";

import "./PlacementSection.css";
const Job = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();
  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/api/v1/job/getall", {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  if (!isAuthorized) {
    navigateTo("/login");
  }
  return (
    <section className="placements page">
      <Container>
        <h1 className="text-center my-4">All Available Placements</h1>
        <Row className="banner">
          {jobs.jobs &&
            jobs.jobs.map((element) => (
              <Col md={4} className="mb-4" key={element._id}>
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <Card.Title>{element.title}</Card.Title>
                    <Card.Text>{element.category}</Card.Text>
                    <Card.Text>{element.eligible}</Card.Text>
                    <Button
                      variant="primary"
                      as={Link}
                      to={`/job/${element._id}`}
                    >
                      Placement Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </section>
  );
};

export default Job;
