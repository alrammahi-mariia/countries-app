import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../auth/firebase";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";
import backgroundImage from "../assets/bg.jpg";

const Home = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <div
      className="d-flex min-vh-100"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#444",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="align-self-center text-center text-light col-md-8 offset-md-2">
        <div className="mb-4">
          <h1 className="display-1 fw-bolder">Welcome to Explore!</h1>
        </div>
        <div className="my-4">
          <p className="lead">
            A React-Redux application made in Business College Helsinki lessons.
          </p>
        </div>
        <div className="d-flex flex-column flex-sm-row justify-content-center gap-2 gap-sm-5">
          {!user && (
            <>
              <div className="mb-2">
                <p>Login to explore the countries:</p>
                <LinkContainer to="/login">
                  <Button variant="primary" hidden={loading}>
                    Login <i className="bi bi-box-arrow-in-right"></i>
                  </Button>
                </LinkContainer>
              </div>
            </>
          )}
          <div>
            <p>Have a look at the source code:</p>
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
        <div>
          Photo by{" "}
          <a href="https://unsplash.com/@samferrara?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            Samuel Ferrara
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/photos/trees-reflecting-on-body-of-water-iecJiKe_RNg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            Unsplash
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
