import { useEffect } from "react";
import {
  Col,
  Spinner,
  Row,
  Card,
  Form,
  ListGroup,
  InputGroup,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../services/countriesServices";
import { search } from "../store/countriesSlice";
import { LinkContainer } from "react-router-bootstrap";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import { addFavourite } from "../store/favouritesSlice";

const Countries = () => {
  const dispatch = useDispatch(); // Get the dispatch function from Redux

  // Extract the countries, isLoading and search state from the Redux store with useSelector function
  const countries = useSelector((state) => state.countries.countries);
  const isLoading = useSelector((state) => state.countries.isLoading);
  const searchInput = useSelector((state) => state.countries.search);

  // console.log("Countries: ", countries);
  // console.log("isLoading: ", isLoading);

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
            <InputGroup style={{ width: "18rem" }}>
              <InputGroup.Text>
                <SearchOutlinedIcon color="action" />
              </InputGroup.Text>
              <Form.Control
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => dispatch(search(e.target.value))}
              />
            </InputGroup>
          </Form>
        </Col>
      </Row>
      <Row className="m-4">
        {countries
          .filter((country) => {
            return country.name.common
              .toLowerCase()
              .includes(searchInput.toLowerCase());
          })
          .map((country) => (
            <Col
              key={country.cca3}
              sm={6}
              md={4}
              lg={3}
              className="mt-5 d-flex justify-content-center"
            >
              <Card
                style={{
                  minWidth: "300px",
                  minHeight: "400px",
                }}
              >
                <LinkContainer
                  // Navigate to the CountrySingle component and pass country data as state
                  to={`/countries/${country.name.common}`}
                  state={{ country: country }}
                >
                  <Card.Img
                    variant="top"
                    src={country.flags.svg}
                    alt={`${country.name.common} flag`}
                    style={{
                      objectFit: "cover",
                      width: "100px",
                      height: "100px",
                      borderRadius: "50 50 0 0",
                    }}
                  />
                </LinkContainer>
                <Card.Body className="d-flex flex-column">
                  <Card.Title style={{ fontSize: "16px" }}>
                    {country.name.common}
                  </Card.Title>
                  <Card.Subtitle
                    style={{ fontSize: "12px" }}
                    className="mb-5 text-muted"
                  >
                    {country.name.official}
                  </Card.Subtitle>
                  <ListGroup
                    variant="flush"
                    className="flex-grow-1 justify-content-center"
                  >
                    <ListGroup.Item style={{ fontSize: "12px" }}>
                      <PersonOutlineOutlinedIcon
                        style={{ marginRight: "5px" }}
                      />
                      {country.population.toLocaleString()}
                    </ListGroup.Item>
                    <ListGroup.Item style={{ fontSize: "12px" }}>
                      <PaidOutlinedIcon style={{ marginRight: "5px" }} />
                      {Object.values(country.currencies || {})
                        .map((currency) => currency.name)
                        .join(", ") || "No currency"}
                    </ListGroup.Item>
                    <ListGroup.Item style={{ fontSize: "12px" }}>
                      <LanguageOutlinedIcon style={{ marginRight: "5px" }} />
                      {Object.values(country.languages || {})
                        .map((language) => language)
                        .join(", ") || "No official language"}
                    </ListGroup.Item>
                  </ListGroup>
                  <Button
                    onClick={() => dispatch(addFavourite())}
                    variant="light"
                    className="me-2 mb-2"
                  >
                    Save
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </>
  );
};

export default Countries;
