import * as admin from 'firebase-admin';
import keys from './keys'
import serviceAccount from './serviceAccountKey.json'


// TODO: Use database from environment variables instead of being hardcoded
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: keys.DATABASE_URL
  });

const db = admin.firestore()

// Add other firebase related exports here
export default { db }