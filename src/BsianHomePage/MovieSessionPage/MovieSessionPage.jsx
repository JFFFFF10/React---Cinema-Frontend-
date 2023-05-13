import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import "./MovieSessionPage.css";

const timeHeaders = [
  "08:30", "11:30", "14:00", "16:30", "17:50", "18:40", "19:30", "20:40", "21:10"
];

function MovieSessionPageWrapper() {
  let { movie_title } = useParams();
  return <MovieSessionPage movie_title={movie_title} />;
}

const groupSessionsByDate = (sessions) => {
  const groupedSessions = sessions.reduce((acc, session) => {
    if (!acc[session.session_date]) {
      acc[session.session_date] = [];
    }
    acc[session.session_date].push(session);
    return acc;
  }, {});

  return Object.entries(groupedSessions).sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB));
};

class MovieSessionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessions: [],
    };
  }

  async fetchSessions(movie_title) {
    try {
      const response = await axios.post(
        "https://csit-314-cinema-booking-system.vercel.app/getMovieSession/",
        { movie_title: decodeURIComponent(movie_title) }
      );
      this.setState({ sessions: response.data });
    } catch (error) {
      console.error("Error fetching movie sessions:", error);
    }
  }

  componentDidMount() {
    const { movie_title } = this.props;
    this.fetchSessions(movie_title);
  }

  render() {
    const { movie_title } = this.props;
    const groupedSessions = groupSessionsByDate(this.state.sessions);

    return (
      <>
        <Header />
        <div className="movieSessionPage--content">
          <h2>Movie Sessions for <u>{decodeURIComponent(movie_title)}</u></h2>
          {groupedSessions.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  {timeHeaders.map((time) => (
                    <th key={time}>{time}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {groupedSessions.map(([date, sessions]) => (
                  <tr key={date}>
                    <td>{date}</td>
                    {timeHeaders.map((time) => {
                      const session = sessions.find((s) => s.session_time === time);
                      return (
                        <td key={`${date}-${time}`}>
                          {session ? (
                            <a href={`/booking/${session.id}`}>{session.session_time}</a>
                          ) : (
                            "-"
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="centered-message">
              Sorry, we don't have movie sessions for this film yet.
            </p>
          )}
        </div>
        <Footer />
      </>
    );
  }
}

export default MovieSessionPageWrapper;
