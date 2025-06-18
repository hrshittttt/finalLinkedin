const express = require("express");
const router = express.Router();
const { db } = require("../firebaseConfig"); 
const axios = require("axios");
require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

// POST /roadmap/generate
router.post("/generate", async (req, res) => {
  const { uid } = req.body;

  try {
    //  user dundhega from firebasd
    const userDoc = await db.collection("profiles").doc(uid).get();
    if (!userDoc.exists) {
      return res.status(404).json({ error: "User profile not found" });
    }

    const profile = userDoc.data();
    const { name, skills = [], experience = "", dreamCompany = "Top Tech Companies", interests = [] } = profile;

    // api k liya promt banega
    const prompt = `
You're an expert career coach AI.

A student named ${name} has the following profile:
- Skills: ${skills.join(", ") || "N/A"}
- Experience: ${experience || "No experience"}
- Interests: ${interests.join(", ") || ""}
- Dream Company: ${dreamCompany}

🎯 Generate a complete roadmap (from beginner to pro) tailored for cracking ${dreamCompany}, covering:
- Must-have skills 🔧
- Key projects to build 💻
- Top resources (free + paid) 📚
- Timeline breakdown (e.g., Month 1: ..., Month 2: ...)
- Important interview topics asked by ${dreamCompany} 👨‍💻

Keep it motivating, clear, and step-by-step. Format neatly.
`;

    // gimi api ko koll krega after getitng pronmt
    const geminiRes = await axios.post(
      GEMINI_URL,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const roadmap = geminiRes.data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!roadmap) {
      return res.status(500).json({ error: "Invalid Gemini response", full: geminiRes.data });
    }


    res.status(200).json({ roadmap });
  } catch (err) {
    console.error("Roadmap generation failed:", err.message);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
});

module.exports = router;
