import React, { Component } from "react";
import Swal from "sweetalert2";
import axios from "axios";

class MovieSessionAdd extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movie_title: "",
			session_date: "",
			cinema_room: "",
			session_time: "",
			valid_session_times: [
				"8:30",
				"11:30",
				"14:00",
				"16:30",
				"17:50",
				"18:40",
				"19:30",
				"20:40",
				"21:10",
			],
		};
		this.textInput = React.createRef();
	}

	componentDidMount() {
		this.textInput.current.focus();
	}

	handleInputChange = (event) => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

	handleCancel = () => {
		window.location.reload();
		this.props.setIsAdding(false);
	};

	handleAdd = async (e) => {
		const token = localStorage.getItem("token");
		e.preventDefault();
		const { movie_title, session_date, cinema_room, session_time } = this.state;

		if (!movie_title || !session_date || !cinema_room || !session_time) {
			return Swal.fire({
				icon: "error",
				title: "Error!",
				text: "All fields are required.",
				showConfirmButton: true,
			});
		}

		try {
			const response = await axios.post(
				"https://csit-314-cinema-booking-system.vercel.app/addMS/",
				{
					movie_title: this.state.movie_title,
					session_date: this.state.session_date,
					cinema_room: this.state.cinema_room,
					session_time: this.state.session_time,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Token ${token}`,
					},
				}
			);

			Swal.fire({
				icon: "success",
				title: "Added!",
				text: `Movie session has been added.`,
				showConfirmButton: false,
				timer: 3000,
			});

			this.setState({
				movie_title: "",
				session_date: "",
				cinema_room: "",
				session_time: "",
			});

			if (response.status === 200) {
				console.log("Cinema room added successfully.");
			}
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		const {
			movie_title,
			session_date,
			cinema_room,
			session_time,
			valid_session_times,
		} = this.state;

		return (
			<div className="userManagerPage--small-container">
				<form onSubmit={this.handleAdd} className="userManagerPage--form">
					<h1>Add Movie Session</h1>
					<label htmlFor="movie_title">Movie</label>
					<input
						id="movie_title"
						type="text"
						ref={this.textInput}
						name="movie_title"
						value={movie_title}
						onChange={this.handleInputChange}
					/>
					<label htmlFor="session_date">Session Date</label>
					<input
						id="session_date"
						type="date"
						name="session_date"
						value={session_date}
						onChange={this.handleInputChange}
					/>
					<label htmlFor="cinema_room">Cinema Room</label>
					<input
						id="cinema_room"
						type="text"
						name="cinema_room"
						value={cinema_room}
						onChange={this.handleInputChange}
					/>
					<label htmlFor="session_time">Session Time</label>
					<select
						id="session_time"
						name="session_time"
						onChange={this.handleInputChange}
					>
						<option value="">Select Session Time</option>
						{valid_session_times.map((session_time) => (
							<option key={session_time} value={session_time}>
								{session_time}
							</option>
						))}
					</select>
					<div style={{ marginTop: "30px" }}>
						<input
							className="userManagerPage--left"
							type="submit"
							value="Add"
						/>
						<input
							style={{ marginLeft: "12px" }}
							className="userManagerPage--right"
							type="button"
							value="Cancel"
							onClick={this.handleCancel}
						/>
					</div>
				</form>
			</div>
		);
	}
}

export default MovieSessionAdd;
