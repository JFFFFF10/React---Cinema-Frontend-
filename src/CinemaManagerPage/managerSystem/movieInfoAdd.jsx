import React, { Component } from "react";
import Swal from "sweetalert2";
import axios from "axios";

class MovieAddPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movie_title: "",
			genre: "",
			duration: "",
			release_date: "",
			cast: "",
			director: "",
			movie_description: "",
			posterIMG: "",
			featureIMG: "",
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
		this.props.setIsAdding(false);
	};

	getBase64 = (file) => {
		return new Promise((resolve) => {
			let fileInfo;
			let baseURL = "";

			let reader = new FileReader();
			reader.readAsDataURL(file);

			reader.onload = () => {
				// Make a fileInfo Object
				console.log("Called", reader);
				baseURL = reader.result;
				//console.log(baseURL);
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

	handleAdd = async (e) => {
		const token = localStorage.getItem("token");

		e.preventDefault();
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

		if (
			!movie_title ||
			!genre ||
			!duration ||
			!release_date ||
			!cast ||
			!director ||
			!movie_description ||
			!posterIMG ||
			!featureIMG
		) {
			return Swal.fire({
				icon: "error",
				title: "Error!",
				text: "All fields are required.",
				showConfirmButton: true,
			});
		}

		try {
			const response = await axios.post(
				"https://csit-314-cinema-booking-system.vercel.app/addMov/",
				{
					movie_title: movie_title,
					genre: genre,
					duration: duration,
					release_date: release_date,
					cast: cast,
					director: director,
					movie_description: movie_description,
					posterIMG: posterIMG,
					featureIMG: featureIMG,
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
				text: `Movie data has been Added.`,
				showConfirmButton: false,
				timer: 3000,
			});
			

			this.setState({
				movie_title: "",
				genre: "",
				duration: "",
				release_date: "",
				cast: "",
				director: "",
				movie_description: "",
				posterIMG: "",
				featureIMG: "",
			});
			if (response.status === 200) {
				console.log("Movie added successfully.");
			}
		} catch (error) {
			console.log(error);
		}
		window.location.reload();
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

		return (
			<div className="userManagerPage--small-container">
				<form onSubmit={this.handleAdd} className="userManagerPage--form">
					<h1>Add Movie</h1>
					<label htmlFor="movie_title">New Movie</label>
					<input
						id="movie_title"
						type="text"
						ref={this.textInput}
						name="movie_title"
						value={movie_title}
						onChange={this.handleInputChange}
					/>
					<label htmlFor="genre">Genre</label>
					<input
						id="genre"
						type="text"
						ref={this.textInput}
						name="genre"
						value={genre}
						onChange={this.handleInputChange}
					/>
					<label htmlFor="duration">Duration</label>
					<input
						id="duration"
						type="text"
						ref={this.textInput}
						name="duration"
						value={duration}
						onChange={this.handleInputChange}
					/>
					<label htmlFor="release_date">Release Date</label>
					<input
						id="release_date"
						type="date"
						ref={this.textInput}
						name="release_date"
						value={release_date}
						onChange={this.handleInputChange}
					/>
					<label htmlFor="cast">Cast</label>
					<input
						id="cast"
						type="text"
						ref={this.textInput}
						name="cast"
						value={cast}
						onChange={this.handleInputChange}
					/>
					<label htmlFor="director">Director</label>
					<input
						id="director"
						type="text"
						ref={this.textInput}
						name="director"
						value={director}
						onChange={this.handleInputChange}
					/>
					<label htmlFor="movie_description">Movie Description</label>
					<textarea
						id="movie_description"
						type="text"
						ref={this.textInput}
						name="movie_description"
						value={movie_description}
						rows="2"
						cols="50"
						onChange={this.handleInputChange}
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
						onChange={this.handleInputChange}
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
						onChange={this.handleInputChange}
					/>
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
export default MovieAddPage;
