import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "../components/Main/Hero.jsx";
import Login from "../components/Authentication/Login.jsx";
import Signup from "../components/Authentication/Signup.jsx";
import Profile from "../components/JobLens/LoginForm.jsx";
import Roadmap from "../components/JobLens/RoadMap.jsx";
import JobHome from "../components/JobLens/JobHome.jsx";
import ProfileInterview from "../components/JobLens/ProfileBasedInterview.jsx";
import CompanyInterview from "../components/JobLens/CompanyBasedInterview.jsx";

export default function App() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/jobhome" element={<JobHome />} />
            <Route path="/profileinterview" element={<ProfileInterview />} />
            <Route path="/companyinterview" element={<CompanyInterview />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}
