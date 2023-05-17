import React, { Component } from "react";
import axios from "axios";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import MovieBookingList from "./UserMovieBookingList";

class MovieBooking extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchText: "",
			movieBookings: [],
		};

		this.handleEdit = this.handleEdit.bind(this);
		this.setIsAdding = this.setIsAdding.bind(this);
		this.setIsEditing = this.setIsEditing.bind(this);
		this.movieBookings = this.movieBookings.bind(this);
	}

	async componentDidMount() {
		try {
			const response = await axios.get(
				"https://csit-314-cinema-booking-system.vercel.app/viewAllBook/",
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Token ${localStorage.getItem("token")}`,
					},
				}
			);
			this.setState({ movieBookings: response.data });
		} catch (error) {
			console.log(error);
		}
	}

	handleEdit(movieBookings) {
		this.setState({
			selectedmovieBooking: movieBookings,
			isEditing: true,
		});
	}

	setIsAdding(isAdding) {
		this.setState({ isAdding });
	}

	setIsEditing(isEditing) {
		this.setState({ isEditing });
	}

	movieBookings(movieBookings) {
		this.setState({ movieBookings });
	}

	render() {
		const { movieBookings, selectedmovieBooking, isAdding, isEditing } =
			this.state;

		return (
			<>
				<Header />
				<div>
					<h2 className="userFNB--title">Movie Bookings</h2>
					<div className="userFNB--tableContainer">
						{!isAdding && !isEditing && (
							<>
								<MovieBookingList
									movieBookings={movieBookings}
									handleEdit={this.handleEdit}
									handleDelete={this.handleDelete}
								/>
							</>
						)}
					</div>
				</div>
				<Footer />
			</>
		);
	}
}

export default MovieBooking;
