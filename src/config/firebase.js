import * as admin from "firebase-admin";
import keys from "./keys";
var serviceAccountKey = require(process.env.PATH_TO_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
    databaseURL: keys.DATABASE_URL
});

export const FieldValue = admin.firestore.FieldValue;

const db = admin.firestore();
export const USERS = db.collection("Users");
export const BUCKETS = db.collection("Buckets");
export const ITEMS = db.collection("Items");

export default db;
