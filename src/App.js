import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal"; // Import Modal component

import TopRatedPage from "./pages/TopRatedPage";
import UpcomingPage from "./pages/UpcomingPage";
import MovieDetailPage from "./pages/MoviesDetailPage";
import SearchPage from "./pages/SearchPage";
import HomePage from "./pages/HomePage";

function App() {
  const [showModal, setShowModal] = useState(true);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(false);
    }, 5000); // Automatically close the modal after 5 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Modal show={showModal} onClose={handleCloseModal} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/top-rated" element={<TopRatedPage />} />
          <Route path="/upcoming" element={<UpcomingPage />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;