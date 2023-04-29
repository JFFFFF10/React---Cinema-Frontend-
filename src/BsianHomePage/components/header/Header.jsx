import React, { useState } from "react";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { NavLink, Link } from "react-router-dom";

const Header = () => {
	const [Mobile, setMobile] = useState(false);
	return (
		<>
			<header>
				<div className="container flexSB">
					<nav className="flexSB">
						<div className="logo">
							<img src="./images/logo.png" alt="" />
						</div>
						{/*<ul className='flexSB'>*/}
						<ul
							className={Mobile ? "navMenu-list" : "flexSB"}
							onClick={() => setMobile(false)}
						>
							<li>
								<a href="/">Home</a>
							</li>
							<li>
								<a href="/">About</a>
							</li>
						</ul>
						<button className="toggle" onClick={() => setMobile(!Mobile)}>
							{Mobile ? (
								<i className="fa fa-times"></i>
							) : (
								<i className="fa fa-bars"></i>
							)}
						</button>
					</nav>
					<div className="account flexSB">
						<FontAwesomeIcon icon={faSearch} />
						<FontAwesomeIcon icon={faUser} />
						<button className="logInButton">
						<Link to="/Login">Log In</Link>
						</button>
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
