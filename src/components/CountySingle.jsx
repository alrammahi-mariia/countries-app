import { useNavigate, useParams, useLocation } from "react-router-dom";

const CountrySingle = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  //   console.log("params", params);
  //   console.log("location", location);
  //   console.log("navigate", navigate);

  return <div>Single Country</div>;
};

export default CountrySingle;
