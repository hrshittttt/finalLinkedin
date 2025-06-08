const express = require("express");
const router = express.Router();
const { db } = require("../firebaseConfig");


// POST: Update or create profile
router.post("/update", async (req, res) => {
  const {
    uid,
    name,
    location,
    skills,
    experience,
    education, // array of objects rahega
    dreamCompanies,
    interests,
    resumeUrl,
    githubURL,
  } = req.body;

  // Basic validation hai ye toh 
  if (!uid || !name || !skills || !experience) {
    return res.status(400).json({ error: "Required fields missing" });
  }

  try {
    const profileData = {
      name,
      location: location || "",
      skills,
      experience,
      education: education || [], // expects array [{ degree, institution, year, grade }]
      dreamCompanies: dreamCompanies || [],
      interests: interests || [],
      resumeUrl: resumeUrl || "",
      githubURL: githubURL || "",
      updatedAt: new Date(),
    };

    await db.collection("profiles").doc(uid).set(profileData, { merge: true });

    return res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /api/profile/:uid
router.get("/:uid", async (req, res) => {
  const uid = req.params.uid;

  try {
    const doc = await db.collection("profiles").doc(uid).get();
    if (!doc.exists) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.status(200).json(doc.data());
  } catch (err) {
    console.error("Error getting profile:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
