import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import { addFavourite, removeFavourite } from "../store/favouritesSlice";
import { useDispatch, useSelector } from "react-redux";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

const CountryCard = ({ country }) => {
  const dispatch = useDispatch(); // Get the dispatch function from Redux
  const favouritesList = useSelector((state) => state.favourites.favourites);

  return (
    <div>
      <Col className="mt-5" key={country.name.official}>
        <Card className="h-100">
          <LinkContainer
            // Navigate to the CountrySingle component and pass country data as state
            to={`/countries/${country.name.common}`}
            state={{ country: country }}
            style={{ cursor: "pointer" }}
          >
            <div>
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
            </div>
          </LinkContainer>
          <Card.Body className="d-flex flex-column">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <Card.Title style={{ fontSize: "16px" }}>
                  {country.name.common}
                </Card.Title>
                <Card.Subtitle
                  style={{ fontSize: "14px" }}
                  className="my-1 text-muted"
                >
                  {country.capital}
                </Card.Subtitle>
              </div>
              <div>
                {favouritesList.includes(country.name.common) ? (
                  <FavoriteOutlinedIcon
                    style={{
                      color: "red",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      dispatch(removeFavourite(country.name.common))
                    }
                    fontSize="large"
                  />
                ) : (
                  <FavoriteBorderOutlinedIcon
                    onClick={() => dispatch(addFavourite(country.name.common))}
                    style={{ cursor: "pointer" }}
                    fontSize="large"
                  />
                )}
              </div>
            </div>
            <ListGroup
              variant="flush"
              className="flex-grow-1 justify-content-center"
            >
              <ListGroup.Item style={{ fontSize: "12px" }}>
                <PersonOutlineOutlinedIcon style={{ marginRight: "5px" }} />
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
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
};

export default CountryCard;
