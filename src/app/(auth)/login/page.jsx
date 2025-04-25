// "use client";
// import {
//   Button,
//   Card,
//   CardBody,
//   Col,
//   Container,
//   Form,
//   FormGroup,
//   Input,
//   Label,
//   Row,
//   Alert,
// } from "reactstrap";
// import Image from "next/image";
// import { useState } from "react";
// import loginImage from "/public/images/background/feature2.png";
// import { useRouter } from "next/navigation";
// import Logo from "@/app/(auth)/login/shared/logo/logo"

// const LoginPage = ({ onLoginSuccess }) => {
//   const [userId, setUserId] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleLogin = (e) => {
//     e.preventDefault();

//     if (userId === "user" && password === "a") {
//       // Option A: logout on browser close
//       sessionStorage.setItem("loggedIn", "true");

//       // Option B: auto logout after X hours
//       // const expirationHours = 2;
//       // const expiryTime = new Date().getTime() + expirationHours * 60 * 60 * 1000;
//       // localStorage.setItem("loggedIn", "true");
//       // localStorage.setItem("expiryTime", expiryTime.toString());

//       if (onLoginSuccess) onLoginSuccess(); // Optional callback
//       router.push("/dashboard");
//     } else {
//       setError("Invalid credentials");
//     }
//   };

//   return (
//     <Container fluid className="vh-100 d-flex align-items-center">
//       <Row className="w-100">
//         {/* Left image section */}
//         <Col md="6" className="d-none d-md-block p-0">
//           <div style={{ height: "100vh", position: "relative" }}>
//             <Image
//               src={loginImage}
//               alt="Farm Login"
//               layout="fill"
//               objectFit="cover"
//               priority
//             />
//           </div>
//         </Col>

//         {/* Right form section */}
//         <Col
//           md="6"
//           className="d-flex align-items-center justify-content-center bg-light"
//         >
//           <Card className="p-4 w-75">
//             <CardBody>
//             <Logo text="Welcome Back" />
              
//               {error && <Alert color="danger">{error}</Alert>}

//               <Form onSubmit={handleLogin}>
//                 <FormGroup>
//                   <Label for="id">Username</Label>
//                   <Input
//                     id="id"
//                     name="userid"
//                     type="id"
//                     placeholder="Enter your username"
//                     autoComplete="UserId"
//                     value={userId}
//                     onChange={(e) => setUserId(e.target.value)}
//                     required
//                   />
//                 </FormGroup>
//                 <FormGroup>
//                   <Label for="password">Password</Label>
//                   <Input
//                     id="password"
//                     name="password"
//                     type="password"
//                     placeholder="Enter your password"
//                     autoComplete="current-password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </FormGroup>
//                 <Button color="primary" block className="mt-4" type="submit">
//                   Login
//                 </Button>
//               </Form>
//             </CardBody>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default LoginPage;


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
import { useState } from "react";
import loginImage from "/public/images/background/feature2.png";
import { useRouter } from "next/navigation";
import Logo from "@/app/(auth)/login/shared/logo/logo";
import { motion } from "framer-motion"; // ✅ Import motion

const LoginPage = ({ onLoginSuccess }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if (userId === "user" && password === "a") {
      sessionStorage.setItem("loggedIn", "true");
      if (onLoginSuccess) onLoginSuccess();
      router.push("/dashboard");
    } else {
      setError("Invalid credentials");
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
          {/* Motion wrapper for animation */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-75"
          >
            <Card className="p-4 shadow-lg rounded">
              <CardBody>
                <Logo text="Welcome Back" />
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
    </Container>
  );
};

export default LoginPage;
