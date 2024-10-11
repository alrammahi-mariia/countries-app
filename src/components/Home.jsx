import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../auth/firebase";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";

const Home = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <div className="d-flex min-vh-100">
      <div className="align-self-center text-center text-dark col-md-8 offset-md-2">
        <div className="mb-4">
          <h1 className="display-1 fw-bolder">Welcome to Countries App!</h1>
        </div>
        <div className="my-4">
          <p className="lead">
            A React application made in Business College Helsinki lessons.
          </p>
        </div>
        <div className="d-flex flex-column flex-sm-row justify-content-center gap-2 gap-sm-5">
          {!user && (
            <>
              <div className="mb-2">
                <p>Login to explore the countries</p>
                <LinkContainer to="/login">
                  <Button variant="primary" hidden={loading}>
                    Login <i className="bi bi-arrow-right-short"></i>
                  </Button>
                </LinkContainer>
              </div>
            </>
          )}
          <div>
            <p>Check out the source code:</p>
            <Button
              variant="outline-dark"
              href=""
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-github"></i> GitHub
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
