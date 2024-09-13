import { useEffect } from "react";
import { Col, Spinner, Row, Card, Form, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../services/countriesServices";
import { search } from "../store/countriesSlice";
import { LinkContainer } from "react-router-bootstrap";

const Countries = () => {
  const dispatch = useDispatch(); // Get the dispatch function from Redux

  // Extract the countries and isLoading state from the Redux store
  const countries = useSelector((state) => state.countries.countries);
  const isLoading = useSelector((state) => state.countries.isLoading);
  const searchInput = useSelector((state) => state.countries.search);

  console.log("Countries: ", countries);
  console.log("isLoading: ", isLoading);

  // This hook runs a side effect when the component mounts. In this case, it dispatches the initializeCountries function to start fetching the country data.
  useEffect(() => {
    dispatch(initializeCountries());
  }, [dispatch]);

  // Handle the loading case here first (use Col, and Spinner)
  if (isLoading) {
    return (
      <Col className="text-center m-5">
        <Spinner
          animation="border"
          role="status"
          className="center"
          variant="info"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Col>
    );
  }

  // Handle the received data case here.

  return (
    <>
      <Row className="m-4">
        <Col className="mt-5 d-flex justify-content-center">
          <Form>
            <Form.Control
              style={{ width: "18rem" }}
              type="search"
              className="me-2"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => dispatch(search(e.target.value))}
            />
          </Form>
        </Col>
      </Row>
      <Row className="m-4">
        {countries.map((country) => (
          <Col
            key={country.cca3}
            sm={6}
            md={4}
            lg={3}
            className="mt-5 d-flex justify-content-center"
          >
            <Card>
              <LinkContainer
                to={`/countries/${country.name.common}`}
                state={{ country: country }}
              >
                <Card.Img
                  variant="top"
                  src={country.flags.svg}
                  alt={`${country.name.common} flag`}
                  className="rounded h-50"
                  style={{
                    objectFit: "cover",
                    minHeight: "200px",
                    maxHeight: "200px",
                  }}
                />
              </LinkContainer>
              <Card.Body className="d-flex flex-column">
                <Card.Title>{country.name.common}</Card.Title>
                <Card.Subtitle className="mb-5 text-muted">
                  {country.name.official}
                </Card.Subtitle>
                <ListGroup
                  variant="flush"
                  className="flex-grow-1 justify-content-center"
                >
                  <ListGroup.Item>
                    <i className="bi bi-people me-2">
                      {country.population.toLocaleString()}
                    </i>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <i className="me-2">
                      {Object.values(country.currencies || {})
                        .map((currency) => currency.name)
                        .join(" ,") || "No currency"}
                    </i>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <i className="me-2">
                      {Object.values(country.languages || {})
                        .map((language) => language)
                        .join(", ") || "No official language"}
                    </i>
                  </ListGroup.Item>
                </ListGroup>
                {/* <Card.Text>
                  <strong>Capital:</strong>{" "}
                  {country.capital ? country.capital[0] : "N/A"}
                  <br />
                  <strong>Region:</strong> {country.region}
                </Card.Text> */}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Countries;
