import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useParams, useLocation } from "react-router-dom";

// change to separate country card
const CountrySingle = (props) => {
  const location = useLocation();
  const [weather, setWeather] = useState("");
  const [isWeatherLoading, setIsWeatherLoading] = useState(true);
  const navigate = useNavigate();

  const country = props.country || location.state.country;

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=b1570e90dcd057b83eeac9421f912bad`
      )
      .catch((error) => {
        console.log(error);
      })
      .then((response) => {
        setWeather(response.data);
        setIsWeatherLoading(false);
      });
  }, [country.capital]);

  // Handle the loading case first
  if (isWeatherLoading) {
    return <div>Loading weather...</div>;
  }

  return (
    <Container fluid className="p-5">
      {/* Back Button */}
      <Button
        variant="light"
        onClick={() => navigate("/countries")}
        className="mb-4"
      >
        ← Back
      </Button>

      <Row>
        {/* Country Flag */}
        <Col
          md={6}
          className="d-flex justify-content-center align-items-center"
        >
          <img
            src={country.flags.svg}
            alt={`${country.name.common} flag`}
            style={{ maxWidth: "100%", height: "auto", borderRadius: "5px" }}
          />
        </Col>

        {/* Country Details */}
        <Col md={6}>
          <h1 className="mb-4">{country.name.common}</h1>
          <Row className="mb-3">
            <Col>
              <p>
                <strong>Population:</strong>{" "}
                {country.population.toLocaleString()}
              </p>
              <p>
                <strong>Region:</strong> {country.region}
              </p>
              <p>
                <strong>Sub Region:</strong> {country.subregion}
              </p>
              <p>
                <strong>Capital:</strong> {country.capital}
              </p>
            </Col>
            <Col>
              <Row>
                <p>
                  <strong>Weather Today:</strong>
                </p>
              </Row>
              <div className="d-flex align-items-center mt-4">
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                  style={{ width: "50px", height: "50px" }}
                />
                <div className="ms-3">
                  <h5>{parseInt(weather.main.temp)} °C</h5>
                  <p className="m-0">{weather.weather[0].description}</p>
                </div>
              </div>
            </Col>
          </Row>
          <p>
            <strong>Border Countries:</strong>{" "}
            {country.borders
              ? country.borders.map((border) => (
                  <Button key={border} variant="light" className="me-2 mb-2">
                    {border}
                  </Button>
                ))
              : "None"}
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default CountrySingle;
