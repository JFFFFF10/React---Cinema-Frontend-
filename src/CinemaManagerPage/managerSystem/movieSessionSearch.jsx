import React, { Component } from "react";
import axios from "axios";

class MovieSessionSearch extends Component {
	state = {
		searchText: "",
		sessions: [],
	};

	handleSearchChange = async (event) => {
		try {
			const response = await axios.post(
				"https://csit-314-cinema-booking-system.vercel.app/searchMovieSession/",
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Token ${localStorage.getItem("token")}`,
					},
					data: {
						searchText: event.target.value,
					},
				}
			);
			this.setState({ sessions: response.data });
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		const { searchText } = this.state;
		return (
			<div>
				<input
					type="text"
					placeholder="Search movie session"
					className="userManager--searchBar"
					value={searchText}
				/>
				<button onClick={this.handleSearchChange}>Search</button>
				<ul>
					{this.state.sessions.map((session) => (
						<li key={session.id}>
							{session.movie.title} - {session.session_date} -{" "}
							{session.cinema_room}
						</li>
					))}
				</ul>
			</div>
		);
	}
}

export default MovieSessionSearch;
