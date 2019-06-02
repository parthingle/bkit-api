import * as admin from "firebase-admin";
import keys from "./keys";
import serviceAccount from "./serviceAccountKey.json";

// TODO: Use database from environment variables instead of being hardcoded
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: keys.DATABASE_URL
});

export const FieldValue = admin.firestore.FieldValue;

const db = admin.firestore();
export const USERS = db.collection("Users");
export const BUCKETS = db.collection("Buckets");
export const ITEMS = db.collection("Items");

export default db;
