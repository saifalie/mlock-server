import admin from 'firebase-admin';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Determine service account path - try environment variable first, fall back to relative path
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH ||
    path.resolve(__dirname, '../../mlock-5e819-firebase-adminsdk-jxc0m-dd65bea5e2.json');
// Verify file exists
if (!fs.existsSync(serviceAccountPath)) {
    throw new Error(`Service account file not found at ${serviceAccountPath}`);
}
// Read and parse the service account file
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
// Initialize Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
export default admin;
//# sourceMappingURL=firebase.js.map