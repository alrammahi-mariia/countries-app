import { useEffect, useState } from "react";
import {
  Col,
  Spinner,
  Row,
  Form,
  InputGroup,
  Container,
  Dropdown,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../services/countriesServices";
import { search } from "../store/countriesSlice";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CountryCard from "./CountryCard";

const Countries = () => {
  // State to manage the selected region
  const [selectedRegion, setSelectedRegion] = useState("All");

  // Extract the countries, isLoading, and search state from the Redux store with useSelector function
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

  // Filter the countries based on the search input and selected region
  const filteredCountries = countries.filter((country) => {
    const matchesRegion =
      selectedRegion === "All" || country.region === selectedRegion;
    return matchesRegion;
  });

  // Handle region selection from the dropdown
  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
  };

  return (
    <>
      <Container fluid>
        <Row>
          <div className="d-flex justify-content-xl-between">
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
              <Dropdown className="mx-2" onSelect={handleRegionSelect}>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  {selectedRegion === "All"
                    ? "Filter by Region"
                    : selectedRegion}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleRegionSelect("All")}>
                    All
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleRegionSelect("Africa")}>
                    Africa
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleRegionSelect("Americas")}>
                    Americas
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleRegionSelect("Asia")}>
                    Asia
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleRegionSelect("Europe")}>
                    Europe
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleRegionSelect("Oceania")}>
                    Oceania
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </div>
        </Row>
        <Row xs={2} md={3} lg={4} className="g-3">
          {filteredCountries.map((country) => (
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
