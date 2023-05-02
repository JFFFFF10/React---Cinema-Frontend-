import React from "react";

class MovieList extends React.Component {
	render() {
		const { movies, handleEdit, handleDelete } = this.props;

		return (
			<div className="userManagerPage--contain-table">
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
						{movies.length > 0 ? (
							movies.map((movie, i) => (
								<tr key={movie.id} className="userManagerPage--table">
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
											onClick={() => handleEdit(movie.id)}
											className="userManagerPage--right"
										>
											Edit
										</button>
									</td>
									<td className="text-left">
										<button
											onClick={() => handleDelete(movie.id)}
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
