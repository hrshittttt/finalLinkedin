import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "axios";
import AnalyticsTab from "./Analytics";


export default function Interview() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const uid = localStorage.getItem("uid");
  const token = localStorage.getItem("token");

  // const backendURL = "http://localhost:4000";

  const startInterview = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`http://localhost:4000/interview/start`, {
        uid,
        difficulty: "medium",
      });

      setQuestion(res.data.question);
      setSessionId(res.data.sessionId);
      setAnswers([]);
      setCurrentIndex(0);
    } catch (err) {
      console.error("Start error:", err.response?.data || err.message);
      setError("Failed to start interview");
    } finally {
      setLoading(false);
    }
  };

  const sendAnswer = async () => {
    if (!answer.trim()) {
      setError("Answer cannot be empty");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await axios.post(`http://localhost:4000/interview/answer`, {
        uid,
        sessionId,
        answer,
      });

      setAnswers((prev) => [...prev, answer]);
      setAnswer("");
      setQuestion(res.data.question);
      setCurrentIndex((i) => i + 1);
    } catch (err) {
      console.error("Answer error:", err.response?.data || err.message);
      setError("Failed to send answer");
    } finally {
      setSubmitting(false);
    }
  };

  const endInterview = async () => {
    try {
       const res = await axios.post(`http://localhost:4000/interview/end`, {
        uid,
        sessionId,
      });

      <AnalyticsTab data={res.data.feedback} />

      console.log("📝 Final Feedback:", res.data.feedback);
      alert("Interview ended! Feedback logged in console.");
      // TODO: Navigate to feedback page later
    } catch (err) {
      console.error("End error:", err.response?.data || err.message);
      setError("Failed to end interview");
    }
  };

  const buttonBase =
    "w-[120px] h-10 px-4 py-2 rounded flex items-center justify-center gap-2 text-white";

  return (
    <div className="min-h-screen flex items-center justify-center bg-linkedin-card px-4">
      <div className="w-full max-w-md border border-linkedin-border bg-linkedin-bg text-linkedin-text rounded-xl p-6">
        {loading ? (
          <div className="text-center flex flex-col items-center justify-center gap-2">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-linkedin-muted">Loading interview...</p>
          </div>
        ) : (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {currentIndex === -1 ? (
                  <div>
                    <h2 className="text-xl font-semibold mb-2">
                      Welcome to AI Interview
                    </h2>
                    <p className="text-sm mb-4 text-linkedin-muted">
                      Answer one question at a time based on your profile.
                      Click Start to begin.
                    </p>
                    <button
                      className="bg-linkedin-blue text-white px-4 py-2 rounded hover:bg-linkedin-hover-blue"
                      onClick={startInterview}
                    >
                      Start
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-semibold">{`Q${currentIndex + 1}`}</h2>
                    <p className="text-linkedin-muted">{question}</p>
                    <textarea
                      className="w-full h-32 py-3 px-3 bg-linkedin-bg text-linkedin-text text-lg border border-linkedin-border rounded-md focus:outline-none focus:ring-2 focus:ring-linkedin-blue resize-none"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Type your answer..."
                    />
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

            {currentIndex >= 0 && (
              <div className="flex justify-between items-center mt-6">
                <button
                  type="button"
                  className={`${buttonBase} bg-gray-600 hover:bg-gray-700`}
                  onClick={endInterview}
                >
                  End
                </button>
                <button
                  type="button"
                  className={`${buttonBase} ${
                    submitting
                      ? "bg-green-400 cursor-wait"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                  onClick={sendAnswer}
                  disabled={submitting}
                >
                  {submitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Send"
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

