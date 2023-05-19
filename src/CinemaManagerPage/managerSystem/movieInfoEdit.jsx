import React, { Component } from "react";
import Swal from "sweetalert2";
import axios from "axios";

class MovieEditPage extends Component {
	constructor(props) {
		super(props);

		const selectedmovie = this.props.selectedmovie;

		this.state = {
			movie_title: selectedmovie ? selectedmovie.movie_title : "",
			genre: selectedmovie ? selectedmovie.genre : "",
			duration: selectedmovie ? selectedmovie.duration : "",
			release_date: selectedmovie ? selectedmovie.release_date : "",
			cast: selectedmovie ? selectedmovie.cast : "",
			director: selectedmovie ? selectedmovie.director : "",
			movie_description: selectedmovie ? selectedmovie.movie_description : "",
			posterIMG: selectedmovie ? selectedmovie.posterIMG : "",
			featureIMG: selectedmovie ? selectedmovie.featureIMG : "",
		};
	}

	handleUpdate = async (e) => {
		const token = localStorage.getItem("token");
		e.preventDefault();
		const { setIsEditing } = this.props;
		setIsEditing(false);

		try {
			const response = await axios.post(
				"https://csit-314-cinema-booking-system.vercel.app/updateMovie/",
				{
					movie_title: this.state.movie_title,
					genre: this.state.genre,
					duration: this.state.duration,
					release_date: this.state.release_date,
					cast: this.state.cast,
					director: this.state.director,
					movie_description: this.state.movie_description,
					posterIMG: this.state.posterIMG,
					featureIMG: this.state.featureIMG,
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
				title: "Updated!",
				text: `${this.state.movie_title} data has been updated.`,
				showConfirmButton: false,
				timer: 3000,
			});
			window.location.reload();
			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	getBase64 = (file) => {
		return new Promise((resolve) => {
			let fileInfo;
			let baseURL = "";

			let reader = new FileReader();
			reader.readAsDataURL(file);

			reader.onload = () => {
				console.log("Called", reader);
				baseURL = reader.result;
				resolve(baseURL);
			};
			console.log(fileInfo);
		});
	};

	handleFileInputChangeposterIMG = (e) => {
		console.log(e.target.files[0]);
		let { file } = this.state;
		file = e.target.files[0];
		this.getBase64(file)
			.then((result) => {
				file["base64"] = result;
				console.log("File Is", file);
				this.setState({
					posterIMG: result,
					file,
				});
			})
			.catch((err) => {
				console.log(err);
			});

		this.setState({
			file: e.target.files[0],
		});
	};

	handleFileInputChangefeatureIMG = (e) => {
		console.log(e.target.files[0]);
		let { file } = this.state;
		file = e.target.files[0];
		this.getBase64(file)
			.then((result) => {
				file["base64"] = result;
				console.log("File Is", file);
				this.setState({
					featureIMG: result,
					file,
				});
			})
			.catch((err) => {
				console.log(err);
			});

		this.setState({
			file: e.target.files[0],
		});
	};

	formatDuration = (seconds) => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		return `${hours} hours ${minutes} minutes`;
	};

	render() {
		const {
			movie_title,
			genre,
			duration,
			release_date,
			cast,
			director,
			movie_description,
			posterIMG,
			featureIMG,
		} = this.state;

		const { setIsEditing } = this.props;

		return (
			<div className="userManagerPage--small-container">
				<form onSubmit={this.handleUpdate} className="userManagerPage--form">
					<h1>Update movie</h1>
					<label htmlFor="movie_title">Movie</label>
					<input
						id="movie_title"
						type="text"
						name="movie_title"
						value={movie_title}
						onChange={(event) =>
							this.setState({ movie_title: event.target.value })
						}
						disabled
					/>
					<label htmlFor="genre">Genre</label>
					<input
						id="genre"
						type="text"
						name="genre"
						value={genre}
						onChange={(event) => this.setState({ genre: event.target.value })}
					/>
					<label htmlFor="duration">Duration</label>
					<input
						id="duration"
						type="text"
						name="duration"
						value={duration}
						onChange={(event) =>
							this.setState({ duration: event.target.value })
						}
					/>

					<label htmlFor="release_date">Release Date</label>
					<input
						id="release_date"
						type="date"
						name="release_date"
						value={release_date}
						onChange={(event) =>
							this.setState({ release_date: event.target.value })
						}
					/>
					<label htmlFor="cast">Cast</label>
					<input
						id="cast"
						type="text"
						name="cast"
						value={cast}
						onChange={(event) => this.setState({ cast: event.target.value })}
					/>
					<label htmlFor="director">Director</label>
					<input
						id="director"
						type="text"
						name="director"
						value={director}
						onChange={(event) =>
							this.setState({ director: event.target.value })
						}
					/>
					<label htmlFor="movie_description">Movie Description</label>
					<textarea
						id="movie_description"
						type="text"
						name="movie_description"
						value={movie_description}
						rows="3"
						cols="30"
						onChange={(event) =>
							this.setState({ movie_description: event.target.value })
						}
					/>
					<label htmlFor="posterIMG">posterIMG</label>
					<div>
						<input
							id="convertion"
							type="file"
							name="convertion"
							onChange={this.handleFileInputChangeposterIMG}
						/>
					</div>
					<textarea
						id="posterIMG"
						type="text"
						ref={this.textInput}
						name="posterIMG"
						value={posterIMG}
						rows="2"
						cols="50"
						onChange={(event) =>
							this.setState({ posterIMG: event.target.value })
						}
					/>
					<label htmlFor="featureIMG">featureIMG</label>
					<div>
						<input
							id="convertion"
							type="file"
							name="convertion"
							onChange={this.handleFileInputChangefeatureIMG}
						/>
					</div>
					<textarea
						id="featureIMG"
						type="text"
						ref={this.textInput}
						name="featureIMG"
						value={featureIMG}
						rows="2"
						cols="50"
						onChange={(event) =>
							this.setState({ featureIMG: event.target.value })
						}
					/>
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

export default MovieEditPage;
