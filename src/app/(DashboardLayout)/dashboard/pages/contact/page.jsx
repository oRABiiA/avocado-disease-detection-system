"use client"
import React from 'react';
import { Row, Col, Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button, FormText } from 'reactstrap';

const ContactUs = () => {
  return (
    <Row>
      <Col md="8" className="mx-auto">
        <Card>
          <CardTitle tag="h5" className="border-bottom p-3 mb-0">
            <i className="bi bi-envelope me-2"></i>
            Contact Us
          </CardTitle>
          <CardBody>
            <Form>
              {/* Full Name */}
              <FormGroup>
                <Label for="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  type="text"
                />
              </FormGroup>

              {/* Email */}
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  type="email"
                />
              </FormGroup>

              {/* Phone Number */}
              <FormGroup>
                <Label for="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Enter your phone number"
                  type="number"
                />
              </FormGroup>

              {/* Subject */}
              <FormGroup>
                <Label for="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="What do you need help with?"
                  type="text"
                />
              </FormGroup>

              {/* Message */}
              <FormGroup>
                <Label for="message">Message</Label>
                <Input
                  id="message"
                  name="message"
                  placeholder="Describe your issue or question"
                  type="textarea"
                />
              </FormGroup>

              {/* File Upload */}
              <FormGroup>
                <Label for="file">Upload Files (Optional)</Label>
                <Input id="file" name="file" type="file" />
                <FormText>
                  Upload any relevant documents, images, or reports.
                </FormText>
              </FormGroup>

              {/* Radio Buttons - Type of Request */}
              <FormGroup tag="fieldset">
                <legend>Type of Request</legend>
                <FormGroup check>
                  <Input name="requestType" type="radio" />{' '}
                  <Label check>Technical Support</Label>
                </FormGroup>
                <FormGroup check>
                  <Input name="requestType" type="radio" />{' '}
                  <Label check>Product Inquiry</Label>
                </FormGroup>
                <FormGroup check>
                  <Input name="requestType" type="radio" />{' '}
                  <Label check>General Feedback</Label>
                </FormGroup>
              </FormGroup>

              {/* Consent Checkbox */}
              <FormGroup check>
                <Input type="checkbox" /> <Label check>I agree to the terms and conditions</Label>
              </FormGroup>

              <Button className="mt-3" color="primary">
                Submit
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default ContactUs;
