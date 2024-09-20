import { initializeAnalytics } from "firebase/analytics";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../services/countriesServices";
import { getFavouriteFromSource } from "../store/favouritesSlice";

const Favourites = () => {
  const dispatch = useDispatch();
  let countriesList = useSelector((state) => state.countries.countries);
  const [search, setSearch] = useState("");
  const favouritesList = useSelector((state) => state.favourites.favourites);
  const favouritesLoading = useSelector((state) => state.favourites.isLoading);
  const countriesLoading = useSelector((state) => state.countries.isLoading);

  if (favouritesList !== null) {
    countriesList = countriesList.filter((country) =>
      favouritesList.includes(country.name.common)
    );
  } else {
    countriesList = [];
  }

  useEffect(() => {
    dispatch(initializeCountries());
    dispatch(getFavouriteFromSource());
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
        <Col>
          <Form>
            <Form.Control
              style={{ width: "18rem" }}
              type="search"
              className="me-2"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
        </Col>
      </Row>
      <Row xs={2} md={3} lg={3} className="g-3">
        <Button onClick={() => dispatch(clearFavourites())}>
          Clear Favourites
        </Button>
      </Row>
      <Row xs={2} md={3} lg={3} className="g-3">
        {countriesList
          .filter((country) => {
            return (
              country,
              name.official.toLowerCase().includes(search.toLowerCase())
            );
          })
          .map((country) => (
            <CountrySingle key={country.name.common} country={country} />
          ))}
      </Row>
    </Container>
  );
};

export default Favourites;