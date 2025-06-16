const express = require("express");
const router = express.Router();
const { db } = require("../firebaseConfig");
const {OpenAI} = require("openai");
const { verifyFirebaseToken } = require("../middleware/user.middleware");


// POST: Update or create profile
router.post("/update", verifyFirebaseToken,async (req, res) => {

  
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
  console.log(uid)

 



  // Basic validation hai ye toh 
  if (
  !uid || 
  !name?.trim() || 
  !Array.isArray(skills) || skills.length === 0 || 
  !experience?.trim()
) {
  return res.status(400).json({ error: "Required fields missing or invalid" });
}

  try {
    const profileData = {
      name,
      location: location || "",
      skills,
      experience,
      education: education || [], // expects array [{ degree, institution, year, grade }] aesa ho skta hai
      dreamCompanies: dreamCompanies || [],
      interests: interests || [],
      resumeUrl: resumeUrl || "",
      githubURL: githubURL || "",
      updatedAt: new Date(),
    };

     console.log(profileData)

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
