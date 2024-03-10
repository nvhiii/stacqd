import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import Signin from "./pages/Signin.tsx";
import Signup from "./pages/Signup.tsx";
import Profile from "./pages/Profile.tsx";
import BrowseOpportunities from "./pages/BrowseOpportunities.tsx";
import ViewOpportunity from "./pages/ViewOpportunity.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/browse-opportunities" element={<BrowseOpportunities />} />
        <Route path="/view-opportunity" element={<ViewOpportunity />} />
      </Routes>
    </BrowserRouter>
  );
}
