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
    const {
      name,
      skills = [],
      experience = "",
      dreamCompany = "Top Tech Companies",
      interests = [],
      roles = [],
    } = profile;

    // api k liya promt banega
    const prompt = `
    You're an expert, professional career coach AI.

A student named ${name} has the following profile:
- Skills: ${skills.join(", ") || "N/A"}
- Experience: ${experience || "No experience"}
- Interests: ${interests.join(", ") || "N/A"}
- Dream Company: ${dreamCompany}
- Target Role: "Software Engineer"}

🎯 Your task is to generate a **complete career roadmap** to help the student **crack a job at ${dreamCompany}**, specifically tailored for the role of ${roles}.

🔧 The roadmap must:
- Be fully personalized for ${dreamCompany}, based on the actual hiring process, skills, and expectations.
- Include all necessary **programming languages, technologies, tools, and soft skills**.
- Include the **ideal learning order** with clear progression.
- Focus on **high-impact learning** and **project-building**.
- Be realistic and motivating, while covering real-world skills relevant to that company.

🧠 Return the roadmap as a **raw JSON array of objects**, strictly in the format below:

Each object must include:
- "id": number starting from 1
- "title": name of technology/tool (e.g., "JavaScript", "Data Structures", "System Design","html", "CSS", "React", "Node.js"  etc)  strictly make it shorter in 2-3 words and no use of parantheses
- "time": estimated time to learn it (e.g., "2-3 weeks", "1 month")
- "details": 100–150 words motivating paragraph on why this is important, how it helps get hired at ${dreamCompany}, and how to learn it
- "iconKey": 🔁 best matching icon name from react-icons (e.g., "FaJava", "SiLeetcode", "FaDatabase", "FaReact", "FaNodeJs")
- "focus": array of 3 sub-topics or concepts to focus on for this skill
- "resources": best 3 free or paid platforms to learn (e.g., "FreeCodeCamp", "YouTube", "Coursera", "LeetCode")
- "nextSteps": 3 practical actions/projects to do after learning it (e.g., "Solve 50 LeetCode problems", "Build a full-stack app", "Mock interview with a friend")

✅ Only return the **raw JSON array**.
❌ Do NOT add any explanation, headings, code block, or markdown formatting before or after.
    
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
    console.log(roadmap);

    if (!roadmap) {
      return res
        .status(500)
        .json({ error: "Invalid Gemini response", full: geminiRes.data });
    }

    res.status(200).json({ roadmap });
  } catch (err) {
    console.error("Roadmap generation failed:", err.message);
    res
      .status(500)
      .json({ error: "Internal server error", details: err.message });
  }
});

module.exports = router;
