import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${query}`);
  };

  return (
    <nav className="bg-[#343A3F] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <NavLink to="/" className="text-white text-lg font-bold ml-14">MovieDB</NavLink>
        </div>
        <div className="flex items-center mr-16">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'text-white text-lg ml-4' : 'text-[#606569] text-lg ml-4'
            }
          >
            Popular Movies
          </NavLink>
          <NavLink
            to="/top-rated"
            className={({ isActive }) =>
              isActive ? 'text-white text-lg ml-4' : 'text-[#606569] text-lg ml-4'
            }
          >
            Top Rated
          </NavLink>
          <NavLink
            to="/upcoming"
            className={({ isActive }) =>
              isActive ? 'text-white text-lg ml-4' : 'text-[#606569] text-lg ml-4'
            }
          >
            Upcoming
          </NavLink>
          <form onSubmit={handleSearch} className="flex ml-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="p-2 rounded-l text-black"
              placeholder="Movie Name"
            />
            <button type="submit" className="bg-[#6C747D] text-white p-2 rounded ml-2">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;