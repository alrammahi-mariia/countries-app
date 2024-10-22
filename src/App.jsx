import { BrowserRouter, Route, Routes } from "react-router-dom";
import Countries from "./components/Countries";
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home";
import Layout from "./pages/Layout";
import Favourites from "./components/Favourites";
import CountrySingle from "./components/CountrySingle";
import Register from "./components/Register";
import Login from "./components/Login";
import ProtectedRoute from "./auth/ProtectedRoute";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./auth/firebase";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "react-scroll-to-top";

const App = () => {
  const [user] = useAuthState(auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route>
            {/* This is where other routes will go to allow Layout to be visible everywhere */}
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoute user={user} />}>
              <Route path="/countries/:single" element={<CountrySingle />} />
              <Route path="/countries" element={<Countries />} />
              <Route path="/favourites" element={<Favourites />} />
            </Route>

            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Route>
      </Routes>
      <Toaster position="top-center" />
      <ScrollToTop smooth />
    </BrowserRouter>
  );
};

export default App;
