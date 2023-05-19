import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./CinemaOwnerPage.css"
import Header from '../BsianHomePage/components/header/Header';

class CinemaOwnerPage extends Component {
  render() {
    return (
      <>
        <Header/>
        <div>
          <h1 className='cinemaOwnerPage--title'>Cinema Owner Page</h1>

          <div className='cinemaOwnerPage--btnContainer'>
            <Link to="/CinemaOwnerPage/co-daily-revenue">
              <button type="button" className="cinemaOwnerPage--btn">Daily Revenue Report</button>
            </Link>

            <Link to="/CinemaOwnerPage/co-daily-tickettype">
              <button type="button" className="cinemaOwnerPage--btn">Daily Ticket Report</button>
            </Link>

            <Link to="/CinemaOwnerPage/co-weekly-revenue">
              <button type="button" className="cinemaOwnerPage--btn">Weekly Revenue Report</button>
            </Link>

            <Link to="/CinemaOwnerPage/co-weekly-tickettype">
              <button type="button" className="cinemaOwnerPage--btn">Weekly Ticket Report</button>
            </Link>

            <Link to="/CinemaOwnerPage/co-monthly-revenue">
              <button type="button" className="cinemaOwnerPage--btn">Monthly Revenue Report</button>
            </Link>

            <Link to="/CinemaOwnerPage/co-monthly-tickettype">
              <button type="button" className="cinemaOwnerPage--btn">Monthly Ticket Report</button>
            </Link>
          </div>
        </div>
      </>
    );
  }
}

export default CinemaOwnerPage;
