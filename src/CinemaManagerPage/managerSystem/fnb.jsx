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
			fnbinfos: [],
			selectedfnbinfo: null,
			isAdding: false,
			isEditing: false,
		};
		this.handleEdit = this.handleEdit.bind(this);
		this.setIsAdding = this.setIsAdding.bind(this);
		this.setIsEditing = this.setIsEditing.bind(this);
		this.setfnbinfos = this.setfnbinfos.bind(this);
	}

	componentDidMount() {
		axios
			.get("https://csit-314-cinema-booking-system.vercel.app/viewAllFnb/")
			.then((response) => {
				this.setState({
					fnbinfos: response.data,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	handleEdit(fnb) {
		this.setState({
			selectedfnbinfo: fnb,
			isEditing: true,
		});
	}

	setIsAdding(isAdding) {
		this.setState({ isAdding });
	}

	setIsEditing(isEditing) {
		this.setState({ isEditing });
	}

	setfnbinfos(fnbinfos) {
		this.setState({ fnbinfos });
	}

	render() {
		const { fnbinfos, selectedfnbinfo, isAdding, isEditing } = this.state;

		return (
			<div className="userManagerPage--container">
				{/* List */}
				{!isAdding && !isEditing && (
					<>
						<Header setIsAdding={this.setIsAdding} />
						<FNBList
							fnbinfos={fnbinfos}
							handleEdit={this.handleEdit}
							handleDelete={this.handleDelete}
						/>
					</>
				)}
				{/* Add */}
				{isAdding && (
					<FNBAdd
						fnbinfos={fnbinfos}
						setfnbinfos={this.setfnbinfos}
						setIsAdding={this.setIsAdding}
					/>
				)}
				{/* Edit */}
				{isEditing && (
					<FNBEdit
						fnbinfos={fnbinfos}
						selectedfnbinfo={selectedfnbinfo}
						setfnbinfos={this.setfnbinfos}
						setIsEditing={this.setIsEditing}
					/>
				)}
			</div>
		);
	}
}

export default FNBInfo;
