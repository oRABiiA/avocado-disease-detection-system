"use client";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Image from "next/image";
import { useState } from "react";
import loginImage from "/public/images/background/feature2.png"; // Make sure image exists

const LoginPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Replace this with real authentication logic
    if (email === "admin@example.com" && password === "admin") {
      localStorage.setItem("loggedIn", "true");
      onLoginSuccess(); // Notify parent component of successful login
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Container fluid className="vh-100 d-flex align-items-center">
      <Row className="w-100">
        {/* Left image section */}
        <Col md="6" className="d-none d-md-block p-0">
          <div style={{ height: "100vh", position: "relative" }}>
            <Image
              src={loginImage}
              alt="Farm Login"
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
        </Col>

        {/* Right form section */}
        <Col
          md="6"
          className="d-flex align-items-center justify-content-center bg-light"
        >
          <Card className="p-4 w-75">
            <CardBody>
              <h3 className="mb-4">Welcome Back</h3>
              <Form onSubmit={handleLogin}>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </FormGroup>
                <Button color="primary" block className="mt-4" type="submit">
                  Login
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
