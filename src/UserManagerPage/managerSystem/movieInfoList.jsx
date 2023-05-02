import React from "react";

class MovieList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchText: "",
		};
	}

	handleSearchChange = (event) => {
		this.setState({ searchText: event.target.value });
	};

	handleDelete = (movie) => {
		if (window.confirm(`Are you sure you want to delete ${movie.movie_title}?`)) {
			fetch(`https://csit-314-cinema-booking-system.vercel.app/delMov/${movie.movie_title}`, {
				method: "DELETE",
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					this.props.handleDelete(movie.movie_title);
				})
				.catch((err) => console.log(err));
		}
	};

	render() {
		const { movies, handleEdit } = this.props;
		const { searchText } = this.state;

		// Filter movies based on search text
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
									<td>{movie.duration}</td>
									<td>{movie.release_date}</td>
									<td>{movie.cast} </td>
									<td>{movie.director} </td>
									<td>{movie.movie_description} </td>
									<td className="text-right">
										<button
											onClick={() => handleEdit(movie)}
											className="userManagerPage--right"
										>
											Edit
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

export default MovieList;
