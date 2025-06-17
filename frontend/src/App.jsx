// In your App.jsx or page file
import AnalyticsTab from "../components/JobLens/Analytics.jsx";
import Login from "../components/Authentication/Login.jsx";
import Signup from "../components/Authentication/Signup.jsx";
import Profile from "../components/JobLens/LoginForm.jsx";

import JobHome from "../components/JobLens/ProfileBasedInterview.jsx";
import CompanyInterview from "../components/JobLens/CompanyBasedInterview.jsx";



export default function App() {
  return (
    <>
    {/* <AnalyticsTab /> */}
    {/* <Signup /> */}
    <Login />
    {/* <Profile /> */}
    {/* <Interview /> */}
    {/* <JobHome /> */}
    <CompanyInterview/>
    </>
  );
}
