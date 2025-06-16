// In your App.jsx or page file
import AnalyticsTab from "../components/JobLens/Analytics.jsx";
import Login from "../components/Authentication/Login.jsx";
import Signup from "../components/Authentication/Signup.jsx";
import Profile from "../components/JobLens/LoginForm.jsx"
const yourDataObject = {
  score: 72,
  totalQuestions: 20,
  correctAnswers: 14,
  wrongAnswers: 6,
  improvementTips: [
    "Revise API integration basics.",
    "Practice more React state management questions.",
  ],
  incorrectQuestions: [
    {
      question: "What is JSX?",
      yourAnswer: "JavaScript XML Parser",
      correctAnswer: "JavaScript XML",
      explanation:
        "JSX is a syntax extension that looks similar to XML or HTML.",
    },
    // add more if needed
  ],
  topicStats: [
    { subject: "HTML", score: 85 },
    { subject: "CSS", score: 75 },
    { subject: "JavaScript", score: 60 },
    { subject: "React", score: 50 },
    { subject: "APIs", score: 40 },
  ],
};

export default function Page() {
  return (
    <>
    {/* <AnalyticsTab data={yourDataObject} /> */}
    
    <Signup />
    <Login />
    <Profile />
    </>
  );
}
