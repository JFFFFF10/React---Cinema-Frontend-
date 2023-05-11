import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './UserAdminSearchAccPage.css';
import UserAdminUpAccPopup from './popup/UserAdminUpAccPopup';
import UAPopup from './popup/UAPopup';

class UserAdminSearchAccPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      searchResults: [],
      selectedUser: null,
      isPopupUpOpen: false,
      isPopupDelOpen: false,
      contextMenuCoordinates: { x: 0, y: 0 },
      showContextMenu: false,
    };
  }

  handleInputChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleSearch = () => {
    const { searchQuery } = this.state;
    if (searchQuery === '') {
      Swal.fire('Error', 'Please enter a search query', 'error');
      return;
    }

    const token = localStorage.getItem('token'); // Retrieve the token from localStorage

    // Create the request body
    const requestBody = {
      keyword: searchQuery,
    };

    // Send the search query to the API using axios with the Authorization header
    axios
      .post('https://csit-314-cinema-booking-system.vercel.app/searchUser/', requestBody, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        const searchResults = response.data;
        this.setState({ searchResults });
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };

  handleContextMenu = (event, result) => {
    event.preventDefault();
    this.setState({
      contextMenuCoordinates: { x: event.clientX, y: event.clientY },
      selectedUser: result,
      showContextMenu: true
    });
  };

  hideContextMenu = () => {
    this.setState({
      showContextMenu: false,
    });
  };
  componentDidMount() {
    document.addEventListener('click', this.hideContextMenu);
  }
  
  componentWillUnmount() {
    document.removeEventListener('click', this.hideContextMenu);
  }
  

  handleOpenPopupUp = () => {
    this.setState({ isPopupUpOpen: true });
  };

  handleClosePopupUp = () => {
    this.setState({ isPopupUpOpen: false });
  };

  handleOpenPopupDel = () => {
    this.setState({ isPopupDelOpen: true });
  };

  handleClosePopupDel = () => {
    this.setState({ isPopupDelOpen: false });
  };

  //it shows that 'contextMenuCoordinates' is assigned a value but never used, however, dont delete!!!
  render() {
    const { searchQuery, searchResults, selectedUser, isPopupUpOpen, isPopupDelOpen, contextMenuCoordinates } = this.state;

    return (
      <div className="useradminSearchAcc--container">
        <h1 className="useradminSearchAcc--title">User Admin: Search/ Update/ Delete Accounts</h1>
        <div className="useradminSearchAcc--inputContainer">
          <input
            className="useradminSearchAcc--input"
            type="text"
            value={searchQuery}
            onChange={this.handleInputChange}
            placeholder="Enter search query"
          />
          <button className="useradminSearchAcc--button" onClick={this.handleSearch}>
            Search
          </button>
        </div>
        <div className="useradminSearchAcc--results">
          <h2 className="useradminSearchAcc--resultsTitle">
            Here are the search results:
          </h2>
          {searchResults.length > 0 ? (
            <table className="useradminSearchAcc--table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Active</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((result) => (
                  <tr
                    key={result.id}
                    onContextMenu={(e) => {
                      this.handleContextMenu(e, result);
                    }}
                  >
                    <td>{result.username}</td>
                    <td>{result.email}</td>
                    <td>{result.role}</td>
                    <td>{result.is_active ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No results found.</p>
          )}
        </div>
        {isPopupUpOpen && (
          <UserAdminUpAccPopup
            selectedUser={selectedUser}
            onClose={this.handleClosePopupUp}
            open={isPopupUpOpen}
          />
        )}
        {isPopupDelOpen && (
          <UAPopup
            selectedUser={selectedUser}
            onClose={this.handleClosePopupDel}
            open={isPopupDelOpen}
          />
        )}
        {this.state.showContextMenu && (
          <div
            className="useradminSearchAcc--contextMenu"
            style={{
              position: 'absolute',
              zIndex: '1',
              top: `${this.state.contextMenuCoordinates.y}px`,
              left: `${this.state.contextMenuCoordinates.x}px`,
            }}
          >
            <button onClick={this.handleOpenPopupUp} className='useradminSearchAcc--updatebtn'>Update Account</button>
            <button onClick={this.handleOpenPopupDel} className='useradminSearchAcc--deletebtn'>Delete Account</button>
          </div>
        )}
      </div>
    );
  }
}

export default UserAdminSearchAccPage;
