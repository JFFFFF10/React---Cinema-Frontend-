import HomePage from "./BsianHomePage/HomePage/HomePage";
import AuthPage from "./LogPage/LoginForm/LoginPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserAdminPage from "./UserAdminPage/UserAdminPage";
import MovieInfo from './UserManagerPage/managerSystem/movieInfo';
import RoomBooking from "./UserManagerPage/managerSystem/roomBooking";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/UserAdminPage" element={<UserAdminPage />} />
        <Route path="/MovieInfo" element={<MovieInfo />} />
        <Route path="/RoomBooking" element={<RoomBooking />} />
      </Routes>
    </Router>
  );
}

export default App;