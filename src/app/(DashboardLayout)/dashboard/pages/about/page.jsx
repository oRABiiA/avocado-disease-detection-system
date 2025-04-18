'use client'
import React from "react";
import {
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Card,
  CardSubtitle,
  Container,
  CardText,
} from "reactstrap";
import Image from "next/image";
import aboutImage from '/public/images/background/about.png';
import 'bootstrap-icons/font/bootstrap-icons.css';

const About = () => {
  return (
    <Container className="py-5">
      <Row className="align-items-center mb-5">
        <Col md="6" className="mb-4 mb-md-0">
          <Image 
            src={aboutImage} 
            alt="Avocado farm" 
            className="img-fluid rounded" 
            width={600}
            height={400}
          />
        </Col>
        <Col md="6">
          <h2 className="fw-bold">About AvoTech</h2>
          <p className="text-muted mt-3">
            AvoTech is an advanced agricultural monitoring system designed specifically for avocado farmers. 
            Our mission is to bring precision farming to the avocado industry by leveraging real-time data, 
            smart sensors, and intuitive dashboards to optimize every aspect of orchard management.
          </p>
          <p className="text-muted">
            Whether it{"'"}s tracking air temperature, soil moisture, or recent farming activity, AvoTech ensures 
            farmers can make timely and data-driven decisions for healthier trees and improved yield.
          </p>
        </Col>
      </Row>

      <Row className="gy-4">
        <Col md="6" lg="3">
          <Card body color="info" inverse>
            <CardBody>
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-display me-3" style={{ fontSize: '30px' }}></i>
                <CardTitle tag="h5">Smart Monitoring</CardTitle>
              </div>
              <CardText>
                Get real-time updates from your orchard sensors for temperature, moisture, and more.
              </CardText>
            </CardBody>
          </Card>
        </Col>
        <Col md="6" lg="3">
          <Card body color="success" inverse>
            <CardBody>
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-check-circle me-3" style={{ fontSize: '30px' }}></i>
                <CardTitle tag="h5">Task Management</CardTitle>
              </div>
              <CardText>
                Keep track of completed and upcoming tasks so nothing is forgotten in the field.
              </CardText>
            </CardBody>
          </Card>
        </Col>
        <Col md="6" lg="3">
          <Card body color="warning" inverse>
            <CardBody>
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-heart-pulse me-3" style={{ fontSize: '30px' }}></i>
                <CardTitle tag="h5">Tree Health Insights</CardTitle>
              </div>
              <CardText>
                Visualize the condition and history of each tree to proactively address issues.
              </CardText>
            </CardBody>
          </Card>
        </Col>
        <Col md="6" lg="3">
          <Card body color="dark" inverse>
            <CardBody>
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-person-circle me-3" style={{ fontSize: '30px' }}></i>
                <CardTitle tag="h5">Farmer-Centric Design</CardTitle>
              </div>
              <CardText>
                Built with simplicity and productivity in mind, for real-world avocado growers.
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
