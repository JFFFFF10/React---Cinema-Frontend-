import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import "./BookingPage.css";

function BookingPage() {
  const { sessionId } = useParams();
  const [seat, setSeat] = useState('');
  const [ticketType, setTicketType] = useState('');
  const [price, setPrice] = useState(0);

  const handleSeatChange = (e) => {
    setSeat(e.target.value);
  }

  const handleTicketTypeChange = (e) => {
    setTicketType(e.target.value);
    switch (e.target.value) {
      case 'adult':
        setPrice(10);
        break;
      case 'senior':
        setPrice(8);
        break;
      case 'children':
        setPrice(6);
        break;
      default:
        setPrice(0);
    }
  }

  const navigate = useNavigate();
  const handleConfirmBooking = async () => {
    const seatPattern = /^[A-E]{1}[1-9]0?$/;
    if (!seat || !seatPattern.test(seat)) {
      Swal.fire(
        'Error',
        'Invalid seat number. It should be A-E followed by a number from 1-10. Example: A10',
        'error'
      );
      return;
    }

    if (!ticketType) {
      Swal.fire(
        'Error',
        'Please select a ticket type',
        'error'
      );
      return;
    }

    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "https://csit-314-cinema-booking-system.vercel.app/addBook/",
        {
          movie_session: sessionId,
          seat_number: seat,
          ticket_type: ticketType
        },{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`,
            },
        });
      // Booking successful
      Swal.fire(
        'Booking Successful!',
        'Your booking has been made.',
        'success'
      ).then(() => {
        navigate("/UserMovieBooking");
      })
      // reset form
      setSeat('');
      setTicketType('');
    } catch (error) {
      console.error("Error confirming booking:", error);
      // Booking failed
      Swal.fire(
        'Booking Failed',
        'There was an error with your booking. Please try again.',
        'error'
      )
    }
  }

  return (
    <>
      <Header />
      <div className="bookingPage--content">
        <h2 className="bookingPage--title">Booking for Session ID: {sessionId}</h2>
        <img 
          src={`${process.env.PUBLIC_URL}/images/seatmap.jpg`} 
          alt="Session Image" 
          className="bookingPage--image"
        />
        <div className="bookingPage--form">
          <label className="bookingPage--label">
            Seat Number:
            <input type="text" value={seat} onChange={handleSeatChange} className="bookingPage--input" />
          </label>
          <label className="bookingPage--label">
            Ticket Type:
            <select value={ticketType} onChange={handleTicketTypeChange} className="bookingPage--select">
              <option value="">Select ticket type</option>
              <option value="adult">Adult</option>
              <option value="senior">Senior</option>
              <option value="children">Children</option>
            </select>
          </label>
          <p className="bookingPage--total">Your Total: {price}SGD</p>
          <button onClick={handleConfirmBooking} className="bookingPage--button">Confirm Booking</button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BookingPage;

