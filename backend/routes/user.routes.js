const express = require('express'); 
const router = express.Router();
const { db } = require('../firebaseConfig');
const admin = require('firebase-admin');
const {checkExistingEmail, verifyFirebaseToken} = require("../middleware/user.middleware")

router.post("/register", checkExistingEmail, async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: "All fields (email, password, name) are required." });
  }

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });

    await db.collection("users").doc(userRecord.uid).set({
      email,
      name,
       password, 
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).json({
      message: "User registered successfully",
      uid: userRecord.uid,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: error.message });
  }
});



router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });

  try {
    // Find user in Firestore
    const usersRef = db.collection("users");
    const snapshot = await usersRef.where("email", "==", email).get();

    if (snapshot.empty) {
      return res.status(404).json({ error: "User not found." });
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();

    // Check password
    if (userData.password !== password) {
      return res.status(401).json({ error: "Incorrect password." });
    }

    // Get Firebase Auth token
    const userRecord = await admin.auth().getUserByEmail(email);
    const token = await admin.auth().createCustomToken(userRecord.uid);

    res.json({
      message: "Login successful",
      uid: userDoc.id,
      email: userData.email,
      name: userData.name,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

  


module.exports = router;
