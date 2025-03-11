import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaSignInAlt } from 'react-icons/fa';
import farmImage from "../assets/images/ocf2.png";
import "../styles/home.css"; // Import CSS

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="text-green-800 text-4xl sm:text-5xl font-bold">Welcome to <span className="text-green-600">Organic Farmland</span></h1>
        <p className="text-lg text-gray-600 mt-4">Connecting farmers and consumers directly for fresh, organic produce.</p>
        
        <div className="mt-6">
          <img src={farmImage} alt="Farmland" className="home-image" />
        </div>

        <div className="button-container">
          <Link to="/signup" className="button bg-green-500 text-white">
            <FaUserPlus className="mr-2" /> Sign Up
          </Link>
          <Link to="/login" className="button bg-blue-500 text-white">
            <FaSignInAlt className="mr-2" /> Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
