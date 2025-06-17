// In your App.jsx or page file
import AnalyticsTab from "../components/JobLens/Analytics.jsx";
import Login from "../components/Authentication/Login.jsx";
import Signup from "../components/Authentication/Signup.jsx";
import Profile from "../components/JobLens/LoginForm.jsx";
// import Interview from "../components/JobLens/Interview.jsx";
import JobHome from "../components/JobLens/ProfileBasedInterview.jsx";


const yourDataObject = {
  score: 68,
  totalQuestions: 20,
  correctAnswers: 13,
  wrongAnswers: 7,
  improvementTips: [
    "Revise the lifecycle methods and hooks in React.",
    "Understand the difference between REST and GraphQL APIs.",
    "Practice real-world form validation using controlled components.",
  ],
  incorrectQuestions: [
    {
      question: "What is JSX?",
      yourAnswer:
        "JSX stands for JavaScript XML Parser and it is used to manipulate the DOM elements directly using vanilla JavaScript.",
      correctAnswer:
        "JSX stands for JavaScript XML and it allows developers to write HTML-like syntax directly in their JavaScript code, which gets transformed into React.createElement calls.",
      explanation:
        "JSX is a syntax extension for JavaScript that looks similar to XML or HTML. It's used with React to describe what the UI should look like. JSX is not mandatory in React, but it makes the code more readable and expressive. Behind the scenes, JSX is transpiled to `React.createElement()` calls which return plain JavaScript objects called React elements.",
    },
    {
      question: "What is the purpose of useEffect in React?",
      yourAnswer:
        "useEffect is used to handle user input and re-render components dynamically when the state changes.",
      correctAnswer:
        "useEffect is used to perform side effects in function components such as fetching data, updating the DOM, or setting up subscriptions.",
      explanation:
        "`useEffect` is a hook in React that allows you to perform side effects in function components. These side effects can include tasks like API calls, manipulating the DOM, subscribing to data streams, and more. It runs after the render and can be configured to re-run only when specific dependencies change. Without it, such side-effect logic would clutter the rendering logic or be impossible to handle cleanly.",
    },
    {
      question: "What is the difference between props and state in React?",
      yourAnswer:
        "Props and state are both used for storing data but props can be changed internally in the component just like state.",
      correctAnswer:
        "Props are read-only and passed down from parent to child, while state is managed within the component and can change over time.",
      explanation:
        "Props (short for properties) are used to pass data from a parent component to a child component. They are immutable in the child component. State, on the other hand, is a local data storage that is managed within the component and can be changed using the `useState` hook. Changing state triggers a re-render of the component. Understanding the distinction is critical to structuring React apps correctly.",
    },
  ],
  topicStats: [
    { subject: "HTML", score: 90 },
    { subject: "CSS", score: 78 },
    { subject: "JavaScript", score: 65 },
    { subject: "React", score: 55 },
    { subject: "APIs", score: 42 },
  ],
};

export default function App() {
  return (
    <>
    {/* <AnalyticsTab /> */}
    {/* <Signup /> */}
    <Login />
    {/* <Profile /> */}
    {/* <Interview /> */}
    <JobHome />
    </>
  );
}
