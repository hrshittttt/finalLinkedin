const admin = require('firebase-admin');
const serviceAccount = require('./firebaseKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "linkdin-clone-32e15"
});

const db = admin.firestore();
const auth = admin.auth(); // ✅ add this line

module.exports = { db, auth };
