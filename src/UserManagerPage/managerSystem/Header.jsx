import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./managerPage.css";
import "./userManagerPage.css";

class Header extends Component {
	render() {
		const { setIsAdding } = this.props;
		return (
			<header>
				<h1>Cinema Manager System</h1>
				<div style={{ marginTop: "30px", marginBottom: "18px" }}>
					<button onClick={() => setIsAdding(true)} className="round-button">
						Add
					</button>
				</div>
				<div>
					<nav className="userManager-nav">
						<ul>
							<li>
								<Link to="/MovieInfo">MovieInfo</Link>
							</li>
							<li>
								<Link to="/RoomBooking">RoomBooking</Link>
							</li>
						</ul>
					</nav>
				</div>
			</header>
		);
	}
}

export default Header;
