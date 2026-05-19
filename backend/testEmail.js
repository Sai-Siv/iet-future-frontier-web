import dotenv from 'dotenv';
import { sendConfirmationEmail } from './utils/emailHelper.js';

// Load environment variables from .env
dotenv.config();

console.log('🧪 Running email helper test script...');
console.log(`Checking SMTP sender: ${process.env.EMAIL_USER}`);

const runTest = async () => {
  try {
    const success = await sendConfirmationEmail({
      toEmail: 'saisivateja28122003@gmail.com',
      leaderName: 'Sai Sivateja (Local Test)',
      eventName: 'PATN (Paper and Abstract Presentation)',
      registrationId: 'CONCLAVE-LOCAL-TEST',
      details: [
        { label: 'Test Mode', value: 'Active Local SMTP Diagnostic' },
        { label: 'Sender Mask', value: 'noreply.futuretechconclave@gmail.com' },
        { label: 'Auth Account', value: process.env.EMAIL_USER }
      ]
    });

    if (success) {
      console.log('\n======================================================');
      console.log('✅ SUCCESS! Email sent successfully to saisivateja28122003@gmail.com.');
      console.log('======================================================');
    } else {
      console.log('\n======================================================');
      console.log('❌ FAILED: The email helper failed to send.');
      console.log('======================================================');
    }
  } catch (err) {
    console.error('❌ ERRORED:', err);
  }
};

runTest();
