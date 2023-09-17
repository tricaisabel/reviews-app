import admin, { ServiceAccount } from 'firebase-admin';
import serviceAccount from './serviceAccountKey';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'your-firebase-storage-bucket-url',
});

const bucket = admin.storage().bucket();
export default bucket;