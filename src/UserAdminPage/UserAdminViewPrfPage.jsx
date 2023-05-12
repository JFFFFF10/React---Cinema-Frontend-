import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import './UserAdminViewPrfPage.css';

class UserAdminViewPrfPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: []
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");

    axios.get('https://csit-314-cinema-booking-system.vercel.app/viewProfile/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
      })
      .then(response => {
        const profiles = response.data;
        this.setState({ profiles });
      })
      .catch(error => {
        console.error('There was an error!', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      });
  }

  render() {
    const { profiles } = this.state;

    return (
      <div>
        <h1 className="useradminViewPrf--title">User Admin: View Profiles</h1>
        <div className="useradminViewPrf--tableContainer">
          <table className="useradminViewPrf--table">
            <thead>
              <tr>
                <th className="useradminViewPrf--usernameHead">Username</th>
                <th className="useradminViewPrf--nameHead">Name</th>
                <th className="useradminViewPrf--dobHead">Date of Birth</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map(profile => (
                <tr key={profile.id}>
                  <td>{profile.username}</td>
                  <td>{profile.name}</td>
                  <td>{profile.date_of_birth}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default UserAdminViewPrfPage;
