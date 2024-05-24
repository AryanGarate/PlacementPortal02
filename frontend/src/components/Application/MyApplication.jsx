import { Card, Row, Col, Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../index";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import ResumeModal from "./ResumeModal";

const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      if (user && user.role === "TPO") {
        axios
          .get("http://localhost:4000/api/v1/application/employer/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      } else {
        axios
          .get("http://localhost:4000/api/v1/application/Student/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    navigateTo("/");
  }

  // const deleteApplication = (id) => {
  //   try {
  //     axios
  //       .delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
  //         withCredentials: true,
  //       })
  //       .then((res) => {
  //         toast.success(res.data.message);
  //         setApplications((prevApplication) =>
  //           prevApplication.filter((application) => application._id !== id)
  //         );
  //       });
  //   } catch (error) {
  //     toast.error(error.response.data.message);
  //   }
  // };

  const { id } = useParams();
  const deleteApplication = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/v1/application/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      setApplications((prevApplications) =>
        prevApplications.filter((application) => application._id !== id)
      );
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Container fluid className="my_applications page">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="mb-4" style={{ width: "100%" }}>
            <Card.Body>
              <h1 className="text-center mb-4">
                {user && user.role === "Student"
                  ? "My Applications"
                  : "Applications From Student"}
              </h1>
              {applications?.length <= 0 ? (
                <h4 className="text-center">No Applications Found</h4>
              ) : (
                applications?.map((element) =>
                  user && user.role === "Student" ? (
                    <StudentCard
                      element={element}
                      key={element._id}
                      deleteApplication={deleteApplication}
                      openModal={openModal}
                    />
                  ) : (
                    <TPOCard
                      element={element}
                      key={element._id}
                      openModal={openModal}
                    />
                  )
                )
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </Container>
  );
};

export default MyApplications;

const StudentCard = ({ element, deleteApplication, openModal }) => {
  return (
    <Card className="job_seeker_card mb-3">
      <Card.Body>
        <Card.Title>Student Applicant Details</Card.Title>
        <Row className="mb-3">
          <Col sm={2}>
            <strong>Name:</strong>
          </Col>
          <Col sm={4}>{element.name}</Col>
          <Col sm={2}>
            <strong>Email:</strong>
          </Col>
          <Col sm={4}>{element.email}</Col>
        </Row>
        <Row className="mb-3">
          <Col sm={2}>
            <strong>PRN:</strong>
          </Col>
          <Col sm={4}>{element.prn}</Col>
          <Col sm={2}>
            <strong>Phone:</strong>
          </Col>
          <Col sm={4}>{element.phone}</Col>
        </Row>
        <Row className="mb-3">
          <Col sm={2}>
            <strong>Course:</strong>
          </Col>
          <Col sm={4}>{element.course}</Col>
          <Col sm={2}>
            <strong>Cover Letter:</strong>
          </Col>
          <Col sm={4}>{element.coverLetter}</Col>
        </Row>
        <Row className="mb-3">
          <Col sm={12} className="text-center">
            <img
              src={element.resume.url}
              alt="Resume"
              style={{ maxWidth: "300px" }} // Adjust the maximum width of the image
              onClick={() => openModal(element.resume.url)}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col sm={12} className="text-center">
            <Button onClick={() => deleteApplication(element._id)}>
              Delete Application
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

const TPOCard = ({ element, openModal }) => {
  return (
    <Card className="job_seeker_card">
      <Card.Body>
        <Card.Title>Student Applicant Details</Card.Title>
        <Row className="mb-3">
          <Col sm={2}>
            <strong>Name:</strong>
          </Col>
          <Col sm={10}>{element.name}</Col>
        </Row>
        <Row className="mb-3">
          <Col sm={2}>
            <strong>Email:</strong>
          </Col>
          <Col sm={10}>{element.email}</Col>
        </Row>
        <Row className="mb-3">
          <Col sm={2}>
            <strong>PRN:</strong>
          </Col>
          <Col sm={10}>{element.prn}</Col>
        </Row>
        <Row className="mb-3">
          <Col sm={2}>
            <strong>Phone:</strong>
          </Col>
          <Col sm={10}>{element.phone}</Col>
        </Row>
        <Row className="mb-3">
          <Col sm={2}>
            <strong>Cousre:</strong>
          </Col>
          <Col sm={10}>{element.course}</Col>
        </Row>
        <Row className="mb-3">
          <Col sm={2}>
            <strong>Cover Letter:</strong>
          </Col>
          <Col sm={10}>{element.coverLetter}</Col>
        </Row>

        <Row className="mb-3">
          <Col sm={12} className="text-center">
            <img
              src={element.resume.url}
              alt="resume"
              style={{ maxWidth: "300px" }} // Adjust the maximum width of the image
              onClick={() => openModal(element.resume.url)}
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

///export { StudentkerCard, TPOCard };
