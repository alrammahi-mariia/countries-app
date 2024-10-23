// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Container, Row, Col, Button } from "react-bootstrap";
// import { useSelector } from "react-redux";
// import { LinkContainer } from "react-router-bootstrap";
// import { useNavigate, useLocation } from "react-router-dom";

// const CountrySingle = (props) => {
//   const location = useLocation();
//   const [weather, setWeather] = useState("");
//   const [isWeatherLoading, setIsWeatherLoading] = useState(true);
//   const navigate = useNavigate();

//   const country = props.country || location.state.country;
//   const countriesList = useSelector((state) => state.countries.countries);

//   useEffect(() => {
//     axios
//       .get(
//         `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=b1570e90dcd057b83eeac9421f912bad`
//       )
//       .catch((error) => {
//         console.log(error);
//       })
//       .then((response) => {
//         setWeather(response.data);
//         setIsWeatherLoading(false);
//       });
//   }, [country.capital]);

//   // Handle the loading case first
//   if (isWeatherLoading) {
//     return <div>Loading weather...</div>;
//   }

//   return (
//     <>
//       <Container fluid className="p-5">
//         {/* Back Button */}
//         <Button
//           variant="light"
//           onClick={() => navigate("/countries")}
//           className="mb-4"
//         >
//           ← Back
//         </Button>
//       </Container>
//       <Container className="shadow-sm p-5 bg-light rounded">
//         <Row>
//           {/* Country Flag */}
//           <Col
//             md={6}
//             className="d-flex justify-content-center align-items-center"
//           >
//             <img
//               src={country.flags.svg}
//               alt={`${country.name.common} flag`}
//               style={{ maxWidth: "100%", height: "auto", borderRadius: "5px" }}
//             />
//           </Col>

//           {/* Country Details */}
//           <Col md={6}>
//             <h1 className="mb-4">{country.name.common}</h1>
//             <Row className="mb-3">
//               <Col>
//                 <p>
//                   <strong>Population:</strong>{" "}
//                   {country.population.toLocaleString()}
//                 </p>
//                 <p>
//                   <strong>Region:</strong> {country.region}
//                 </p>
//                 <p>
//                   <strong>Sub Region:</strong> {country.subregion}
//                 </p>
//                 <p>
//                   <strong>Capital:</strong> {country.capital}
//                 </p>
//               </Col>
//               <Col>
//                 <Row>
//                   <p>
//                     <strong>Weather in {country.capital} today:</strong>
//                   </p>
//                 </Row>
//                 <div className="d-flex align-items-center mt-4">
//                   <img
//                     src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
//                     alt={weather.weather[0].description}
//                     style={{ width: "100px", height: "100px" }}
//                   />
//                   <div className="ms-3">
//                     <h5>{parseInt(weather.main.temp)} °C</h5>
//                     <p className="m-0">{weather.weather[0].description}</p>
//                   </div>
//                 </div>
//               </Col>
//             </Row>
//             <p>
//               <strong>Border Countries:</strong>{" "}
//               {country.borders && country.borders.length > 0
//                 ? country.borders.map((borderCountryCode) => {
//                     const borderCountry = countriesList.find(
//                       (country) => country.cca3 === borderCountryCode
//                     );

//                     if (borderCountry) {
//                       return (
//                         <LinkContainer
//                           key={borderCountry.cca3}
//                           to={`/countries/${borderCountry.name.common}`}
//                           state={{ country: borderCountry }}
//                         >
//                           <Button
//                             variant="light"
//                             size="sm"
//                             className="me-2 mb-2"
//                           >
//                             {borderCountry.name.common}
//                           </Button>
//                         </LinkContainer>
//                       );
//                     }

//                     return null; // Return null if the border country is not found
//                   })
//                 : "None"}
//             </p>
//           </Col>
//           {/* <Col>
//           <iframe
//           title="Google Maps Embed"
//           src={`https://www.google.com/maps/embed/v1/place?key=${
//             process.env.REACT_APP_GOOGLE_MAPS_EMBED_API_KEY
//             }&q=${encodeURIComponent(
//               country.capital
//               ? country.capital + " " + country.name.common
//               : country.name.common
//               )}`}
//               width="100%"
//               height="100%"
//               allowFullScreen
//               ></iframe>
//               </Col> */}
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default CountrySingle;

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
  const navigate = useNavigate();

  const country = props.country || location.state.country;
  const countriesList = useSelector((state) => state.countries.countries);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=b1570e90dcd057b83eeac9421f912bad`
        );
        setWeather(weatherResponse.data);

        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${country.capital}&units=metric&appid=b1570e90dcd057b83eeac9421f912bad`
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
          `https://api.unsplash.com/search/photos?query=${country.name.common}&client_id=2lXBk9ePji-M9C13-80CJdgssbY2HnK1Qho4DNgh23I&per_page=4`
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
      <Container fluid className="p-5">
        {/* Back Button */}
        <Button
          variant="light"
          onClick={() => navigate("/countries")}
          className="mb-4"
        >
          ← Back
        </Button>
      </Container>
      <Container>
        <Row>
          {/* Main Country Info Card */}
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

            {/* Unsplash Images Carousel */}
            <Carousel className="mb-4">
              {images.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={image.urls.regular}
                    alt={
                      image.alt_description || `${country.name.common} image`
                    }
                    style={{ maxHeight: "500px", objectFit: "cover" }}
                  />
                  <Carousel.Caption>
                    <p>{image.description || image.alt_description}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>

          {/* Weather Sidebar */}
          <Col md={4}>
            <Card className="mb-4 shadow-sm">
              <Card.Header>Weather in {country.capital}</Card.Header>
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
                <h6>Next 5 Days Forecast:</h6>
                {forecast.map((day, index) => (
                  <div key={index} className="d-flex align-items-center mb-3">
                    <img
                      src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                      alt={day.weather[0].description}
                      style={{ width: "50px", height: "50px" }}
                    />
                    <div className="ms-3">
                      <p className="mb-0">
                        <strong>
                          {new Date(day.dt_txt).toLocaleDateString()}
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
      </Container>
    </>
  );
};

export default CountrySingle;
