import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnalyticsTab({ data }) {
  const {
    score,
    totalQuestions,
    correctAnswers,
    wrongAnswers,
    improvementTips,
    incorrectQuestions,
    topicStats,
  } = data;

  const accuracy = ((correctAnswers / totalQuestions) * 100).toFixed(1);

  const highest = topicStats.reduce((a, b) => (a.score > b.score ? a : b));
  const lowest = topicStats.reduce((a, b) => (a.score < b.score ? a : b));

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      if (current >= score) {
        clearInterval(interval);
      } else {
        current++;
        setProgress(current);
      }
    }, 15);
    return () => clearInterval(interval);
  }, [score]);

  return (
    <div className="p-8 space-y-8 bg-linkedin-card text-linkedin-text rounded-2xl shadow-xl">
      {/* Header */}
      <div className="text-center space-y-1">
        <h1 className="text-4xl font-bold">📊 Interview Result</h1>
        <p className="text-linkedin-secondary text-sm">
          Here's a breakdown of your performance and areas to work on.
        </p>
      </div>

      {/* Overview Section */}
      <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
        {/* Progress Circle */}
        <div className="w-40">
          <CircularProgressbar
            value={progress}
            text={`${progress}%`}
            styles={buildStyles({
              pathColor:
                progress > 70
                  ? "#00A0DC"
                  : progress > 40
                  ? "#F4A261"
                  : "#E76F51",
              textColor: "#00A0DC",
              trailColor: "#E6F2F8",
              textSize: "20px",
            })}
          />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 w-full max-w-md">
          {[
            { label: "Total Questions", value: totalQuestions },
            { label: "Correct", value: correctAnswers },
            { label: "Wrong", value: wrongAnswers },
            { label: "Accuracy", value: `${accuracy}%` },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-linkedin-bg p-4 rounded-xl border border-linkedin-border shadow-md"
            >
              <p className="text-2xl font-bold text-linkedin-text">
                {item.value}
              </p>
              <p className="text-linkedin-secondary text-sm">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: "🏆 Best Topic", data: highest },
          { title: "⚠️ Needs Work", data: lowest },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-linkedin-bg p-4 rounded-xl border border-linkedin-border"
          >
            <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
            <p className="text-linkedin-secondary">
              {item.data.subject} –{" "}
              <span className="font-medium text-linkedin-text">
                {item.data.score}%
              </span>
            </p>
          </div>
        ))}
      </div>

      {/* Improvement Tips */}
      <div className="bg-linkedin-bg p-6 rounded-xl border border-linkedin-border">
        <h2 className="text-xl font-semibold mb-2">🧠 Tips to Improve</h2>
        <ul className="list-disc list-inside space-y-1 text-linkedin-secondary text-sm">
          {improvementTips.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </div>

      {/* Incorrect Questions */}
      <div className="bg-linkedin-bg p-6 rounded-xl border border-linkedin-border space-y-4">
        <h2 className="text-xl font-semibold">❌ Review Incorrect Answers</h2>
        {incorrectQuestions.map((item, i) => (
          <div
            key={i}
            className="border border-linkedin-border p-3 rounded-md hover:shadow transition-all bg-white/5"
          >
            <p>
              <strong>Q:</strong> {item.question}
            </p>
            <p className="text-red-500">
              <strong>Your Answer:</strong> {item.yourAnswer}
            </p>
            <p className="text-green-500">
              <strong>Correct Answer:</strong> {item.correctAnswer}
            </p>
            <p className="text-linkedin-secondary text-sm">
              <strong>Explanation:</strong> {item.explanation}
            </p>
          </div>
        ))}
      </div>

      {/* Radar Chart */}
      <div className="bg-linkedin-bg p-6 rounded-xl border border-linkedin-border">
        <h2 className="text-xl font-semibold mb-4">
          📚 Topic-wise Performance
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={topicStats} outerRadius={90} cx="50%" cy="50%">
            <PolarGrid stroke="#DCE6F1" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: "#E6F2F8" }} />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={false}
              axisLine={false}
            />
            <Radar
              name="Score"
              dataKey="score"
              stroke="#00A0DC"
              fill="#00A0DC"
              fillOpacity={0.5}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
