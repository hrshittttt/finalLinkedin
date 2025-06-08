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
        // 1. Create Firebase Auth user
        const userRecord = await admin.auth().createUser({
            email,
            password,
            displayName: name
        });

        // 2. Add user document to Firestore
        await db.collection("users").doc(userRecord.uid).set({
            email,
            name,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        // 3. Return success
        res.status(201).json({
            message: "User registered successfully",
            uid: userRecord.uid
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: error.message });
    }
});

// Login route
router.get("/login", verifyFirebaseToken, async (req, res) => {
  
    try {
      // You can get user info from req.user (decoded token)
      const userId = req.user.uid;
  
      // Optionally, fetch additional user info from Firestore if you want
      const userDoc = await db.collection("users").doc(userId).get();
  
      if (!userDoc.exists) {
        return res.status(404).json({ error: "User data not found" });
      }
  
      const userData = userDoc.data();
  
      res.json({
        message: "User logged in successfully",
        uid: userId,
        email: userData.email,
        name: userData.name,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  });
  


module.exports = router;