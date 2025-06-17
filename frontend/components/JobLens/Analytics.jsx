import { useEffect, useState } from "react";
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
import {
  BsQuestionCircle,
  BsCheckCircle,
  BsXCircle,
  BsGraphUp,
  BsStarFill,
  BsTools,
  BsLightbulb,
  BsExclamationTriangle,
  BsBarChartLine,
} from "react-icons/bs";


const data = {
  "score": 15,
  "totalQuestions": 4,
  "correctAnswers": 0,
  "wrongAnswers": 3,
  "improvementTips": [
    "Deep dive into MongoDB concurrency control mechanisms.",
    "Practice coding common data structures and algorithms, especially linked lists.",
    "Review common e-commerce search implementation and optimization strategies.",
    "Make sure you provide answers, even if you are unsure."
  ],
  "incorrectQuestions": [
    {
      "question": "Describe the differences between optimistic and pessimistic locking in MongoDB and when you might choose one over the other.",
      "yourAnswer": "[object Object]",
      "correctAnswer": "Optimistic locking assumes conflicts are rare and allows multiple transactions to proceed without explicit locking. Before committing, it checks if the data has been modified since the transaction started. Pessimistic locking assumes conflicts are common and acquires locks on data before a transaction can access it, preventing other transactions from modifying the data. Choose optimistic locking when conflicts are rare, and performance is critical. Choose pessimistic locking when conflicts are frequent, and data consistency is paramount.",
      "explanation": "Optimistic locking is good for high-read, low-write scenarios, while pessimistic locking is better for scenarios where data integrity is crucial and collisions are frequent. Think about real-world examples to solidify your understanding."
    },
    {
      "question": "You're building a real-time collaborative document editor using React and Node.js with Express, storing document data in MongoDB. Describe how you would implement an efficient mechanism to handle concurrent edits to the same section of a document, minimizing conflicts and ensuring data consistency. Consider the technologies in your skill set (MongoDB, JavaScript, React, Node.js/Express).",
      "yourAnswer": "[object Object]",
      "correctAnswer": "Use operational transformation (OT) or conflict-free replicated data types (CRDTs) to handle concurrent edits. OT transforms operations to maintain consistency, while CRDTs ensure eventual consistency without explicit coordination. On the backend, use MongoDB's atomic operations (e.g., $push, $pull, $set) within a transaction with optimistic locking to apply changes. Use WebSockets for real-time communication between clients and the server. Debounce user input on the frontend to reduce the frequency of updates.",
      "explanation": "This is a complex system design problem. Understanding real-time collaboration strategies like OT/CRDTs is essential. Also, consider database-level features like atomic operations and transactions for handling concurrency safely."
    },
    {
      "question": "Given a singly linked list, describe an algorithm to detect if the list has a cycle. Can you do it with O(1) space complexity?",
      "yourAnswer": "[object Object]",
      "correctAnswer": "Use Floyd's cycle-finding algorithm (also known as the \"tortoise and hare\" algorithm). Have two pointers, one moving one step at a time (tortoise) and the other moving two steps at a time (hare). If there's a cycle, the hare will eventually meet the tortoise. If the hare reaches the end of the list (null), there's no cycle.",
      "explanation": "Floyd's algorithm is the standard solution for cycle detection in linked lists with O(1) space complexity. Make sure you can explain the algorithm and its time complexity."
    }
  ],
  "topicStats": [
    {
      "subject": "MongoDB",
      "score": 0
    },
    {
      "subject": "Data Structures (Linked Lists)",
      "score": 0
    },
    {
      "subject": "System Design",
      "score": 0
    },
    {
      "subject": "React",
      "score": 0
    },
    {
      "subject": "Node.js/Express",
      "score": 0
    }
  ],
  "feedbackBreakdown": [
    {
      "questionTitle": "MongoDB Concurrency",
      "score": 0,
      "whatWentWell": [],
      "whatWasMissing": [
        "Understanding of optimistic vs. pessimistic locking.",
        "Concrete examples of when to use each type of locking.",
        "Explaining practical differences in MongoDB."
      ],
      "howToImprove": [
        "Study MongoDB's documentation on concurrency control.",
        "Research real-world examples of using optimistic and pessimistic locking."
      ]
    },
    {
      "questionTitle": "Real-time Collaborative Editor",
      "score": 5,
      "whatWentWell": [],
      "whatWasMissing": [
        "Details on conflict resolution strategies (OT/CRDT).",
        "Implementation details for real-time communication (WebSockets).",
        "Backend implementation using MongoDB's atomic operations.",
        "Missing any details"
      ],
      "howToImprove": [
        "Research operational transformation (OT) and conflict-free replicated data types (CRDTs).",
        "Study real-time collaborative editing architectures.",
        "Practice implementing a basic real-time application using WebSockets and Node.js."
      ]
    },
    {
      "questionTitle": "Linked List Cycle Detection",
      "score": 5,
      "whatWentWell": [],
      "whatWasMissing": [
        "Implementation details on algorithm.",
        "Mention of Floyd's cycle-finding algorithm."
      ],
      "howToImprove": [
        "Practice implementing Floyd's cycle-finding algorithm from scratch.",
        "Understand the time and space complexity of the algorithm."
      ]
    },
    {
      "questionTitle": "E-commerce Product Search",
      "score": 5,
      "whatWentWell": [],
      "whatWasMissing": [
        "Failed to respond to the question"
      ],
      "howToImprove": [
        "Attempt the question, even if you are unsure of the answer"
      ]
    }
  ],
  "finalAdvice": "Bro you're close 🔥 just grind a bit more and you'll crush it!"
};  


