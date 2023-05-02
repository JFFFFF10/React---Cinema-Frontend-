import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import React from "react";
import "./managerPage.css";
import "./userManagerPage.css";

function ManagerPage() {
	return (
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
	);
}

export default ManagerPage;
