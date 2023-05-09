import React, { useState, useEffect } from "react";
import axios from 'axios';

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import "./MoviesPage.css";

const MoviesPage = () => {
  const [movieList, setMovieList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://csit-314-cinema-booking-system.vercel.app/view/');
        setMovieList(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  const filteredMovies = movieList.filter(movie => movie.movie_title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <Header />
      <div className="moviesPage--content">
        <div className="moviesPage--searchBar">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="moviesPage--posters-container">
          {filteredMovies.map(movie => (
            <div className="moviesPage--posterbox" key={movie.movie_title}>
              <img src={movie.posterIMG} loading="lazy" />
              <div className="moviesPage--poster-title">{movie.movie_title}</div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MoviesPage;
