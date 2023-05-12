import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./UserAdminPage.css"
import Header from '../BsianHomePage/components/header/Header';

class UserAdminPage extends Component {
  render() {
    return (
		<>
			<Header/>
			<div>
				<h1 className='useradminPage--title'>User Admin Page</h1>

				<div className='useradminPage--btnContainer'>
					<Link to="/UserAdminPage/ua-view-account">
						<button type="button" className="useradminPage--btn">View Account</button>
					</Link>

					<Link to="/UserAdminPage/ua-view-profile">
						<button type="button" className="useradminPage--btn">View Profile</button>
					</Link>

					<Link to="/UserAdminPage/ua-search-account">
						<button type="button" className="useradminPage--btn">Search Account</button>
					</Link>

					<Link to="/UserAdminPage/ua-search-profile">
						<button type="button" className="useradminPage--btn">Search Profile</button>
					</Link>

					<Link to="/UserAdminPage/ua-add-account">
						<button type="button" className="useradminPage--btn">Add Account</button>
					</Link>

					<Link to="/UserAdminPage/ua-add-profile">
						<button type="button" className="useradminPage--btn">Add Profile</button>
					</Link>

					<Link to="/UserAdminPage/ua-search-account">
						<button type="button" className="useradminPage--btn">Update Account</button>
					</Link>

					<Link to="/UserAdminPage/ua-search-profile">
						<button type="button" className="useradminPage--btn">Update Profile</button>
					</Link>

					<Link to="/UserAdminPage/ua-search-account">
						<button type="button" className="useradminPage--btn">Delete Account</button>
					</Link>

					<Link to="/UserAdminPage/ua-search-profile">
						<button type="button" className="useradminPage--btn">Delete Profile</button>
					</Link>
				</div>
			</div>
		</>
    );
  }
}

export default UserAdminPage;
