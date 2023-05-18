import React, { Component } from "react";
import Swal from "sweetalert2";
import axios from "axios";

class MovieSessionEditPage extends Component {
	constructor(props) {
		super(props);

		const selectedname = this.props.selectedname;

		this.state = {
			id: selectedname ? selectedname.id : "",
			movie_title: selectedname ? selectedname.movie_title : "",
			session_date: selectedname ? selectedname.session_date : "",
			cinema_room: selectedname ? selectedname.cinema_room : "",
			session_time: selectedname ? selectedname.session_time : "",
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
	}

	handleUpdate = async (e) => {
		const token = localStorage.getItem("token");
		e.preventDefault();
		const { setIsEditing } = this.props;
		setIsEditing(false);

		try {
			const response = await axios.post(
				"https://csit-314-cinema-booking-system.vercel.app/updateMovieSession/",
				{
					id: this.state.id,
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

			if (response.status === 200) {
				Swal.fire({
					icon: "success",
					title: "Updated!",
					text: `Movie session data has been updated.`,
					showConfirmButton: false,
					timer: 3000,
				});
				window.location.reload();
				this.moviesession.update_session_time(this.state.session_time);
			} else if (response.status === 404) {
				Swal.fire({
					icon: "error",
					title: "Error",
					text: `Movie session with the given ID does not exist.`,
					showConfirmButton: false,
					timer: 3000,
				});
			}
		} catch (error) {
			console.log(token);
		}
	};

	render() {
		const {
			id,
			session_date,
			valid_session_times,
		} = this.state;

		const { setIsEditing } = this.props;

		return (
			<div className="userManagerPage--small-container">
				<form onSubmit={this.handleUpdate} className="userManagerPage--form">
					<h1>Update Movie Session</h1>
					<label htmlFor="id">ID</label>
					<input
						id="id"
						type="text"
						name="id"
						value={id}
						onChange={(event) => this.setState({ id: event.target.value })}
					/>
					<label htmlFor="session_date">Session Date</label>
					<input
						id="session_date"
						type="date"
						name="session_date"
						value={session_date}
						onChange={(event) =>
							this.setState({ session_date: event.target.value })
						}
					/>
					<label htmlFor="session_time">Session Time</label>
					<select
						id="session_time"
						name="session_time"
						onChange={(event) =>
							this.setState({ session_time: event.target.value })
						}
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
							value="Update"
						/>
						<input
							style={{ marginLeft: "12px" }}
							className="userManagerPage--right"
							type="button"
							value="Cancel"
							onClick={() => setIsEditing(false)}
						/>
					</div>
				</form>
			</div>
		);
	}
}

export default MovieSessionEditPage;
