import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function ProfileInterview() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1); // -1 = instruction screen
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchQuestions() {
      setLoading(true);
      const mockQuestions = [
        "What's your name?",
        "What is your experience?",
        "What are your top skills?",
        "Where are you located?",
        "What is your GitHub URL?",
      ];
      setTimeout(() => {
        setQuestions(mockQuestions);
        setAnswers([]);
        setLoading(false);
      }, 1000);
    }
    fetchQuestions();
  }, []);

  const handleChange = (value) => {
    const updated = [...answers];
    updated[currentIndex] = value;
    setAnswers(updated);
    if (error) setError("");
  };

  const handleSubmit = async () => {
    const hasValidAnswer = answers.some((ans) => ans && ans.trim() !== "");
    if (!hasValidAnswer) {
      setError("Please answer some questions first");
      return;
    }

    setError("");
    setSubmitting(true);
    await new Promise((res) => setTimeout(res, 2000));
    setSubmitting(false);
    setSubmitted(true);
  };

  const buttonBase =
    "w-[100px] h-9 px-3 py-1.5 rounded text-white text-sm flex items-center justify-center gap-1";

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
            Profile Based Mock Interview
          </h1>
        </div>

        {/* Main Content */}
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
                onClick={() => setCurrentIndex(0)}
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
                    <p className="text-lg">{questions[currentIndex]}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Divider */}
              <div className="w-[1px] bg-linkedin-border" />

              {/* Right Panel - Answer */}
              <div className="w-1/2 p-6 flex flex-col justify-between relative">
                {/* Top Buttons */}
                <div className="absolute top-4 right-6 flex gap-2">
                  <button
                    type="button"
                    className={`${buttonBase} ${
                      currentIndex <= 0
                        ? "opacity-30 cursor-not-allowed bg-gray-500"
                        : "bg-gray-600 hover:bg-gray-700"
                    }`}
                    disabled={currentIndex <= 0}
                    onClick={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
                  >
                    <FaArrowLeft />
                    Back
                  </button>

                  <button
                    type="button"
                    className={`${buttonBase} bg-linkedin-blue hover:bg-linkedin-hover-blue`}
                    onClick={() => {
                      const currentAnswer = answers[currentIndex] || "";
                      if (currentAnswer.trim() === "") {
                        setError(
                          "Please enter a valid answer before continuing."
                        );
                        return;
                      }
                      setError("");
                      setAnswers((prev) => {
                        const newArr = [...prev];
                        if (!newArr[currentIndex + 1])
                          newArr[currentIndex + 1] = "";
                        return newArr;
                      });
                      setCurrentIndex((i) => i + 1);
                    }}
                  >
                    Next <FaArrowRight />
                  </button>
                </div>

                {/* Textarea */}
                <div className="pt-12">
                  <textarea
                    className="w-full h-48 py-3 px-3 bg-linkedin-bg text-linkedin-text text-base border border-linkedin-border rounded-md focus:outline-none focus:ring-2 focus:ring-linkedin-blue resize-none"
                    value={answers[currentIndex] || ""}
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder="Type your answer..."
                  />
                  {error && (
                    <p className="text-red-400 text-sm mt-2">{error}</p>
                  )}
                </div>

                {/* Bottom Submit Button */}
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
                    onClick={handleSubmit}
                  >
                    {submitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      "Submit"
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
