import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import Signin from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";
import Profile from "./pages/Profile.jsx";
import Header from "./components/Header.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Scraper from "./pages/Scraper.jsx";
import Summarizer from "./pages/Summarizer.jsx";
import Opportunities from "./pages/Opportunities.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/opportunities" element={<Opportunities />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/summarizer" element={<Summarizer />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/scraper" element={<Scraper />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
