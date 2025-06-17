const express = require("express");
const router = express.Router();
const { db } = require("../firebaseConfig");
const axios = require("axios");

// ✅ Load API Key
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// ✅ Correct Gemini URL with working model
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

// ✅ Helper: Prompt Generator
function createPrompt(profile, previousQuestions = [], difficulty = "medium") {
  return `
You're an expert AI technical interviewer.

Profile:
Name: ${profile.name}
Skills: ${profile.skills.join(", ")}
Experience: ${profile.experience}
Interests: ${profile.interests.join(", ")}

Ask one ${difficulty} difficulty interview question (theoretical or DSA-based).
Avoid these repeated questions: ${previousQuestions.join(" || ")}

Format: Just return the question only, no explanations.
`;
}

// ✅ 1. START INTERVIEW
router.post("/start", async (req, res) => {
  const { uid, difficulty } = req.body;

  try {
    const userDoc = await db.collection("profiles").doc(uid).get();
    if (!userDoc.exists) return res.status(404).json({ error: "Profile not found" });

    const profile = userDoc.data();
    const prompt = createPrompt(profile, [], difficulty);

    const aiRes = await axios.post(
      GEMINI_URL,
      { contents: [{ parts: [{ text: prompt }] }] },
      { headers: { "Content-Type": "application/json" } }
    );

    const question = aiRes.data.candidates[0]?.content?.parts[0]?.text?.trim() || "No question generated.";

    const sessionRef = db.collection("interviews").doc(uid).collection("sessions").doc();
    await sessionRef.set({
      startedAt: new Date(),
      difficulty,
      questions: [question],
      answers: [],
      status: "in-progress",
    });

    res.status(200).json({ sessionId: sessionRef.id, question });
  } catch (err) {
    console.error("Start Interview Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ 2. ANSWER AND NEXT QUESTION
router.post("/answer", async (req, res) => {
  const { uid, sessionId, answer } = req.body;
  console.log(sessionId)
  if (!uid || !sessionId || !answer) return res.status(400).json({ error: "Missing fields" });

  try {
    const sessionRef = db.collection("interviews").doc(uid).collection("sessions").doc(sessionId);
    const sessionDoc = await sessionRef.get();
    if (!sessionDoc.exists) return res.status(404).json({ error: "Session not found" });

    const session = sessionDoc.data();
    if (session.status === "completed") return res.status(400).json({ error: "Session already ended" });

    const userDoc = await db.collection("profiles").doc(uid).get();
    const profile = userDoc.data();

    const updatedAnswers = [...session.answers, { answer, time: new Date() }];
    const prompt = createPrompt(profile, session.questions, session.difficulty);

    const aiRes = await axios.post(
      GEMINI_URL,
      { contents: [{ parts: [{ text: prompt }] }] },
      { headers: { "Content-Type": "application/json" } }
    );

    const nextQ = aiRes.data.candidates[0]?.content?.parts[0]?.text?.trim() || "No next question generated.";

    const updatedQuestions = [...session.questions, nextQ];

    await sessionRef.update({
      questions: updatedQuestions,
      answers: updatedAnswers,
    });

    res.status(200).json({ question: nextQ });
  } catch (err) {
    console.error("Answer Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ 3. END INTERVIEW + ANALYTICS
router.post("/end", async (req, res) => {
  const { uid, sessionId } = req.body;
  if (!uid || !sessionId) return res.status(400).json({ error: "Missing fields" });

  try {
    const sessionRef = db.collection("interviews").doc(uid).collection("sessions").doc(sessionId);
    const sessionDoc = await sessionRef.get();
    if (!sessionDoc.exists) return res.status(404).json({ error: "Session not found" });

    const session = sessionDoc.data();
    const { questions, answers } = session;

    const fullReview = questions.map((q, idx) => ({
      question: q,
      answer: answers[idx]?.answer || "",
    }));
    

  function evalPrompt({ questions, answers }) {
  return `
You're a friendly AI interview coach helping a dev assess their mock interview performance.

Analyze the user's answers carefully. Do NOT accept gibberish or vague replies as correct.

For each question:
- Check if the user answer matches the expected concept (provided below).
- Score the question out of 10.
- Generate JSON feedback.

Return response in **pure JSON** only. Don't add any text or markdown.

 Question-Answer Data:

${questions.map((q, i) =>`Q${i + 1}: ${q}\nA${i + 1}: ${answers[i] ? JSON.stringify(answers[i]) : "No answer provided"}`).join("\n\n")}

 JSON Structure:
{
  score: 24,
  totalQuestions: 3,
  correctAnswers: 2,
  wrongAnswers: 1,
  improvementTips: ["tips1", "tips2", "tips3"], (in 5-10 words based on answers)

  incorrectQuestions: [
    {
      question: "...",
      yourAnswer: "...",
      correctAnswer: "...", (in 10-20 words)
      explanation: "..."
    }
  ],
  topicStats: [
    { subject: "React", score: 60 },
    { subject: "JS", score: 40 }
     ...,
  ],
  finalAdvice: "...." (in 10-20 words based on answers)
}
`;
}



console.log(questions, answers);
    //  call kre hai eval promt ko jo apn ko promt dega wo apn gemini ko bhejenge or fed backe dega wo
    const prompt = evalPrompt({ questions, answers });

    const aiRes = await axios.post(
      GEMINI_URL,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const feedback = aiRes.data.candidates[0]?.content?.parts[0]?.text || "No feedback generated.";

    await sessionRef.update({
      endedAt: new Date(),
      status: "completed",
      feedback,
    });

    await sessionRef.delete();

    res.status(200).json({ feedback, message: "Interview ended and session deleted." });
  } catch (err) {
    console.error("End Interview Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
