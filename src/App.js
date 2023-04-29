import "./BsianHomePage/App.css";
import HomePage from "./BsianHomePage/home/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SinglePage from "./BsianHomePage/components/watch/SinglePage";
import Header from "./BsianHomePage/components/header/Header";
import Footer from "./BsianHomePage/components/footer/Footer";

function App() {
	return (
		<>
			<Router>
				<Header />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/singlepage/:id" element={<SinglePage />} />
				</Routes>
				<Footer />
			</Router>
		</>
	);
}

export default App;
