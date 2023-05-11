import React, { Component } from 'react';
import axios from 'axios';
import './UserAdminViewAccPage.css';

class UserAdminViewAccPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: []
    };
  }

  componentDidMount() {
    axios.get('https://csit-314-cinema-booking-system.vercel.app/')
      .then(response => {
        const accounts = response.data;
        this.setState({ accounts });
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }

  render() {
    const { accounts } = this.state;

    return (
      <div>
        <h1 className="useradminViewAcc--title">User Admin: View Accounts</h1>
        <div className="useradminViewAcc--tableContainer">
          <table className="useradminViewAcc--table">
            <thead>
              <tr>
                <th className="useradminViewAcc--usernameHead">Username</th>
                <th className="useradminViewAcc--emailHead">Email</th>
                <th className="useradminViewAcc--roleHead">Role</th>
                <th className="useradminViewAcc--activeHead">Active</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map(account => (
                <tr key={account.id}>
                  <td>{account.username}</td>
                  <td>{account.email}</td>
                  <td>{account.role}</td>
                  <td>{account.is_active ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default UserAdminViewAccPage;
