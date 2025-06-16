import { useState, useRef, useEffect } from "react";
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
import { motion, AnimatePresence } from "framer-motion";
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
  BsChevronDown,
} from "react-icons/bs";

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
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-linkedin-text">
          Your Interview Analytics
        </h1>
        <p className="text-linkedin-secondary-text">
          Review your performance and improve effectively.
        </p>
      </div>

      <div className="flex justify-center">
        <div className="w-36">
          <CircularProgressbar
            value={animatedScore}
            text={`${animatedScore}%`}
            styles={buildStyles({
              pathColor: "#00A0DC",
              textColor: "#00A0DC",
              trailColor: "#eee",
            })}
          />
        </div>
      </div>

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

      <IncorrectAnswersAccordion incorrectQuestions={incorrectQuestions} />

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
                    fill="#ffffff"
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

function IncorrectAnswersAccordion({ incorrectQuestions }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const toggleAccordion = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="border border-linkedin-border p-4 rounded-xl bg-linkedin-bg">
      <h2 className="text-xl font-semibold text-linkedin-text flex items-center gap-2 mb-4">
        <BsExclamationTriangle className="text-red-500" />
        Review Incorrect Answers
      </h2>
      <div className="space-y-2">
        {incorrectQuestions.map((item, i) => {
          const isOpen = activeIndex === i;
          return (
            <div key={i} className="border border-linkedin-border rounded-md">
              <button
                onClick={() => toggleAccordion(i)}
                className="w-full flex justify-between items-center px-4 py-3 text-left font-medium text-linkedin-text transition-colors duration-200 hover:bg-linkedin-border"
              >
                <span>
                  <strong>Q:</strong> {item.question}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <BsChevronDown className="text-lg" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <AccordionContent>
                    <p className="text-red-500">
                      <strong>Your Answer:</strong> {item.yourAnswer}
                    </p>
                    <p className="text-green-500">
                      <strong>Correct Answer:</strong> {item.correctAnswer}
                    </p>
                    <p className="text-linkedin-secondary">
                      <strong>Explanation:</strong> {item.explanation}
                    </p>
                  </AccordionContent>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AccordionContent({ children }) {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (ref.current) setHeight(ref.current.scrollHeight);
  }, [ref]);
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height, opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="overflow-hidden"
    >
      <div ref={ref} className="px-4 pb-4 space-y-2">
        {children}
      </div>
    </motion.div>
  );
}
