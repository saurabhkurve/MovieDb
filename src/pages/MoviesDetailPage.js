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
    <div className="container mx-auto p-4">
      <div className="flex justify-center">
        <div className="relative rounded-lg overflow-hidden" style={{ height: '25rem', width: '90vw' }}>
          <div className="absolute inset-0 flex">
            <div className="w-1/2 bg-[#010A17] p-6 flex flex-col justify-between">
              <div className="flex flex-row">
                <div className="flex-none" style={{ width: '8rem', height: '12rem' }}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                    alt={movie?.title}
                    className="w-full h-full object-cover rounded-lg mb-4"
                  />
                </div>
                <div className="flex-grow ml-4 text-white">
                  <h1 className="text-xl font-bold">{movie?.title}</h1>
                  <p className="text-lg mt-2 text-gray-500">Rating: {movie?.vote_average?.toFixed(1)}</p>
                  <div className="flex items-center mt-4">
                    <p className="text-sm border border-gray-400 rounded p-1 mr-4">{movie?.runtime} min</p>
                    <p className="text-sm">{movie?.genres?.map((genre) => genre?.name).join(', ')}</p>
                  </div>
                  <p className="text-sm mt-4">Release Date: {formattedReleaseDate}</p>
                </div>
              </div>
              <div className="text-white mb-10">
                <h2 className="text-lg font-bold">Overview</h2>
                <p className="text-sm mt-2 text-justify">{movie?.overview}</p>
              </div>
            </div>
            <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie?.backdrop_path})` }}></div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-white">Cast</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {cast?.slice(0, 12).map((actor) => (
            <div key={actor?.cast_id} className="text-center">
              <img
                src={`https://image.tmdb.org/t/p/w500${actor?.profile_path}`}
                alt={actor?.name}
                className="object-cover  mb-2"
                style={{ width: '15rem', height: '22rem' }}
              />
              <h3 className="text-sm font-bold flex justify-start items-start">{actor?.name}</h3>
              <p className="text-xs  flex justify-start items-start">Character: {actor?.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviesDetailPage;