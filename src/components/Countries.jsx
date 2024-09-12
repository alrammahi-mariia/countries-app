import { useEffect } from "react";
import { Col, Spinner, Row, Card, CardText } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../services/countriesServices";

const Countries = () => {
  const dispatch = useDispatch(); // Get the dispatch function from Redux

  // Extract the countries and isLoading state from the Redux store
  const countries = useSelector((state) => state.countries.countries);
  const isLoading = useSelector((state) => state.countries.isLoading);
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
    <Row className="m-4">
      {countries.map((country) => (
        <Col key={country.cca3} sm={6} md={4} lg={3} className="mb-4">
          <Card>
            <Card.Img
              variant="top"
              src={country.flags.svg}
              alt={`${country.name.common} flag`}
            />
            <Card.Body>
              <Card.Title>{country.name.common}</Card.Title>
              <Card.Text>
                <strong>Capital:</strong>{" "}
                {country.capital ? country.capital[0] : "N/A"}
                <br />
                <strong>Population:</strong>{" "}
                {country.population.toLocaleString()}
                <br />
                <strong>Region:</strong> {country.region}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Countries;
