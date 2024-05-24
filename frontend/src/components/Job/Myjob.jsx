import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck, FaEdit, FaTrashAlt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../index";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import "./Myjob.css";

const Myjob = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();
  //Fetching all jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/job/getmyjobs",
          { withCredentials: true }
        );
        console.log(data.myJobs, data);

        setMyJobs(data.myjobs);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log("line 26");
        setMyJobs([]);
      }
    };

    fetchJobs();
  }, []);
  if (!isAuthorized || (user && user.role !== "TPO")) {
    navigateTo("/");
  }

  //Function For Enabling Editing Mode
  const handleEnableEdit = (jobId) => {
    //Here We Are Giving Id in setEditingMode because We want to enable only that job whose ID has been send.
    setEditingMode(jobId);
  };

  //Function For Disabling Editing Mode
  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  //Function For Updating The Job
  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    await axios
      .put(`http://localhost:4000/api/v1/job/update/${jobId}`, updatedJob, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  //Function For Deleting Job
  const handleDeleteJob = async (jobId) => {
    await axios
      .delete(`http://localhost:4000/api/v1/job/delete/${jobId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleInputChange = (jobId, field, value) => {
    // Update the job object in the jobs state with the new value
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <Container className="myJobs page my-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1 className="text-center page-title">Your Posted Placements</h1>
          {myJobs?.length > 0 ? (
            myJobs.map((job) => (
              <Card key={job._id} className="mb-4">
                <Card.Body>
                  <Form>
                    <Row>
                      <Col md={6}>
                        <Form.Group
                          controlId={`jobTitle-${job._id}`}
                          className="mb-3"
                        >
                          <Form.Label className="form-label">Title:</Form.Label>
                          <Form.Control
                            type="text"
                            value={job.title}
                            disabled={editingMode !== job._id}
                            onChange={(e) =>
                              handleInputChange(
                                job._id,
                                "title",
                                e.target.value
                              )
                            }
                          />
                        </Form.Group>
                        <Form.Group
                          controlId={`jobState-${job._id}`}
                          className="mb-3"
                        >
                          <Form.Label className="form-label">State:</Form.Label>
                          <Form.Control
                            type="text"
                            value={job.state}
                            disabled={editingMode !== job._id}
                            onChange={(e) =>
                              handleInputChange(
                                job._id,
                                "state",
                                e.target.value
                              )
                            }
                          />
                        </Form.Group>
                        <Form.Group
                          controlId={`jobCity-${job._id}`}
                          className="mb-3"
                        >
                          <Form.Label className="form-label">City:</Form.Label>
                          <Form.Control
                            type="text"
                            value={job.city}
                            disabled={editingMode !== job._id}
                            onChange={(e) =>
                              handleInputChange(job._id, "city", e.target.value)
                            }
                          />
                        </Form.Group>
                        <Form.Group
                          controlId={`jobCategory-${job._id}`}
                          className="mb-3"
                        >
                          <Form.Label className="form-label">
                            Category:
                          </Form.Label>
                          <Form.Select
                            value={job.category}
                            disabled={editingMode !== job._id}
                            onChange={(e) =>
                              handleInputChange(
                                job._id,
                                "category",
                                e.target.value
                              )
                            }
                          >
                            <option value="Graphics & Design">
                              Graphics & Design
                            </option>
                            <option value="Mobile App Development">
                              Mobile App Development
                            </option>
                            <option value="Frontend Web Development">
                              Frontend Web Development
                            </option>
                            <option value="MERN Stack Development">
                              MERN Stack Development
                            </option>
                            <option value="Account & Finance">
                              Account & Finance
                            </option>
                            <option value="Artificial Intelligence">
                              Artificial Intelligence
                            </option>
                            <option value="Video Animation">
                              Video Animation
                            </option>
                            <option value="MEAN Stack Development">
                              MEAN Stack Development
                            </option>
                            <option value="MEVN Stack Development">
                              MEVN Stack Development
                            </option>
                            <option value="Data Entry Operator">
                              Data Entry Operator
                            </option>
                          </Form.Select>
                        </Form.Group>
                        <Form.Group
                          controlId={`jobeligible-${job._id}`}
                          className="mb-3"
                        >
                          <Form.Label className="form-label">
                            Eligible:
                          </Form.Label>
                          <Form.Select
                            value={job.eligible}
                            disabled={editingMode !== job._id}
                            onChange={(e) =>
                              handleInputChange(
                                job._id,
                                "eligible",
                                e.target.value
                              )
                            }
                          >
                            <option value="PG-DAC , PGDBDA">
                              PG-DAC , PGDBDA
                            </option>
                            <option value="PGDAC">PGDAC</option>
                            <option value="PGDBDA">PGDBDA</option>
                          </Form.Select>
                        </Form.Group>
                        <Form.Group
                          controlId={`jobSalary-${job._id}`}
                          className="mb-3"
                        >
                          <Form.Label className="form-label">
                            Salary:
                          </Form.Label>
                          {job.fixedSalary ? (
                            <Form.Control
                              type="number"
                              value={job.fixedSalary}
                              disabled={editingMode !== job._id}
                              onChange={(e) =>
                                handleInputChange(
                                  job._id,
                                  "fixedSalary",
                                  e.target.value
                                )
                              }
                            />
                          ) : (
                            <Row>
                              <Col>
                                <Form.Control
                                  type="number"
                                  placeholder="From"
                                  value={job.salaryFrom}
                                  disabled={editingMode !== job._id}
                                  onChange={(e) =>
                                    handleInputChange(
                                      job._id,
                                      "salaryFrom",
                                      e.target.value
                                    )
                                  }
                                />
                              </Col>
                              <Col>
                                <Form.Control
                                  type="number"
                                  placeholder="To"
                                  value={job.salaryTo}
                                  disabled={editingMode !== job._id}
                                  onChange={(e) =>
                                    handleInputChange(
                                      job._id,
                                      "salaryTo",
                                      e.target.value
                                    )
                                  }
                                />
                              </Col>
                            </Row>
                          )}
                        </Form.Group>
                        <Form.Group
                          controlId={`jobExpired-${job._id}`}
                          className="mb-3"
                        >
                          <Form.Label className="form-label">
                            Expired:
                          </Form.Label>
                          <Form.Select
                            value={job.expired}
                            disabled={editingMode !== job._id}
                            onChange={(e) =>
                              handleInputChange(
                                job._id,
                                "expired",
                                e.target.value
                              )
                            }
                          >
                            <option value={true}>TRUE</option>
                            <option value={false}>FALSE</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group
                          controlId={`jobDescription-${job._id}`}
                          className="mb-3"
                        >
                          <Form.Label className="form-label">
                            Description:
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={job.description}
                            disabled={editingMode !== job._id}
                            onChange={(e) =>
                              handleInputChange(
                                job._id,
                                "description",
                                e.target.value
                              )
                            }
                          />
                        </Form.Group>
                        <Form.Group
                          controlId={`jobLocation-${job._id}`}
                          className="mb-3"
                        >
                          <Form.Label className="form-label">
                            Location:
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={job.location}
                            disabled={editingMode !== job._id}
                            onChange={(e) =>
                              handleInputChange(
                                job._id,
                                "location",
                                e.target.value
                              )
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
                  <div className="d-flex justify-content-between mt-3">
                    <div>
                      {editingMode === job._id ? (
                        <>
                          <Button
                            variant="success"
                            className="me-2"
                            onClick={() => handleUpdateJob(job._id)}
                          >
                            <FaCheck />
                          </Button>
                          <Button variant="danger" onClick={handleDisableEdit}>
                            <RxCross2 />
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="primary"
                          onClick={() => handleEnableEdit(job._id)}
                        >
                          <FaEdit /> Edit
                        </Button>
                      )}
                    </div>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteJob(job._id)}
                    >
                      <FaTrashAlt /> Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p className="text-center no-jobs-message">
              You've not posted any job or may be you deleted all of your jobs!
            </p>
          )}
        </Col>
      </Row>
      <br></br>
    </Container>
  );
};

export default Myjob;
