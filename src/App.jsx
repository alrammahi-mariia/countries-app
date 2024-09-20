import { BrowserRouter, Route, Routes } from "react-router-dom";
import Countries from "./components/Countries";
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home";
import Layout from "./pages/Layout";
import CountrySingle from "./components/CountySingle";
import Register from "./components/Register";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route>
            {/* This is where other routes will go to allow Layout to be visible everywhere */}
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/countries/:single" element={<CountrySingle />} />
            <Route path="/countries" element={<Countries />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
