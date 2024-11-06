import admin from 'firebase-admin';
const serviceAccount = 'random';
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
export default admin;
//# sourceMappingURL=firebase.js.map