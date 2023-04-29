import HomePage from "./BsianHomePage/HomePage/HomePage";
import AuthPage from "./LogPage/LoginForm/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserAdminPage from "./UserAdminPage/UserAdminPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/UserAdminPage" element={<UserAdminPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
