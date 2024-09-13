import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const CountrySingle = () => {
  const params = useParams();
  const location = useLocation();
  const [weather, setWeather] = useState("");
  const [isWeatherLoading, setIsWeatherLoading] = useState(true);
  const navigate = useNavigate();

  const country = location.state.country;

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

  console.log("Weather: ", weather);

  // Handle the loading case first
  if (isWeatherLoading) {
    //Create a spinner

    return <div>Loading weather...</div>;
  }

  //Show weather data: temperature, weather description, icon
  return (
    <Container fluid>
      <Row>
        <Col>{/* <Image src={``} /> */}</Col>
        <Col></Col>
        <Col>
          <h2>{weather.name}</h2>
        </Col>
        <Col>{parseInt(weather.main.temp)} °C</Col>
        <Col>{weather.weather[0].description}</Col>
        <Col>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <Button variant="light" onClick={() => navigate("/countries")}>
            Back to countries
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CountrySingle;
