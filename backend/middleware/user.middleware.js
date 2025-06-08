const admin = require('firebase-admin');


const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Auth header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const idToken = authHeader.split(" ")[1];
  console.log("ID Token:", idToken);

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};



const checkExistingEmail = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
  
    const user = await admin.auth().getUserByEmail(email);
    return res.status(409).json({ error: "Email already in use" });
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      next();
    } else {
      console.error("Error checking email:", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  }
};

module.exports = {
  checkExistingEmail,
  verifyFirebaseToken
};
