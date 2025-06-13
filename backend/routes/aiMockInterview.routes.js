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
You're a friendly AI interview coach helping a young dev understand their mock interview performance clearly.

🧠 Use clear language, Gen-Z style tone (chill, helpful), emojis (✅❌🔥), and bullet points to make it super easy to understand.

📋 Format your response like this:

---

🎯 **Overall Score:** X / 30  
Quick summary: Mention if the answers showed understanding, or if major parts were skipped.

---

💡 **Q1: [Short Title]**  
**Score:** X / 10

✅ What went well:
- Bullet points of what the answer got right

❌ What was missing:
- Bullet points of what's missing or incomplete

🛠️ How to improve:
- Bullet points of tips written casually (Gen-Z style)

---

Repeat the above for Q2 and Q3.

🎁 **Final Advice (Gemini Style):**  
1-2 lines of motivational Gen-Z tips, like "Bro you're close 🔥 just grind a bit more and you'll crush it!"

---

Now analyze the following mock interview:

${questions.map((q, i) => `Q${i + 1}: ${q}\nA${i + 1}: ${answers[i] || "No answer provided"}`).join("\n\n")}
`;
    }

    // 🧠 CALL the evalPrompt to get actual text
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
