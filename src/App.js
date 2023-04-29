import "./BsianHomePage/App.css";
import HomePage from "./BsianHomePage/home/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SinglePage from "./BsianHomePage/components/watch/SinglePage";
import LoginPage from "./Components/LoginForm/LoginPage";
import UserAdminPage from "./UserAdmin/UserAdminPage";

function App() {
	return (
		<>
			<Router>

				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/singlepage/:id" element={<SinglePage />} />
					<Route path="/Login" element={<LoginPage />} />
					{/* <Route path="/UserAdminPage" element={<UserAdminPage />} /> */}
				</Routes>

			</Router>
		</>
	);
}

export default App;
