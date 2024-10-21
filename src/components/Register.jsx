import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, registerWithEmailAndPassword } from "../auth/firebase";
import { Button, Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/countries");
  }, [user, loading, navigate]);

  const handleRegister = () => {
    if (!name) {
      alert("Name is required");
    }
    registerWithEmailAndPassword(name, email, password);
  };

  return (
    <div>
      <Container className="mt-5 w-25">
        <Row className="justify-content-center">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </Form.Group>
            <Button onClick={handleRegister}>Register</Button>
            <FormGroup className="mt-4">
              <Form.Text muted className="mt-3">
                Already have an account?
                <Button
                  variant="light"
                  size="sm"
                  onClick={() => navigate("/login")}
                  className="mx-2"
                >
                  Login
                </Button>
              </Form.Text>
            </FormGroup>
          </Form>
        </Row>
      </Container>
    </div>
  );
}
