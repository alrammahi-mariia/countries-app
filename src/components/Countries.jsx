import { useEffect } from "react";
import {
  Col,
  Spinner,
  Row,
  Form,
  InputGroup,
  Container,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../services/countriesServices";
import { search } from "../store/countriesSlice";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CountryCard from "./CountryCard";

const Countries = () => {
  // Extract the countries, isLoading and search state from the Redux store with useSelector function
  const countries = useSelector((state) => state.countries.countries);
  const isLoading = useSelector((state) => state.countries.isLoading);
  const searchInput = useSelector((state) => state.countries.search);
  const dispatch = useDispatch();

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
      <Container fluid>
        <Row>
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
        <Row xs={2} md={3} lg={4} className="g-3">
          {countries
            .filter((country) => {
              return country.name.common
                .toLowerCase()
                .includes(searchInput.toLowerCase());
            })
            .map((country) => (
              <Col className="mt-5" key={country.cca3}>
                <CountryCard country={country} />
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
};

export default Countries;
