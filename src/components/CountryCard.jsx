import { Button, Card, ListGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import { addFavourite, removeFavourite } from "../store/favouritesSlice";
import { useDispatch } from "react-redux";

const CountryCard = ({ flags, name, population, currencies, languages }) => {
  const dispatch = useDispatch(); // Get the dispatch function from Redux

  return (
    <div>
      <Card
        style={{
          minWidth: "300px",
          minHeight: "400px",
        }}
      >
        <LinkContainer
          // Navigate to the CountrySingle component and pass country data as state
          to={`/countries/${name.common}`}
          state={{ name }}
        >
          <Card.Img
            variant="top"
            src={flags.svg}
            alt={`${name.common} flag`}
            style={{
              objectFit: "cover",
              width: "100px",
              height: "100px",
              borderRadius: "50 50 0 0",
            }}
          />
        </LinkContainer>
        <Card.Body className="d-flex flex-column">
          <Card.Title style={{ fontSize: "16px" }}>{name.common}</Card.Title>
          <Card.Subtitle
            style={{ fontSize: "12px" }}
            className="mb-5 text-muted"
          >
            {name.official}
          </Card.Subtitle>
          <ListGroup
            variant="flush"
            className="flex-grow-1 justify-content-center"
          >
            <ListGroup.Item style={{ fontSize: "12px" }}>
              <PersonOutlineOutlinedIcon style={{ marginRight: "5px" }} />
              {population.toLocaleString()}
            </ListGroup.Item>
            <ListGroup.Item style={{ fontSize: "12px" }}>
              <PaidOutlinedIcon style={{ marginRight: "5px" }} />
              {Object.values(currencies || {})
                .map((currency) => currency.name)
                .join(", ") || "No currency"}
            </ListGroup.Item>
            <ListGroup.Item style={{ fontSize: "12px" }}>
              <LanguageOutlinedIcon style={{ marginRight: "5px" }} />
              {Object.values(languages || {})
                .map((language) => language)
                .join(", ") || "No official language"}
            </ListGroup.Item>
          </ListGroup>
          <Button
            variant="primary"
            onClick={() => dispatch(addFavourite(name.common))}
          >
            Add Favourite
          </Button>
          <Button
            variant="warning"
            onClick={() => dispatch(removeFavourite(name.common))}
          >
            Remove Favourite
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CountryCard;
