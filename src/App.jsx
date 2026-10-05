import { useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import MovieDetail from "./pages/MovieDetails";
import Contact from "./pages/Contact";

function App() {
  const [filter, setFilter] = useState({ type: "all" });

  return (
    <div>
      <Navbar setFilter={setFilter} />
      <Routes>
        <Route path="/" element={<Home filter={filter} />} />
         <Route path="/contact" element={<Contact />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
      <Footer setFilter={setFilter} />
    </div>
  );
}

export default App;