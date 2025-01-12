import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MoviesDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          params: {
            api_key: 'c45a857c193f6302f2b5061c3b85e743',
            language: 'en-US',
          },
        });
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    const fetchMovieCast = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
          params: {
            api_key: 'c45a857c193f6302f2b5061c3b85e743',
            language: 'en-US',
          },
        });
        setCast(response.data.cast);
      } catch (error) {
        console.error('Error fetching movie cast:', error);
      }
    };

    fetchMovieDetails();
    fetchMovieCast();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const formattedReleaseDate = new Date(movie?.release_date).toDateString();

  return (
    <div className="container mx-auto p-4 mt-8">
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start mt-10">
        <div className="relative rounded-lg overflow-hidden w-full" style={{ maxWidth: '90vw' }}>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 bg-[#010A17] p-6 flex flex-col justify-between">
              <div className="flex flex-col md:flex-row">
                <div className="flex-none mb-4 md:mb-0" style={{ width: '8rem', height: '12rem' }}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                    alt={movie?.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-grow ml-0 md:ml-4 text-white">
                  <h1 className="text-xl font-bold">{movie?.title}</h1>
                  <p className="text-lg mt-2 text-gray-500">Rating: {movie?.vote_average?.toFixed(1)}</p>
                  <div className="flex items-center mt-4 flex-wrap">
                    <p className="text-sm border border-gray-400 rounded p-1 mr-4 mb-2 md:mb-0">{movie?.runtime} min</p>
                    <p className="text-sm">{movie?.genres?.map((genre) => genre?.name).join(', ')}</p>
                  </div>
                  <p className="text-sm mt-4">Release Date: {formattedReleaseDate}</p>
                </div>
              </div>
              <div className="text-white mt-4 md:mt-10">
                <h2 className="text-lg font-bold">Overview</h2>
                <p className="text-sm mt-2 text-justify">{movie?.overview}</p>
              </div>
            </div>
            <div className="w-full md:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie?.backdrop_path})` }}></div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-white">Cast</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {cast?.slice(0, 12).map((actor) => (
            <div key={actor?.cast_id} className="text-center">
              <img
                src={`https://image.tmdb.org/t/p/w500${actor?.profile_path}`}
                alt={actor?.name}
                className="object-cover mb-2 w-full h-auto"
              />
              <h3 className="text-sm font-bold">{actor?.name}</h3>
              <p className="text-xs">Character: {actor?.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviesDetailPage;