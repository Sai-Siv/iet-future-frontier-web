// Creates an admin dashboard account, or gives an existing one a new password.
// Usage, from the backend folder: node scripts/adminUser.js <username>
import crypto from 'node:crypto';
import { getAuth } from 'firebase-admin/auth';
import '../src/config/firebase.js';

// Firebase logs in with an email address. This reserved domain can never receive mail.
// Matches USERNAME_DOMAIN in the dashboard's app.js.
const USERNAME_DOMAIN = 'iet360-admin.invalid';

const username = (process.argv[2] || '').trim().toLowerCase();
if (!/^[a-z0-9][a-z0-9._-]{1,30}$/.test(username)) {
  console.error('Usage: node scripts/adminUser.js <username> (letters, numbers, dots, dashes; 2 to 31 characters)');
  process.exit(1);
}

const auth = getAuth();
const email = `${username}@${USERNAME_DOMAIN}`;
const password = crypto.randomBytes(18).toString('base64url');

let user;
try {
  user = await auth.getUserByEmail(email);
  await auth.updateUser(user.uid, { password });
  await auth.revokeRefreshTokens(user.uid);
} catch (error) {
  if (error.code !== 'auth/user-not-found') throw error;
  user = await auth.createUser({ email, password, emailVerified: true });
}
await auth.setCustomUserClaims(user.uid, { admin: true });

console.log(`Username: ${username}`);
console.log(`Password: ${password}`);
process.exit(0);
