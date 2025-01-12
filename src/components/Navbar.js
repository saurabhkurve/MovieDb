import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${query}`);
  };

  return (
    <nav className="bg-[#343A3F] p-4 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <NavLink to="/" className="text-white text-lg font-bold ml-4 md:ml-14">MovieDB</NavLink>
        </div>
        <div className="flex items-center">
          <div className="hidden md:flex space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'text-white text-lg' : 'text-[#606569] text-lg'
              }
            >
              Popular Movies
            </NavLink>
            <NavLink
              to="/top-rated"
              className={({ isActive }) =>
                isActive ? 'text-white text-lg' : 'text-[#606569] text-lg'
              }
            >
              Top Rated
            </NavLink>
            <NavLink
              to="/upcoming"
              className={({ isActive }) =>
                isActive ? 'text-white text-lg' : 'text-[#606569] text-lg'
              }
            >
              Upcoming
            </NavLink>
          </div>
          <form onSubmit={handleSearch} className="flex ml-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="p-1 md:p-2 rounded-l text-black"
              placeholder="Movie Name"
            />
            <button type="submit" className="bg-[#6C747D] text-white p-1 md:p-2 rounded ml-1 md:ml-2">
              Search
            </button>
          </form>
          <button
            className="md:hidden text-white ml-4"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'block text-white text-lg p-2' : 'block text-[#606569] text-lg p-2'
            }
          >
            Popular Movies
          </NavLink>
          <NavLink
            to="/top-rated"
            className={({ isActive }) =>
              isActive ? 'block text-white text-lg p-2' : 'block text-[#606569] text-lg p-2'
            }
          >
            Top Rated
          </NavLink>
          <NavLink
            to="/upcoming"
            className={({ isActive }) =>
              isActive ? 'block text-white text-lg p-2' : 'block text-[#606569] text-lg p-2'
            }
          >
            Upcoming
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;