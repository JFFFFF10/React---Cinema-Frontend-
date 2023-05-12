import React, { Component } from "react";
import axios from "axios";

import Header from "./Header";
import FNBList from "./fnbList";
import FNBAdd from "./fnbAdd";
import FNBEdit from "./fnbEdit";

class FNBInfo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			fnbs: [],
			selectedfnb: null,
			isAdding: false,
			isEditing: false,
		};
		this.handleEdit = this.handleEdit.bind(this);
		this.setIsAdding = this.setIsAdding.bind(this);
		this.setIsEditing = this.setIsEditing.bind(this);
		this.setfnbs = this.setfnbs.bind(this);
	}

	componentDidMount() {
		axios
			.get("https://csit-314-cinema-booking-system.vercel.app/viewAllFnb/")
			.then((response) => {
				this.setState({
					fnbs: response.data,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	handleEdit(fnb) {
		this.setState({
			selectedfnb: fnb,
			isEditing: true,
		});
	}

	setIsAdding(isAdding) {
		this.setState({ isAdding });
	}

	setIsEditing(isEditing) {
		this.setState({ isEditing });
	}

	setfnbs(fnbs) {
		this.setState({ fnbs });
	}

	render() {
		const { fnbs, selectedfnb, isAdding, isEditing } = this.state;

		return (
			<div className="userManagerPage--container">
				{/* List */}
				{!isAdding && !isEditing && (
					<>
						<Header setIsAdding={this.setIsAdding} />
						<FNBList
							fnbs={fnbs}
							handleEdit={this.handleEdit}
							handleDelete={this.handleDelete}
						/>
					</>
				)}
				{/* Add */}
				{isAdding && (
					<FNBAdd
						fnbs={fnbs}
						setfnbs={this.setfnbs}
						setIsAdding={this.setIsAdding}
					/>
				)}
				{/* Edit */}
				{isEditing && (
					<FNBEdit
						fnbs={fnbs}
						selectedfnb={selectedfnb}
						setfnbs={this.setfnbs}
						setIsEditing={this.setIsEditing}
					/>
				)}
			</div>
		);
	}
}

export default FNBInfo;
