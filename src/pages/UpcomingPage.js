import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpcomingPage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/upcoming', {
          params: {
            api_key: 'c45a857c193f6302f2b5061c3b85e743',
            language: 'en-US',
            page: page,
          },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching upcoming movies:', error);
      }
    };

    fetchUpcomingMovies();
  }, [page]);

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  return (
    <div className="container mx-auto p-4 mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center mt-2">
        {movies?.map((movie) => (
          <div
            key={movie.id}
            className="cursor-pointer flex flex-col items-center mb-10"
            onClick={() => handleMovieClick(movie?.id)}
            style={{ width: '10rem', height: '16rem' }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
              alt={movie?.title}
              className="w-full h-full object-cover rounded-lg mb-2"
            />
            <div className="text-center mt-2">
              <h2 className="text-xs font-bold text-white">{movie?.title}</h2>
              <p className="text-xs font-bold text-gray-400">Rating: {movie?.vote_average?.toFixed(1)}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          className="bg-blue-500 text-white p-2 rounded"
          disabled={page === 1}
        >
          Previous
        </button>
        <button onClick={handleNextPage} className="bg-blue-500 text-white p-2 rounded">
          Next
        </button>
      </div>
    </div>
  );
};

export default UpcomingPage;