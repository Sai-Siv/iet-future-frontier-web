import { Resend } from 'resend';
import { renderConfirmationEmail } from '../views/emails/confirmationEmail.js';

const REPLY_TO = 'ietln.hyderabad@gmail.com';

/**
 * Sends a registration confirmation. Failures are logged and never thrown, because
 * the registration is already saved by the time this runs.
 */
export const sendConfirmationEmail = async ({ toEmail, leaderName, eventName, registrationId, details = [] }) => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(`RESEND_API_KEY is not set; skipped confirmation email for ${registrationId}`);
    return false;
  }

  try {
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    const senderName = process.env.RESEND_SENDER_NAME || 'IET 360° Registration';

    const { data, error } = await new Resend(apiKey).emails.send({
      from: `"${senderName}" <${fromEmail}>`,
      to: toEmail,
      replyTo: REPLY_TO,
      subject: `Registration Confirmed: ${eventName} - IET 360°`,
      html: renderConfirmationEmail({ leaderName, eventName, registrationId, details }),
    });
    if (error) throw new Error(error.message || JSON.stringify(error));

    console.log(`Confirmation email sent for ${registrationId} (message ${data?.id})`);
    return true;
  } catch (error) {
    console.error(`Failed to send confirmation email for ${registrationId}:`, error.message);
    return false;
  }
};
