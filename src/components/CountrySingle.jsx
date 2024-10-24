import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card, Carousel } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

const CountrySingle = (props) => {
  const location = useLocation();
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [isWeatherLoading, setIsWeatherLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [news, setNews] = useState([]);
  const [isNewsLoading, setIsNewsLoading] = useState(true);
  const navigate = useNavigate();

  const country = props.country || location.state.country;
  const countriesList = useSelector((state) => state.countries.countries);

  // Fetch news data
  useEffect(() => {
    axios
      .get(
        `https://newsapi.org/v2/everything?q=${country.name.common}&apiKey=${
          import.meta.env.VITE_NEWS_API_KEY
        }`
      )
      .then((response) => {
        setNews(response.data.articles);
        setIsNewsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [country.name.common]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${
            country.capital
          }&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
        );
        setWeather(weatherResponse.data);

        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${
            country.capital
          }&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
        );

        // Get the forecast for the next three days (8 timestamps per day)
        const nextThreeDays = forecastResponse.data.list.filter(
          (item, index) => index % 8 === 0
        );
        setForecast(nextThreeDays);
        setIsWeatherLoading(false);
      } catch (error) {
        console.log(error);
        setIsWeatherLoading(false);
      }
    };

    const fetchImages = async () => {
      try {
        const imagesResponse = await axios.get(
          `https://api.unsplash.com/search/photos?query=${
            country.name.common
          }&client_id=${import.meta.env.VITE_UNSPLASH_API_KEY}&per_page=4`
        );
        setImages(imagesResponse.data.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWeatherData();
    fetchImages();
  }, [country.capital, country.name.common]);

  // Handle the loading case first
  if (isWeatherLoading) {
    return <div>Loading weather...</div>;
  }

  return (
    <>
      <Container fluid className="p-3">
        {/* Back Button */}
        <Button variant="light" onClick={() => navigate("/countries")}>
          ← Back
        </Button>
      </Container>
      <Container>
        <Row>
          {/* Country images carousel */}
          <Carousel className="mb-4" variant="light">
            {images.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={image.urls.regular}
                  alt={image.alt_description || `${country.name.common} image`}
                  style={{ maxHeight: "500px", objectFit: "cover" }}
                />
                <Carousel.Caption>
                  <p>
                    Photo by {image.user.first_name} {image.user.last_name} on{" "}
                    <a href={`${image.urls.regular}`}>Unsplash</a>
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Row>
        {/* Main Country Info Card */}
        <Row>
          <Col md={8}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Row>
                  <Col md={6} className="text-center">
                    <img
                      src={country.flags.svg}
                      alt={`${country.name.common} flag`}
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        borderRadius: "5px",
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <h1 className="mb-4">{country.name.common}</h1>
                    <p>
                      <strong>Official name:</strong> {country.name.official}
                    </p>
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
                      <strong>Continent:</strong> {country.continents}
                    </p>
                    <p>
                      <strong>Capital:</strong> {country.capital}
                    </p>
                    <p>
                      <strong>Border Countries:</strong>{" "}
                      {country.borders && country.borders.length > 0
                        ? country.borders.map((borderCountryCode) => {
                            const borderCountry = countriesList.find(
                              (c) => c.cca3 === borderCountryCode
                            );

                            if (borderCountry) {
                              return (
                                <LinkContainer
                                  key={borderCountry.cca3}
                                  to={`/countries/${borderCountry.name.common}`}
                                  state={{ country: borderCountry }}
                                >
                                  <Button
                                    variant="light"
                                    size="sm"
                                    className="me-2 mb-2"
                                  >
                                    {borderCountry.name.common}
                                  </Button>
                                </LinkContainer>
                              );
                            }
                            return null;
                          })
                        : "None"}
                    </p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          {/* Weather Sidebar */}
          <Col md={4}>
            <Card className="mb-1 shadow-sm">
              <Card.Header>
                Weather in <strong>{country.capital}</strong> today
              </Card.Header>
              <Card.Body>
                <div className="d-flex align-items-center">
                  <img
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt={weather.weather[0].description}
                    style={{ width: "100px", height: "100px" }}
                  />
                  <div className="ms-3">
                    <h5>{parseInt(weather.main.temp)} °C</h5>
                    <p>{weather.weather[0].description}</p>
                  </div>
                </div>
                <hr />
                <h6>Next 3 Days Forecast:</h6>
                {forecast.slice(1, 4).map((day, index) => (
                  <div key={index} className="d-flex align-items-center mb-3">
                    <img
                      src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                      alt={day.weather[0].description}
                      style={{ width: "50px", height: "50px" }}
                    />
                    <div className="ms-3">
                      <p className="mb-0">
                        <strong>
                          {new Date(day.dt_txt).toLocaleDateString("en-FI", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                          })}
                        </strong>
                      </p>
                      <p className="mb-0">
                        {parseInt(day.main.temp)} °C,{" "}
                        {day.weather[0].description}
                      </p>
                    </div>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* News Section */}
        <Row className="mt-5">
          <Col>
            <h2 className="mb-4">
              Latest headlines from {country.name.common}
            </h2>
            <Row>
              {news.length > 0 ? (
                news.slice(0, 5).map((article, index) => (
                  <Col md={6} lg={4} key={index} className="mb-4">
                    <Card className="h-100">
                      {article.urlToImage && (
                        <Card.Img
                          variant="top"
                          src={article.urlToImage}
                          alt={article.title}
                        />
                      )}
                      <Card.Body>
                        <Card.Title>{article.title}</Card.Title>
                        <Card.Text>
                          {article.description
                            ? article.description.slice(0, 100) + "..."
                            : "No description available."}
                        </Card.Text>
                        <Button
                          variant="primary"
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Read Full Article
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <p>No news articles available.</p>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CountrySingle;
