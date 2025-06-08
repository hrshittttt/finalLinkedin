// const admin = require('firebase-admin');
// const serviceAccount = require('./firebaseKey.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "linkdin-clone-32e15"
// });

// const db = admin.firestore();
// const auth = admin.auth(); // ✅ add this line

// module.exports = { db, auth };



require("dotenv").config();
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.TYPE,
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.CLIENT_CERT_URL,
    universe_domain: process.env.UNIVERSE_DOMAIN,
  }),
  databaseURL: process.env.DATABASE_URL, // Optional if you're using Realtime DB
});

const db = admin.firestore();
const auth = admin.auth();

module.exports = { db, auth };
