// In your App.jsx or page file
import AnalyticsTab from "../components/JobLens/Analytics.jsx";
import Login from "../components/Authentication/Login.jsx";
import Signup from "../components/Authentication/Signup.jsx";
import LoginForm from "../components/JobLens/LoginForm.jsx";
import JobHome from "../components/JobLens/JobHome.jsx";
import CompanyInterview from "../components/JobLens/CompanyBasedInterview.jsx";
import ProfileInterview from "../components/JobLens/ProfileBasedInterview.jsx";
import Hero from "../components/Main/Hero.jsx";
import Roadmap from "../components/JobLens/RoadMap.jsx";

export default function App() {
  return (
    <>
      {/* <Hero />
      <Signup />
      <Login />
      <JobHome />
      <CompanyInterview />
      <ProfileInterview />
      <LoginForm /> */}
      <Roadmap />
    </>
  );
}
