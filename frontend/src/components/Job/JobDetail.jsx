import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Context } from "../../index";

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();
  const { isAuthorized, user } = useContext(Context);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, { withCredentials: true })
      .then((res) => setJob(res.data.job))
      .catch((error) => navigateTo("/notfound"));
  }, [id, navigateTo]);

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/login");
    }
  }, [isAuthorized, navigateTo]);

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header as="h3">Placement Details</Card.Header>
            <Card.Body>
              <Card.Text>
                <strong>Title:</strong> <span>{job.title}</span>
              </Card.Text>
              <Card.Text>
                <strong>Category:</strong> <span>{job.category}</span>
              </Card.Text>
              <Card.Text>
                <strong>Eligible:</strong> <span>{job.eligible}</span>
              </Card.Text>
              <Card.Text>
                <strong>State:</strong> <span>{job.state}</span>
              </Card.Text>
              <Card.Text>
                <strong>City:</strong> <span>{job.city}</span>
              </Card.Text>
              <Card.Text>
                <strong>Location:</strong> <span>{job.location}</span>
              </Card.Text>
              <Card.Text>
                <strong>Description:</strong> <span>{job.description}</span>
              </Card.Text>
              <Card.Text>
                <strong>Job Posted On:</strong> <span>{job.jobPostedOn}</span>
              </Card.Text>
              <Card.Text>
                <strong>Salary:</strong>{" "}
                <span>
                  {job.fixedSalary
                    ? job.fixedSalary
                    : `${job.salaryFrom} - ${job.salaryTo}`}
                </span>
              </Card.Text>
              {user && user.role === "Student" && (
                <Link to={`/application/${job._id}`}>
                  <Button variant="primary" onClick={handleShow}>
                    Apply Now
                  </Button>
                </Link>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default JobDetail;
