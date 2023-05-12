import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import "./MoviesPage.css";

const MoviesPage = () => {
  const [movieList, setMovieList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('All');
  const [nowShowing, setNowShowing] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://csit-314-cinema-booking-system.vercel.app/viewMov/');
        setMovieList(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchNowShowingData = async () => {
      try {
        const response = await axios.get('https://csit-314-cinema-booking-system.vercel.app/viewNowShowing/');
        setNowShowing(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNowShowingData();
  }, []);

  useEffect(() => {
    const fetchUpcomingData = async () => {
      try {
        const response = await axios.get('https://csit-314-cinema-booking-system.vercel.app/viewUpcoming/');
        setUpcoming(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUpcomingData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  const handleTabClick = (event) => {
    setSelectedTab(event.target.innerText);
  }

  let filteredMovies = movieList.filter(movie => movie.movie_title.toLowerCase().includes(searchTerm.toLowerCase()));

  if (selectedTab === 'Now Showing') {
    filteredMovies = nowShowing.filter(movie => movie.movie_title.toLowerCase().includes(searchTerm.toLowerCase()));
  } else if (selectedTab === 'Upcoming') {
    filteredMovies = upcoming.filter(movie => movie.movie_title.toLowerCase().includes(searchTerm.toLowerCase()));
  }

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
        <div className="moviesPage--tabs">
          <div className={`moviesPage--tab ${selectedTab === 'All' ? 'active' : ''}`} onClick={handleTabClick}>All</div>
          <div className={`moviesPage--tab ${selectedTab === 'Now Showing' ? 'active' : ''}`} onClick={handleTabClick}>Now Showing</div>
          <div className={`moviesPage--tab ${selectedTab === 'Upcoming' ? 'active' : ''}`} onClick={handleTabClick}>Upcoming</div>
        </div>
        <div className="moviesPage--posters-container">
          {filteredMovies.map(movie => (
            <div className="moviesPage--posterbox" key={movie.movie_title}>
              <Link to={`/movie-sessions/${encodeURIComponent(movie.movie_title)}`}>
                <img 
                  src={movie.posterIMG}
                  alt={movie.movie_title}
                  loading="lazy" 
                />
              </Link>
              <Link to={`/movie-sessions/${encodeURIComponent(movie.movie_title)}`}>
                <div className="moviesPage--poster-title">{movie.movie_title}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MoviesPage;
