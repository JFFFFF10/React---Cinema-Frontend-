import HomePage from "./BsianHomePage/HomePage/HomePage";
import LoginPage from "./LogPage/LoginForm/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//User Admin
import UserAdminPage from "./UserAdminPage/UserAdminPage";
import UserAdminViewAccPage from "./UserAdminPage/UserAdminViewAccPage";
import UserAdminSearchAccPage from "./UserAdminPage/UserAdminSearchAccPage";
import UserAdminAddAccPage from "./UserAdminPage/UserAdminAddAccPage";
import UserAdminViewPrfPage from "./UserAdminPage/UserAdminViewPrfPage";
import UserAdminSearchPrfPage from "./UserAdminPage/UserAdminSearchPrfPage";
import UserAdminAddPrfPage from "./UserAdminPage/UserAdminAddPrfPage";

//Cinema Manager
import MovieInfoPage from "./CinemaManagerPage/managerSystem/movieInfo";
import CinemaRoomPage from "./CinemaManagerPage/managerSystem/cinemaRoom";
import FNBPage from "./CinemaManagerPage/managerSystem/fnb"
import MovieSessionInfoPage from "./CinemaManagerPage/managerSystem/movieSession"

//Customer
import UserFNB from "./BsianHomePage/UserMenu/UserFNB";
import UserMovieBooking from "./BsianHomePage/UserMenu/UserMovieBooking";

//Movies
import MoviesPage from "./BsianHomePage/MoviesPage/MoviesPage";
import SinglePage from "./BsianHomePage/components/watch/SinglePage";
import MovieSessionPageWrapper from "./BsianHomePage/MovieSessionPage/MovieSessionPage";
import MovieDetailPageWrapper from "./BsianHomePage/MovieDetailPage/MovieDetailPage";
import BookingPage from "./BsianHomePage/MovieSessionPage/BookingPage";


function App() {
	return (
		<Router>
			<Routes>
				<Route path="/login" element={<AuthPage />} />
				<Route path="/" element={<HomePage />} />

				<Route path="/UserAdminPage" element={<UserAdminPage />} />
				<Route path="/UserAdminPage/ua-view-account" element={<UserAdminViewAccPage />} />
				<Route path="/UserAdminPage/ua-view-profile" element={<UserAdminViewPrfPage />} />
				<Route path="/UserAdminPage/ua-search-account" element={<UserAdminSearchAccPage />} />
				<Route path="/UserAdminPage/ua-search-profile" element={<UserAdminSearchPrfPage />} />
				<Route path="/UserAdminPage/ua-add-account" element={<UserAdminAddAccPage />} />
				<Route path="/UserAdminPage/ua-add-profile" element={<UserAdminAddPrfPage />} />

				<Route path="/MoviesPage" element={<MoviesPage />} />
				<Route path="/MovieInfoPage" element={<MovieInfoPage />} />
				<Route path="/CinemaRoomPage" element={<CinemaRoomPage />} />
				<Route path="/FNBPage" element={<FNBPage />} />
				<Route path="/MovieSessionInfoPage" element={<MovieSessionInfoPage />} />

				<Route path="/UserFNB" element={<UserFNB />} />
				<Route path="/UserMovieBooking" element={<UserMovieBooking />} />

				<Route path="/movie/:id" element={<SinglePage />} />
				<Route path="/movie-detail/:movie_title" element={<MovieDetailPageWrapper />} />
				<Route path="/movie-sessions/:movie_title" element={<MovieSessionPageWrapper />} />
				<Route path="/booking/:sessionId" element={<BookingPage />} />
			</Routes>
		</Router>
	);
}

export default App;