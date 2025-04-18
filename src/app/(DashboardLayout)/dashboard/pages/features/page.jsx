"use client"
import React from 'react';
import { Row, Col, Card, CardBody, CardTitle, CardText, CardImg, Button } from 'reactstrap';
import featureImg1 from '/public/images/background/feature1.png'; // Replace with real images
import featureImg2 from '/public/images/background/feature2.png'; // Replace with real images
import featureImg3 from '/public/images/background/feature3.png'; // Replace with real images
import featureImg4 from '/public/images/background/feature4.png'; // Replace with real images

const Features = () => {
    return (
        <Row>
          <Col md="6" lg="4">
            <Card>
              <CardImg top src={featureImg1.src} alt="Smart Irrigation" />
              <CardBody>
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-droplet-fill fs-3 text-info me-3"></i>
                  <CardTitle tag="h5">Smart Irrigation</CardTitle>
                </div>
                <CardText>
                  Automatically water your avocado trees based on real-time soil moisture levels, reducing waste and improving efficiency.
                </CardText>
                <Button color="info">Learn More</Button>
              </CardBody>
            </Card>
          </Col>
    
          <Col md="6" lg="4">
            <Card>
              <CardImg top src={featureImg2.src} alt="Tree Health Monitoring" />
              <CardBody>
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-heart-pulse-fill fs-3 text-success me-3"></i>
                  <CardTitle tag="h5">Tree Health Monitoring</CardTitle>
                </div>
                <CardText>
                  Monitor the health of your avocado trees with live sensor feedback for temperature and humidity.
                </CardText>
                <Button color="success">Learn More</Button>
              </CardBody>
            </Card>
          </Col>
    
          <Col md="6" lg="4">
            <Card>
              <CardImg top src={featureImg3.src} alt="Nutrient Management" />
              <CardBody>
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-capsule-pill fs-3 text-warning me-3"></i>
                  <CardTitle tag="h5">Nutrient Management</CardTitle>
                </div>
                <CardText>
                  Get alerts about nutrient deficiencies and apply treatment as needed to maximize productivity.
                </CardText>
                <Button color="warning">Learn More</Button>
              </CardBody>
            </Card>
          </Col>
    
          <Col md="6" lg="4">
            <Card>
              <CardImg top src={featureImg4.src} alt="Pest Control Alerts" />
              <CardBody>
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-bug-fill fs-3 text-danger me-3"></i>
                  <CardTitle tag="h5">Pest Control Alerts</CardTitle>
                </div>
                <CardText>
                  Stay protected with automatic pest detection alerts and management recommendations.
                </CardText>
                <Button color="danger">Learn More</Button>
              </CardBody>
            </Card>
          </Col>
    
          <Col md="6" lg="4">
            <Card>
              <CardImg top src={featureImg1.src} alt="Real-Time Analytics" />
              <CardBody>
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-bar-chart-line-fill fs-3 text-primary me-3"></i>
                  <CardTitle tag="h5">Real-Time Analytics</CardTitle>
                </div>
                <CardText>
                  Access live data insights on your orchard{"'"}s conditions and performance metrics from anywhere.
                </CardText>
                <Button color="primary">Learn More</Button>
              </CardBody>
            </Card>
          </Col>
    
          <Col md="6" lg="4">
            <Card>
              <CardImg top src={featureImg2.src} alt="Task Management" />
              <CardBody>
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-check2-square fs-3 text-dark me-3"></i>
                  <CardTitle tag="h5">Task Management</CardTitle>
                </div>
                <CardText>
                  Keep track of all your daily farming tasks, monitor completion, and boost orchard efficiency.
                </CardText>
                <Button color="dark">Learn More</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
    );
};

export default Features;
