import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../services/countriesServices";
import {
  clearFavourites,
  getFavouritesFromSource,
} from "../store/favouritesSlice";
import CountryCard from "./CountryCard";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

// Favourites to be written
const Favourites = () => {
  const dispatch = useDispatch();
  let countriesList = useSelector((state) => state.countries.countries);
  const [search, setSearch] = useState("");
  const countriesLoading = useSelector((state) => state.countries.isLoading);
  const favouritesList = useSelector((state) => state.favourites.favourites);
  const favouritesLoading = useSelector((state) => state.favourites.isLoading);

  console.log("favouritesList: ", favouritesList);
  console.log("countriesList inside favourites: ", countriesList);

  if (Array.isArray(favouritesList) && favouritesList.length > 0) {
    countriesList = countriesList.filter((country) =>
      favouritesList.includes(country.name.common)
    );
  } else {
    countriesList = [];
  }

  useEffect(() => {
    dispatch(initializeCountries());
    dispatch(getFavouritesFromSource());
  }, [dispatch]);

  if (countriesLoading || favouritesLoading) {
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

  return (
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
                className="me-2"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
          </Form>
          <Button onClick={() => dispatch(clearFavourites(favouritesList))}>
            Clear Favourites
          </Button>
        </Col>
      </Row>
      <Row xs={2} md={3} lg={4} className="g-3">
        {countriesList
          .filter((country) => {
            return country.name.official
              .toLowerCase()
              .includes(search.toLowerCase());
          })
          .map((country) => (
            <Col
              sm={6}
              md={4}
              lg={3}
              className="mt-5 d-flex justify-content-center"
              key={country.cca3}
            >
              <CountryCard country={country} />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Favourites;
