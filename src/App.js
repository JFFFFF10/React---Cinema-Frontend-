import "./BsianHomePage/App.css";
import HomePage from "./BsianHomePage/home/HomePage";
import AuthPage from "./Components/LoginForm/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