export default function AnalyticsTab() {
  const {
    score,
    totalQuestions,
    correctAnswers,
    wrongAnswers,
    improvementTips,
    incorrectQuestions,
    topicStats,
  } = data;

  const [animatedScore, setAnimatedScore] = useState(0);
  const accuracy = Math.round((correctAnswers / totalQuestions) * 100);

  const bestTopic = topicStats.reduce((a, b) => (a.score > b.score ? a : b));
  const worstTopic = topicStats.reduce((a, b) => (a.score < b.score ? a : b));

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = score / steps;

    const animate = () => {
      start += increment;
      if (start >= score) {
        setAnimatedScore(score);
      } else {
        setAnimatedScore(Math.round(start));
        setTimeout(animate, stepTime);
      }
    };

    animate();
  }, [score]);

  return (
    <div className="p-6 space-y-8 bg-linkedin-card text-linkedin-text">
      <div className="flex justify-start relative bottom-10">
        <a href="#">
          <img
            src="../public/Linkedin.png"
            alt="LinkedIn Logo"
            className="w-24 h-24 object-contain"
          />
        </a>
      </div>
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-linkedin-text">
          Your Interview Analytics
        </h1>
        <p className="text-linkedin-secondary-text">
          Review your performance and improve effectively.
        </p>
      </div>

      {/* Circular Progress */}
      <div className="flex justify-center">
        <div className="w-36">
          <CircularProgressbar
            value={animatedScore}
            text={`${animatedScore}%`}
            styles={buildStyles({
              pathColor:
                score > 70 ? "#00A0DC" : score > 40 ? "#F4A261" : "#E76F51",
              textColor: "#00A0DC",
              trailColor: "#eee",
            })}
          />
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "Total Questions",
            value: totalQuestions,
            icon: (
              <BsQuestionCircle className="inline-block mr-1 text-blue-500" />
            ),
          },
          {
            label: "Correct",
            value: correctAnswers,
            icon: (
              <BsCheckCircle className="inline-block mr-1 text-green-500" />
            ),
          },
          {
            label: "Wrong",
            value: wrongAnswers,
            icon: <BsXCircle className="inline-block mr-1 text-red-500" />,
          },
          {
            label: "Accuracy",
            value: `${accuracy}%`,
            icon: <BsGraphUp className="inline-block mr-1 text-purple-500" />,
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            className="border border-linkedin-border p-4 rounded-xl text-center bg-linkedin-bg"
          >
            <p className="text-xl font-semibold text-linkedin-text">
              {item.value}
            </p>
            <p className="text-linkedin-secondary">
              {item.icon}
              {item.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Best & Worst Topics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="border border-linkedin-border p-4 rounded-xl bg-linkedin-bg">
          <h3 className="text-lg font-semibold text-linkedin-text flex items-center gap-2">
            <BsStarFill className="text-yellow-400" />
            Best Topic
          </h3>
          <p className="text-linkedin-secondary">{bestTopic.subject}</p>
        </div>
        <div className="border border-linkedin-border p-4 rounded-xl bg-linkedin-bg">
          <h3 className="text-lg font-semibold text-linkedin-text flex items-center gap-2">
            <BsTools className="text-orange-400" />
            Needs Work
          </h3>
          <p className="text-linkedin-secondary">{worstTopic.subject}</p>
        </div>
      </div>

      {/* Tips Section */}
      <div className="border border-linkedin-border p-4 rounded-xl bg-linkedin-bg">
        <h2 className="text-xl font-semibold mb-2 text-linkedin-text flex items-center gap-2">
          <BsLightbulb className="text-yellow-300" />
          Tips to Improve
        </h2>
        <ul className="list-disc list-inside space-y-1 text-linkedin-secondary">
          {improvementTips.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </div>

      {/* Incorrect Answers */}
      <div className="border border-linkedin-border p-4 rounded-xl space-y-4 bg-linkedin-bg">
        <h2 className="text-xl font-semibold text-linkedin-text flex items-center gap-2">
          <BsExclamationTriangle className="text-red-500" />
          Review Incorrect Answers
        </h2>
        {incorrectQuestions.map((item, i) => (
          <div
            key={i}
            className="border border-linkedin-border p-3 rounded-md hover:border-linkedin-border transition-colors"
          >
            <p className="text-linkedin-text">
              <strong>Q:</strong> {item.question}
            </p>
            <p className="text-red-500">
              <strong>Your Answer:</strong> {item.yourAnswer}
            </p>
            <p className="text-green-500">
              <strong>Correct Answer:</strong> {item.correctAnswer}
            </p>
            <p className="text-linkedin-secondary">
              <strong>Explanation:</strong> {item.explanation}
            </p>
          </div>
        ))}
      </div>

      {/* Radar Chart */}
      <div className="border border-linkedin-border p-4 rounded-xl bg-linkedin-bg">
        <h2 className="text-xl font-semibold mb-4 text-linkedin-text flex items-center gap-2">
          <BsBarChartLine className="text-sky-400" />
          Topic-wise Performance
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart outerRadius={90} data={topicStats}>
            <PolarGrid />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "#FFFFFF", className: "text-linkedin-text" }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tickLine={false}
              axisLine={false}
              tick={({ payload, cx, cy }) => {
                if (!payload || payload.coordinate === undefined) return null;

                const radius = payload.coordinate;
                const angle = -30;
                const RADIAN = Math.PI / 180;
                const x = cx + (radius + 10) * Math.cos(angle * RADIAN);
                const y = cy + (radius + 10) * Math.sin(angle * RADIAN);

                return (
                  <text
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={10}
                    fill="#ffffff" // <-- THIS makes the number white
                  >
                    {payload.value}
                  </text>
                );
              }}
            />
            <Radar
              name="Score"
              dataKey="score"
              stroke="#0077B5"
              fill="#0077B5"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
