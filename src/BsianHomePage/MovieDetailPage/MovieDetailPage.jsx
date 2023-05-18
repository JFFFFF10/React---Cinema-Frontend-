import React from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import "./MovieDetailPage.css";

function MovieDetailPageWrapper() {
  let { movie_title } = useParams();
  return <MovieDetailPage movie_title={movie_title} />;
}

class MovieDetailPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        movieDetails: null
      };
    }
  
    formatDuration = (seconds) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
  
      return `${hours} hours ${minutes} minutes`;
    };
  
    async componentDidMount() {
      const { movie_title } = this.props;
      try {
        const response = await axios.post('https://csit-314-cinema-booking-system.vercel.app/retrieveMovieDetail/',{
          movie_title: movie_title,
        });
        const movieDetails = response.data[0];
        this.setState({ movieDetails });
        console.log(movieDetails);
      } catch (error) {
        console.error(error);
      }
    }
  
    render() {
      const { movieDetails } = this.state;
      if (!movieDetails) return null;
  
      return (
        <>
          <Header />
          <div className="movieDetailPage--content">
            <div className="movieDetailPage--poster">
              <img 
                src={movieDetails.posterIMG}
                alt={movieDetails.movie_title}
              />
            </div>
            <div className="movieDetailPage--details">
              <h1>{movieDetails.movie_title}</h1>
              <p><strong>Genre:</strong> {movieDetails.genre}</p>
              <p><strong>Duration:</strong> {this.formatDuration(movieDetails.duration)}</p>
              <p><strong>Release Date:</strong> {movieDetails.release_date}</p>
              <p><strong>Cast:</strong> {movieDetails.cast}</p>
              <p><strong>Director:</strong> {movieDetails.director}</p>
              <p><strong>Description:</strong> {movieDetails.movie_description}</p>
              <Link to={`/movie-sessions/${encodeURIComponent(movieDetails.movie_title)}`}>
                <button className="movieDetailPage--book-btn">Book Now</button>
              </Link>
            </div>
          </div>
          <Footer />
        </>
      );
    }
}
  
export default MovieDetailPageWrapper;
  
