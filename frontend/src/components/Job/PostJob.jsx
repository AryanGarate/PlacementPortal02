import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Context } from "../../index";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [eligible, setEligible] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized || (user && user.role !== "TPO")) {
      navigateTo("/");
    }
  }, [isAuthorized, user, navigateTo]);

  const handleJobPost = async (e) => {
    e.preventDefault();
    if (salaryType === "Fixed Salary") {
      setSalaryFrom("");
      setSalaryTo("");
    } else if (salaryType === "Ranged Salary") {
      setFixedSalary("");
    } else {
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
    }
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/job/post",
        fixedSalary.length >= 4
          ? {
              title,
              description,
              category,
              eligible,
              state,
              city,
              location,
              fixedSalary,
            }
          : {
              title,
              description,
              category,
              eligible,
              state,
              city,
              location,
              salaryFrom,
              salaryTo,
            },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <Container className="job_post page mt-5">
      <h3 className="text-center mb-4">POST NEW PLACEMENT DRIVE</h3>
      <Form onSubmit={handleJobPost}>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formTitle">
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Job Title"
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formCategory">
              <Form.Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                <option value="Graphics & Design">Graphics & Design</option>
                <option value="Mobile App Development">
                  Mobile App Development
                </option>
                <option value="Frontend Web Development">
                  Frontend Web Development
                </option>
                <option value="MERN Stack Development">
                  MERN Stack Development
                </option>
                <option value="Account & Finance">Account & Finance</option>
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
                <option value="Video Animation">Video Animation</option>
                <option value="MEAN Stack Development">
                  MEAN Stack Development
                </option>
                <option value="MEVN Stack Development">
                  MEVN Stack Development
                </option>
                <option value="Data Entry Operator">Data Entry Operator</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formCategory">
              <Form.Select
                value={eligible}
                onChange={(e) => setEligible(e.target.value)}
                required
              >
                <option value="">Select Cousre</option>
                <option value="PG-DAC,PG-DBDA">PG-DAC , PG-DBDA</option>
                <option value="PG-DAC">PG-DAC</option>
                <option value="PG-DBDA">PG-DBDA</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formCountry">
              <Form.Control
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="State"
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formCity">
              <Form.Control
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="formLocation" className="mb-3">
          <Form.Control
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            required
          />
        </Form.Group>
        <Form.Group controlId="formSalaryType" className="mb-3">
          <Form.Select
            value={salaryType}
            onChange={(e) => setSalaryType(e.target.value)}
            required
          >
            <option value="default">Select Salary Type</option>
            <option value="Fixed Salary">Fixed Salary</option>
            <option value="Ranged Salary">Ranged Salary</option>
          </Form.Select>
        </Form.Group>
        {salaryType === "Fixed Salary" ? (
          <Form.Group controlId="formFixedSalary" className="mb-3">
            <Form.Control
              type="number"
              placeholder="Enter Fixed Salary"
              value={fixedSalary}
              onChange={(e) => setFixedSalary(e.target.value)}
              required
            />
          </Form.Group>
        ) : salaryType === "Ranged Salary" ? (
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formSalaryFrom">
                <Form.Control
                  type="number"
                  placeholder="Salary From"
                  value={salaryFrom}
                  onChange={(e) => setSalaryFrom(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formSalaryTo">
                <Form.Control
                  type="number"
                  placeholder="Salary To"
                  value={salaryTo}
                  onChange={(e) => setSalaryTo(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
        ) : (
          <p className="text-danger">Please select a salary type</p>
        )}
        <Form.Group controlId="formDescription" className="mb-3">
          <Form.Control
            as="textarea"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Job Description"
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary" onSubmit={handleJobPost}>
          Create Job
        </Button>
      </Form>
      <br></br>
    </Container>
  );
};

export default PostJob;
