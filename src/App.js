import HomePage from "./BsianHomePage/HomePage/HomePage";
import AuthPage from "./LogPage/LoginForm/LoginPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserAdminPage from "./UserAdminPage/UserAdminPage";
import MoviesPage from "./BsianHomePage/MoviesPage/MoviesPage";
import MovieInfo from './CinemaManagerPage/managerSystem/movieInfo';
import RoomBooking from "./CinemaManagerPage/managerSystem/roomBooking";
import SinglePage from "./BsianHomePage/components/watch/SinglePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/UserAdminPage" element={<UserAdminPage />} />
        <Route path="/MoviesPage" element={<MoviesPage />} />
        <Route path="/MovieInfo" element={<MovieInfo />} />
        <Route path="/RoomBooking" element={<RoomBooking />} />
        <Route path="/movie/:id" element={<SinglePage />} />
      </Routes>
    </Router>
  );
}

export default App;