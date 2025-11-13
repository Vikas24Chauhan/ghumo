import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./pages/HomePage";
import PlacePages from "./pages/PlacePages";
import PlaceDetails from "./components/placeDetails/PlaceDetails";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/places" element={<PlacePages />} />
        <Route path="/place-details" element={<PlaceDetails />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
