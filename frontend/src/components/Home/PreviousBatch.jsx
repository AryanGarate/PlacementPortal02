import React from "react";
import { Carousel, Container } from "react-bootstrap";
import "./PreviousBatch.css";

const PreviousBatch = () => {
  return (
    <div className="previousBatch">
      <Container>
        <h1 className="text-center my-4">PREVIOUS BATCH</h1>
        <Carousel
          interval={2000}
          className="carousel-custom"
          data-bs-theme="dark"
        >
          <Carousel.Item>
            <div className="carousel-img-container">
              <img
                className="d-block w-100 carousel-img"
                src="images/img.jpeg"
                alt="First slide"
              />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel-img-container">
              <img
                className="d-block w-100 carousel-img"
                src="images/img2.jpeg"
                alt="Second slide"
              />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel-img-container">
              <img
                className="d-block w-100 carousel-img"
                src="images/img3.jpeg"
                alt="Third slide"
              />
            </div>
          </Carousel.Item>
        </Carousel>
      </Container>
    </div>
  );
};

export default PreviousBatch;
