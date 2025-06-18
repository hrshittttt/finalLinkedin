import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "axios";
import AnalyticsTab from "./Analytics";

export default function ProfileInterview() {
  const [question, setQuestion] = useState("");
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false); // 🔥 For Next button
  const [submitting, setSubmitting] = useState(false); // 🔥 For End Interview
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [feedback, setFeedback] = useState(false);
  const [feedbackData, setFeedbackData] = useState("");

  const uid = localStorage.getItem("uid");
  const token = localStorage.getItem("token");

  const startInterview = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`http://localhost:4000/interview/start`, {
        uid,
        difficulty: "medium",
        comp: true,
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
    setSending(true);
    setError("");

    try {
      let newQuestion;

      if (answer.trim()) {
        // ✅ If answer exists, send to backend
        const res = await axios.post(`http://localhost:4000/interview/answer`, {
          uid,
          sessionId,
          answer,
        });
        newQuestion = res.data.question;
        setAnswers((prev) => [...prev, answer]);
      } else {
        // ✅ If answer empty, skip sending but still fetch next question
        const res = await axios.post(`http://localhost:4000/interview/skip`, {
          uid,
          sessionId,
        });
        newQuestion = res.data.question;
        setAnswers((prev) => [...prev, ""]); // Empty string to maintain index alignment
      }

      setAnswer(""); // Always clear after
      setQuestion(newQuestion);
      setCurrentIndex((i) => i + 1);
    } catch (err) {
      console.error("Answer error:", err.response?.data || err.message);
      setError("Failed to send answer");
    } finally {
      setSending(false);
    }
  };

  const endInterview = async () => {
    setSubmitting(true);
    setFeedbackData("");

    try {
      // ✅ Submit last unsent answer (if not empty and not already saved)
      if (answer.trim() && answers.length === currentIndex) {
        await axios.post(`http://localhost:4000/interview/answer`, {
          uid,
          sessionId,
          answer,
        });
        setAnswers((prev) => [...prev, answer]);
        setAnswer(""); // Clear after saving
      }

      // ✅ Now end the interview
      const res = await axios.post(`http://localhost:4000/interview/end`, {
        uid,
        sessionId,
      });

      setSubmitted(false);
      setFeedback(true);
      setFeedbackData(res.data.feedback);
    } catch (err) {
      console.error("End error:", err.response?.data || err.message);
      setError("Failed to end interview");
    } finally {
      setSubmitting(false);
    }
  };

  const buttonBase =
    "w-[150px] h-9 px-3 py-1.5 rounded text-white text-sm flex items-center justify-center gap-1";

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linkedin-card px-4">
        <div className="w-full max-w-xl bg-linkedin-bg text-linkedin-text rounded-xl p-8 text-center border border-linkedin-border">
          <h2 className="text-xl font-semibold mb-4">
            Thank you for submitting your answers!
          </h2>
          <p className="text-sm text-linkedin-muted mb-6">
            We're analyzing your responses to help you land the best
            opportunities. This will just take a moment...
          </p>
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  if (feedback) {
    return <AnalyticsTab response={feedbackData} />;
  }

  return (
    <>
      <img
        src="../public/Linkedin.png"
        alt="LinkedIn Logo"
        className="max-w-28 max-h-7 relative left-4 top-4 cursor-pointer"
      />
      <div className="min-h-screen flex flex-col items-center justify-center bg-linkedin-card px-4">
        {/* Header */}
        <div className="w-full max-w-5xl flex items-center gap-3 p-4 mb-2">
          <h1 className="text-lg sm:text-xl font-semibold text-linkedin-text">
            Company Based Mock Interview
          </h1>
        </div>

        {/* Main Box */}
        <div className="w-full max-w-5xl h-[500px] border border-linkedin-border bg-linkedin-bg text-linkedin-text rounded-xl overflow-hidden flex">
          {loading ? (
            <div className="w-full flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-linkedin-muted">
                Loading questions...
              </p>
            </div>
          ) : currentIndex === -1 ? (
            <div className="w-full flex flex-col items-center justify-center text-center p-6">
              <h2 className="text-2xl font-semibold mb-2">
                Welcome to the Interview Form
              </h2>
              <p className="text-sm mb-4 text-linkedin-muted max-w-md">
                Please answer each question one by one. You can submit once
                you've answered enough. Press <kbd>Enter</kbd> to add new lines
                inside your answer.
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
              {/* Left Panel - Question */}
              <div className="w-1/2 bg-linkedin-bg text-linkedin-text p-6 overflow-y-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <h2 className="text-xl font-semibold mb-2">
                      Question {currentIndex + 1}
                    </h2>
                    <p className="text-lg">{question}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Divider */}
              <div className="w-[1px] bg-linkedin-border" />

              {/* Right Panel - Answer */}
              <div className="w-1/2 p-6 flex flex-col justify-between relative">
                {/* Top Button - Next */}
                <div className="absolute top-4 right-6 flex gap-2">
                  <button
                    type="button"
                    className={`${buttonBase} ${
                      sending
                        ? "bg-linkedin-muted cursor-wait"
                        : "bg-linkedin-blue hover:bg-linkedin-hover-blue"
                    }`}
                    onClick={sendAnswer}
                    disabled={sending}
                  >
                    {sending ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Next Question <FaArrowRight />
                      </>
                    )}
                  </button>
                </div>

                {/* Textarea */}
                <div className="pt-12">
                  <textarea
                    className="w-full h-48 py-3 px-3 bg-linkedin-bg text-linkedin-text text-base border border-linkedin-border rounded-md focus:outline-none focus:ring-2 focus:ring-linkedin-blue resize-none"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Type your answer..."
                  />
                  {error && (
                    <p className="text-red-400 text-sm mt-2">{error}</p>
                  )}
                </div>

                {/* Bottom Button - End Interview */}
                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    className={`${buttonBase} ${
                      submitting
                        ? "bg-green-400 cursor-wait"
                        : currentIndex === 0
                        ? "bg-green-600 opacity-30 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                    disabled={submitting || currentIndex === 0}
                    onClick={() => {
                      endInterview();
                      setSubmitted(true);
                    }}
                  >
                    {submitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      "End Interview"
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
