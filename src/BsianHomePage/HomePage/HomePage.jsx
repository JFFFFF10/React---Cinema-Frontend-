import React, { useState, useEffect } from "react";
import axios from 'axios';

import Homes from "../components/homes/Homes";
import Upcoming from "../components/upcoming/Upcoming";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import "./HomePage.css";

const HomePage = () => {
  const [nowShowing, setNowShowing] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

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

  return (
    <>
      <Header />
      <Homes />
      <Upcoming items={nowShowing} title='Now Showing Movies' />
      <Upcoming items={upcoming} title='Upcoming Movies' />
      <Footer />
    </>
  )
}

export default HomePage;
