import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../auth/firebase";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";
import backgroundImage from "../assets/bg.jpg";

const Home = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#444",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="d-flex flex-column justify-content-center align-items-center col-md-8 offset-md-2 text-center text-light flex-grow-1">
        <div className="mt-4">
          <h1 className="display-1 fw-bolder">
            Welcome to the World Explorer!
          </h1>
        </div>
        <div className="d-flex flex-sm-row justify-content-center gap-2 gap-sm-5">
          {!user && (
            <>
              <div className="mb-2">
                <p>Login to start your adventure!</p>
                <LinkContainer to="/login">
                  <Button variant="primary" hidden={loading}>
                    Login <i className="bi bi-box-arrow-in-right"></i>
                  </Button>
                </LinkContainer>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="text-center text-light mb-3">
        Photo by{" "}
        <a
          href="https://unsplash.com/@samferrara?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
          className="text-light"
        >
          Samuel Ferrara
        </a>{" "}
        on{" "}
        <a
          href="https://unsplash.com/photos/trees-reflecting-on-body-of-water-iecJiKe_RNg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
          className="text-light"
        >
          Unsplash
        </a>
      </div>
    </div>
  );
};

export default Home;
