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
  Alert,
} from "reactstrap";
import Image from "next/image";
import { useState, useEffect } from "react";
import loginImage from "/public/images/background/login/greens.jpg";
import { useRouter } from "next/navigation";
import Logo from "@/app/(auth)/login/shared/logo/Loginlogo";
import { motion } from "framer-motion";
import Loading from "@/app/loading"

// firebase imports
import {ref, get, child } from "firebase/database";
import { database } from "@/lib/firebaseConfig";


const LoginPage = ({ onLoginSuccess }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      setLoading(true);
      const db = database;
      const dbRef = ref(db);
  
      const snapshot = await get(child(dbRef, `users/${userId}`));
  
      if (snapshot.exists()) {
        const userData = snapshot.val();
      
        if (userData.password === password) {
          sessionStorage.setItem("loggedIn", "true");

          sessionStorage.setItem("user", JSON.stringify(userData));

          if (onLoginSuccess) onLoginSuccess();
          console.log("Getting data from mqtt...");
          router.push("/dashboard");
        } else {
          setError("Incorrect password.");
        }
      } else {
        setError("User not found.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="vh-100 d-flex align-items-center">
      <Row className="w-100">
        {/* Left image section */}
        {/* <Col md="6" className="d-none d-md-block p-0">
          <div style={{ height: "100vh", position: "relative" }}>
            <Image
              src={loginImage}
              alt="Farm Login"
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
        </Col> */}

        {/* Left image section */}
        <Col md="6" className="d-none d-md-block p-0">
          <div
            style={{
              height: "100vh",
              position: "relative",
              WebkitMaskImage: "linear-gradient(to right, black 60%, transparent 100%)",
              maskImage: "linear-gradient(to right, black 60%, transparent 100%)",
            }}
          >
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
          {/* Motion wrapper for animation */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-75"
          >
            <Card className="p-4 shadow-lg rounded">
              <CardBody>
                <Logo text="Welcome Farmer" />
                {error && <Alert color="danger">{error}</Alert>}

                <Form onSubmit={handleLogin}>
                  <FormGroup>
                    <Label for="id">Username</Label>
                    <Input
                      id="id"
                      name="userid"
                      type="id"
                      placeholder="Enter your username"
                      autoComplete="UserId"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
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
                      autoComplete="current-password"
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
          </motion.div>
        </Col>
      </Row>
      {/* 🔥 Show loading spinner */}
      {loading && <Loading />}
    </Container>
  );
};

export default LoginPage;
