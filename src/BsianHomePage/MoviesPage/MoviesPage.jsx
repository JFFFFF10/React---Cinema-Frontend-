import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import "./MoviesPage.css";

class MoviesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieList: [],
      searchTerm: '',
      selectedTab: 'All',
      nowShowing: [],
      upcoming: []
    };
  }

  async fetchData(url, stateSetter) {
    try {
      const response = await axios.get(url);
      this.setState({ [stateSetter]: response.data });
    } catch (error) {
      console.error(error);
    }
  }

  componentDidMount() {
    this.fetchData('https://csit-314-cinema-booking-system.vercel.app/viewMov/', 'movieList');
    this.fetchData('https://csit-314-cinema-booking-system.vercel.app/viewNowShowing/', 'nowShowing');
    this.fetchData('https://csit-314-cinema-booking-system.vercel.app/viewUpcoming/', 'upcoming');
  }

  handleSearch = (event) => {
    this.setState({ searchTerm: event.target.value });
  }

  handleTabClick = (event) => {
    this.setState({ selectedTab: event.target.innerText });
  }

  render() {
    let filteredMovies = this.state.movieList.filter(movie => movie.movie_title.toLowerCase().includes(this.state.searchTerm.toLowerCase()));

    if (this.state.selectedTab === 'Now Showing') {
      filteredMovies = this.state.nowShowing.filter(movie => movie.movie_title.toLowerCase().includes(this.state.searchTerm.toLowerCase()));
    } else if (this.state.selectedTab === 'Upcoming') {
      filteredMovies = this.state.upcoming.filter(movie => movie.movie_title.toLowerCase().includes(this.state.searchTerm.toLowerCase()));
    }

    return (
      <>
        <Header />
        <div className="moviesPage--content">
          <div className="moviesPage--searchBar">
            <input
              type="text"
              placeholder="Search movies..."
              value={this.state.searchTerm}
              onChange={this.handleSearch}
            />
          </div>
          <div className="moviesPage--tabs">
            <div className={`moviesPage--tab ${this.state.selectedTab === 'All' ? 'active' : ''}`} onClick={this.handleTabClick}>All</div>
            <div className={`moviesPage--tab ${this.state.selectedTab === 'Now Showing' ? 'active' : ''}`} onClick={this.handleTabClick}>Now Showing</div>
            <div className={`moviesPage--tab ${this.state.selectedTab === 'Upcoming' ? 'active' : ''}`} onClick={this.handleTabClick}>Upcoming</div>
          </div>
          <div className="moviesPage--posters-container">
            {filteredMovies.map(movie => (
              <div className="moviesPage--posterbox" key={movie.movie_title}>
                <Link to={`/movie-detail/${encodeURIComponent(movie.movie_title)}`}>
                  <img 
                    src={movie.posterIMG}
                    alt={movie.movie_title}
                    loading="lazy" 
                  />
                </Link>
                <div className="moviesPage--poster-overlay">
                  <Link to={`/movie-detail/${encodeURIComponent(movie.movie_title)}`}>
                    <div className="moviesPage--poster-title">{movie.movie_title}</div>
                  </Link>
                  <div className="moviesPage--poster-buttons">
                    <Link to={`/movie-detail/${encodeURIComponent(movie.movie_title)}`}>
                      <button className="moviesPage--button-info">More Info</button>
                    </Link>
                    <Link to={`/movie-sessions/${encodeURIComponent(movie.movie_title)}`}>
                      <button className="moviesPage--button-book">Book Now</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default MoviesPage;
