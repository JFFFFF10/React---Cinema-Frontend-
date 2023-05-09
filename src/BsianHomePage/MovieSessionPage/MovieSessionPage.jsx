import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import "./MovieSessionPage.css";

const timeHeaders = [
  "08:30", "11:30", "14:00", "16:30", "17:50", "18:40", "19:30", "20:40", "21:10"
];

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

const MovieSessionPage = () => {
  const { movie_title } = useParams();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.post(
          "https://csit-314-cinema-booking-system.vercel.app/getMovieSession/",
          { movie_title: decodeURIComponent(movie_title) }
        );
        setSessions(response.data);
      } catch (error) {
        console.log(decodeURIComponent(movie_title));
        console.error("Error fetching movie sessions:", error);
      }
    };

    fetchSessions();
  }, [movie_title]);

  const groupedSessions = groupSessionsByDate(sessions);

  return (
    <>
      <Header />
      <div className="movieSessionPage--content">
        <h2>Movie Sessions for {decodeURIComponent(movie_title)}</h2>
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
      </div>
      <Footer />
    </>
  );
};

export default MovieSessionPage;
