import HomePage from "./BsianHomePage/HomePage/HomePage";
import AuthPage from "./LogPage/LoginForm/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//User Admin
import UserAdminPage from "./UserAdminPage/UserAdminPage";
import UserAdminViewAccPage from "./UserAdminPage/UserAdminViewAccPage";
import UserAdminSearchAccPage from "./UserAdminPage/UserAdminSearchAccPage";
import UserAdminAddAccPage from "./UserAdminPage/UserAdminAddAccPage";

//Movies
import MoviesPage from "./BsianHomePage/MoviesPage/MoviesPage";
import MovieInfo from "./CinemaManagerPage/managerSystem/movieInfo";
import CinemaRoom from "./CinemaManagerPage/managerSystem/cinemaRoom";
import SinglePage from "./BsianHomePage/components/watch/SinglePage";
import MovieSessionPage from "./BsianHomePage/MovieSessionPage/MovieSessionPage";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/login" element={<AuthPage />} />
				<Route path="/" element={<HomePage />} />

				<Route path="/UserAdminPage" element={<UserAdminPage />} />
				<Route path="/UserAdminPage/ua-view-account" element={<UserAdminViewAccPage />} />
				<Route path="/UserAdminPage/ua-search-account" element={<UserAdminSearchAccPage />} />
				<Route path="/UserAdminPage/ua-add-account" element={<UserAdminAddAccPage />} />

				<Route path="/MoviesPage" element={<MoviesPage />} />
				<Route path="/MovieInfo" element={<MovieInfo />} />
				<Route path="/CinemaRoom" element={<CinemaRoom />} />
				<Route path="/movie/:id" element={<SinglePage />} />

				<Route
					path="/movie-sessions/:movie_title"
					element={<MovieSessionPage />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
