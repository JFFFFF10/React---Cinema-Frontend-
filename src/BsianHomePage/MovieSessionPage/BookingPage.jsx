import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import "./BookingPage.css";

function BookingPageWrapper() {
  const { sessionId } = useParams();
  return <BookingPage sessionId={sessionId} />;
}

class BookingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seat: '',
      ticketType: '',
      price: 0,
    };

    this.handleSeatChange = this.handleSeatChange.bind(this);
    this.handleTicketTypeChange = this.handleTicketTypeChange.bind(this);
    this.handleConfirmBooking = this.handleConfirmBooking.bind(this);
  }
  
  handleSeatChange(e) {
    this.setState({ seat: e.target.value });
  }

  handleTicketTypeChange(e) {
    let price;
    switch (e.target.value) {
      case 'adult':
        price = 10;
        break;
      case 'senior':
        price = 8;
        break;
      case 'children':
        price = 6;
        break;
      default:
        price = 0;
    }
    this.setState({ ticketType: e.target.value, price: price });
  }

  async handleConfirmBooking() {
    const seatPattern = /^[A-E]{1}[1-9]0?$/;
    if (!this.state.seat || !seatPattern.test(this.state.seat)) {
      Swal.fire(
        'Error',
        'Invalid seat number. It should be A-E followed by a number from 1-10. Example: A10',
        'error'
      );
      return;
    }

    if (!this.state.ticketType) {
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
          movie_session: this.props.sessionId,
          seat_number: this.state.seat,
          ticket_type: this.state.ticketType
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
        window.location.href = "/UserMovieBooking";
      })
      // reset form
      this.setState({ seat: '', ticketType: '' });
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


  render() {
    return (
      <>
        <Header />
        <div className="bookingPage--content">
          <h2 className="bookingPage--title">Booking for Session ID: {this.props.sessionId}</h2>
          <img 
            src={`${process.env.PUBLIC_URL}/images/seatmap.jpg`} 
            alt="Session Image" 
            className="bookingPage--image"
          />
          <div className="bookingPage--form">
            <label className="bookingPage--label">
              Seat Number:
              <input type="text" value={this.state.seat} onChange={this.handleSeatChange} className="bookingPage--input" />
            </label>
            <label className="bookingPage--label">
              Ticket Type:
              <select value={this.state.ticketType} onChange={this.handleTicketTypeChange} className="bookingPage--select">
                <option value="">Select ticket type</option>
                <option value="adult">Adult</option>
                <option value="senior">Senior</option>
                <option value="children">Children</option>
              </select>
            </label>
            <p className="bookingPage--total">Your Total: {this.state.price}SGD</p>
            <button onClick={this.handleConfirmBooking} className="bookingPage--button">Confirm Booking</button>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default BookingPageWrapper;
