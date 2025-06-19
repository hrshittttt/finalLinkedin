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
    - Interests: ${interests.join(", ") || "N/A"}
    - Dream Company: ${dreamCompany}
    
    🎯 Your task is to generate a complete web development roadmap to help the student crack ${dreamCompany}. Return the roadmap as a **JSON array of objects**, strictly in the format mentioned below.
    
    Each object must have:
    
    - "id": a number starting from 1
    - "title": only the name of the technology/tool (e.g., "HTML", "CSS", "JavaScript", "React", etc.)
    - "time": estimated time to learn it (e.g., "1 week", "2-3 weeks")
    - "details": a clear, motivating paragraph (100–150 words) explaining what to learn and how it helps in real-world jobs
    - "iconKey": 🔁 match the title to the closest matching icon name from the **react-icons** library (e.g., for "HTML", use "FaHtml5", for "CSS" use "FaCss3Alt", etc.)
    - "focus": an array of 3 key sub-topics or focus areas related to the title (e.g., for HTML: ["Semantic elements", "Forms", "Accessibility"])
    - "resources": an array of 3 best free or paid learning platforms for that topic (e.g., ["MDN Docs", "FreeCodeCamp", "YouTube"])
    - "nextSteps": an array of 3 practical things the student should build or do after learning that skill (e.g., ["Build a personal site", "Clone a landing page", "Submit projects on GitHub"])
    
    ⚠️ Output Format Example:
    
    [
      {
        "id": 1,
        "title": "HTML",
        "time": "1 week",
        "details": "Write a motivating 100–150 word paragraph here about HTML...",
        "iconKey": "FaHtml5",
        "focus": ["Semantic elements", "Forms", "Accessibility"],
        "resources": ["MDN Docs", "FreeCodeCamp", "YouTube"],
        "nextSteps": ["Build a personal site", "Clone a simple landing page", "Make a resume with HTML only"]
      },
      {
        "id": 2,
        "title": "CSS",
        ...
      }
    ]
    
    ✅ Very important: Return only the **raw JSON array**.  
    ❌ No headings, no explanations, no markdown formatting, no backticks, no text before or after.
    
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
    console.log(roadmap)

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
