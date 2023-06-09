import React from "react";
import axios from "axios";
import Swal from "sweetalert2";

class MovieDeletePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchText: "",
			movieSessions: [],
		};
	}

	handleSearchChange = (event) => {
		this.setState({ searchText: event.target.value });
	};

	handleDelete = async (movie_title) => {
		const token = localStorage.getItem("token");

		try {
			const response = await axios.post(
				`https://csit-314-cinema-booking-system.vercel.app/delMov/`,
				{ movie_title: movie_title.movie_title },
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Token ${token}`,
					},
				}
			);

			Swal.fire({
				icon: "success",
				title: "Deleted!",
				text: `${movie_title.movie_title} 's data has been Deleted.`,
				showConfirmButton: false,
				timer: 3000,
			});

			if (response.status === 200) {
				console.log("Movie delete successfully.");
			}
			window.location.reload();
			console.log(response.data);
		} catch (error) {
			console.log(movie_title.movie_title);
			throw new Error("An error occurred while deleting the movie.");
		}
	};

	formatDuration(durationInSeconds) {
		let hours = Math.floor(durationInSeconds / 3600);
		let minutes = Math.floor((durationInSeconds % 3600) / 60);
		let seconds = durationInSeconds % 60;
		return `${hours.toString().padStart(2, "0")}:${minutes
			.toString()
			.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
	}

	render() {
		const { movies, handleEdit } = this.props;
		const { searchText } = this.state;

		const filteredMovies = movies.filter((movie) =>
			movie.movie_title.toLowerCase().includes(searchText.toLowerCase())
		);

		return (
			<div className="userManagerPage--contain-table">
				<div className="userManager--searchContainer">
					<input
						type="text"
						placeholder="Search movies"
						className="userManager--searchBar"
						value={searchText}
						onChange={this.handleSearchChange}
					/>
				</div>
				<table className="striped-table">
					<thead>
						<tr>
							<th>No.</th>
							<th>Movie Title</th>
							<th>Genre</th>
							<th>Duration</th>
							<th>Release</th>
							<th>Cast</th>
							<th>Director</th>
							<th>Movie_description</th>
							<th>PosterIMG</th>
							<th>FeatureIMG</th>
							<th colSpan={2} className="userManagerPage--text-center">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{filteredMovies.length > 0 ? (
							filteredMovies.map((movie, i) => (
								<tr key={i} className="userManagerPage--table">
									<td>{i + 1}</td>
									<td>{movie.movie_title}</td>
									<td>{movie.genre}</td>
									<td>{this.formatDuration(movie.duration)}</td>
									<td>{movie.release_date}</td>
									<td>{movie.cast} </td>
									<td>{movie.director} </td>
									<td>{movie.movie_description} </td>
									<td>
										<img
											src={`${movie.posterIMG}`}
											alt="Poster image"
											width={100}
										/>
									</td>
									<td>
										<img
											src={`${movie.featureIMG}`}
											alt="Feature image"
											width={100}
										/>
									</td>
									<td className="text-right">
										<button
											onClick={() => handleEdit(movie)}
											className="userManagerPage--right"
										>
											Update
										</button>
									</td>
									<td className="text-left">
										<button
											onClick={() => this.handleDelete(movie)}
											className="userManagerPage--right"
										>
											Delete
										</button>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={7}>No movies</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		);
	}
}

export default MovieDeletePage;
