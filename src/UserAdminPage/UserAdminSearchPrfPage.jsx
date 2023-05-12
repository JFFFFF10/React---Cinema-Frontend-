import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './UserAdminSearchPrfPage.css';
import UserAdminUpPrfPopup from './popup/UserAdminUpPrfPopup';
import UserAdminDelPrfPopup from './popup/UserAdminDelPrfPopup';

class UserAdminSearchPrfPage extends Component {
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
      .post('https://csit-314-cinema-booking-system.vercel.app/searchProfile/', requestBody, {
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
        <div className="useradminSearchPrf--container">
          <h1 className="useradminSearchPrf--title">User Admin: Search/ Update/ Delete Profiles</h1>
          <div className="useradminSearchPrf--inputContainer">
            <input
              className="useradminSearchPrf--input"
              type="text"
              value={searchQuery}
              onChange={this.handleInputChange}
              placeholder="Enter search query"
            />
            <button className="useradminSearchPrf--button" onClick={this.handleSearch}>
              Search
            </button>
          </div>
          <div className="useradminSearchPrf--results">
            <h2 className="useradminSearchPrf--resultsTitle">
              Here are the search results:
            </h2>
            {searchResults.length > 0 ? (
              <div className="useradminSearchPrf--tableContainer">
                  <table className="useradminSearchPrf--table">
                    <thead>
                        <tr>
                          <th>Username</th>
                          <th>Name</th>
                          <th>D.O.B</th>
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
                            <td>{result.name}</td>
                            <td>{result.date_of_birth}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
              </div>
            ) : (
              <p>No results found.</p>
            )}
          </div>
          {isPopupUpOpen && (
            <UserAdminUpPrfPopup
              selectedUser={selectedUser}
              onClose={this.handleClosePopupUp}
              open={isPopupUpOpen}
            />
          )}
          {isPopupDelOpen && (
            <UserAdminDelPrfPopup
              selectedUser={selectedUser}
              onClose={this.handleClosePopupDel}
              open={isPopupDelOpen}
            />
          )}
          {this.state.showContextMenu && (
            <div
              className="useradminSearchPrf--contextMenu"
              style={{
                position: 'absolute',
                zIndex: '1',
                top: `${this.state.contextMenuCoordinates.y}px`,
                left: `${this.state.contextMenuCoordinates.x}px`,
              }}
            >
              <button onClick={this.handleOpenPopupUp} className='useradminSearchPrf--updatebtn'>Update Profile</button>
              <button onClick={this.handleOpenPopupDel} className='useradminSearchPrf--deletebtn'>Delete Profile</button>
            </div>
          )}
        </div>
      );
    }
  }
  
  export default UserAdminSearchPrfPage;
  