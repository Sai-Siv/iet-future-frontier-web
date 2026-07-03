import { Resend } from 'resend';

// Initialize the Resend client
const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('⚠️ WARNING: RESEND_API_KEY environment variable is missing. Confirmation emails will be simulated and logged in the console, but not sent.');
    return null;
  }
  return new Resend(apiKey);
};

/**
 * Sends a premium registration confirmation email to the participant / leader via Resend
 * @param {Object} params
 * @param {string} params.toEmail - Recipient email address
 * @param {string} params.leaderName - Name of the team leader/participant
 * @param {string} params.eventName - Name of the event (e.g. PATN, InnoThon, etc.)
 * @param {string} params.registrationId - Generated Registration ID
 * @param {Array<{label: string, value: string}>} params.details - Key details rows to display
 */
export const sendConfirmationEmail = async ({ toEmail, leaderName, eventName, registrationId, details = [] }) => {
  const resend = getResendClient();

  // Premium Dark-Futuristic Responsive HTML template matching Future Frontier theme
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Registration Confirmed - Future Frontier 2026</title>
        <style>
          body {
            font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #050505;
            color: #ffffff;
            margin: 0;
            padding: 0;
          }
          .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #0c0c0c;
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
          }
          .header-banner {
            background: linear-gradient(135deg, #a046b4 0%, #6a0dad 100%);
            padding: 40px 20px;
            text-align: center;
            border-bottom: 2px solid #a046b4;
          }
          .header-banner h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 800;
            letter-spacing: 1.5px;
            color: #ffffff;
            text-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
          }
          .header-banner p {
            margin: 10px 0 0 0;
            font-size: 13px;
            color: rgba(255, 255, 255, 0.85);
            text-transform: uppercase;
            letter-spacing: 2px;
            font-weight: 600;
          }
          .content-body {
            padding: 35px 30px;
            background-color: #0c0c0c;
          }
          .greeting {
            font-size: 19px;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 15px;
          }
          .intro-text {
            font-size: 15px;
            color: #b0b0b0;
            line-height: 1.6;
            margin-bottom: 30px;
          }
          .details-card {
            background-color: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-left: 4px solid #a046b4;
            border-radius: 8px;
            padding: 22px;
            margin-bottom: 30px;
          }
          .details-card h3 {
            margin-top: 0;
            margin-bottom: 15px;
            font-size: 15px;
            color: #ffffff;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            padding-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .detail-row {
            margin-bottom: 10px;
            font-size: 14px;
            overflow: hidden;
          }
          .detail-label {
            float: left;
            color: #888888;
            font-weight: 500;
          }
          .detail-value {
            float: right;
            color: #ffffff;
            font-weight: 600;
            text-align: right;
          }
          .footer-section {
            background-color: #050505;
            padding: 30px 20px;
            text-align: center;
            border-top: 1px solid rgba(255, 255, 255, 0.05);
          }
          .footer-logo {
            font-size: 17px;
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 10px;
            letter-spacing: 1px;
          }
          .footer-text {
            font-size: 12px;
            color: #666666;
            line-height: 1.5;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header-banner">
            <h1>REGISTRATION CONFIRMED</h1>
            <p>IET Future Frontier 2026</p>
          </div>
          <div class="content-body">
            <div class="greeting">Hello ${leaderName || 'Participant'},</div>
            <div class="intro-text">
              We are absolutely thrilled to confirm your registration for <strong>${eventName}</strong> at IET Hyderabad's flagship <strong>Future Technology Conclave 2026</strong>! 🚀
              <br><br>
              Your registration has been successfully recorded in our database. Below are the key details of your entry:
            </div>
            
            <div class="details-card">
              <h3>Registration Summary</h3>
              <div class="detail-row">
                <span class="detail-label">Event:</span>
                <span class="detail-value" style="color: #a046b4; font-weight: bold;">${eventName}</span>
              </div>
              <div style="clear: both; height: 10px;"></div>
              <div class="detail-row">
                <span class="detail-label">Registration ID:</span>
                <span class="detail-value" style="font-family: monospace; background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: 4px;">${registrationId}</span>
              </div>
              <div style="clear: both; height: 10px;"></div>
              ${details.map(d => `
                <div class="detail-row">
                  <span class="detail-label">${d.label}:</span>
                  <span class="detail-value">${d.value}</span>
                </div>
                <div style="clear: both; height: 10px;"></div>
              `).join('')}
            </div>

            <div class="intro-text">
              Our organizing committee will review your submission details. Keep an eye on your inbox for further updates, schedules, and joining links!
              <br><br>
              <span style="display: block; padding: 12px; background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.15); border-radius: 6px; color: #ef4444; font-size: 13px; text-align: center; font-weight: 500;">
                ⚠️ Please do not reply directly to this email. This is an automated notification sent from an unmonitored mailbox.
              </span>
            </div>
          </div>
          <div class="footer-section">
            <div class="footer-logo">FUTURE FRONTIER 2026</div>
            <div class="footer-text">
              Organized by IET Hyderabad Local Network
              <br>
              Venue: T-Hub, Hyderabad
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  if (!resend) {
    console.log(`ℹ️ [SIMULATED EMAIL] Confirmation details to: ${toEmail}`, {
      leaderName,
      eventName,
      registrationId
    });
    return true;
  }

  try {
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    const senderName = process.env.RESEND_SENDER_NAME || 'No-Reply | Future Frontier 2026';

    console.log(`🚀 Sending email via Resend to ${toEmail}...`);
    const response = await resend.emails.send({
      from: `"${senderName}" <${fromEmail}>`,
      to: toEmail,
      replyTo: 'noreply.futuretechconclave@gmail.com',
      subject: `Registration Confirmed: ${eventName} - Future Frontier 2026`,
      html: htmlContent,
    });

    if (response.error) {
      throw new Error(response.error.message || JSON.stringify(response.error));
    }

    console.log(`📧 Confirmation email successfully sent via Resend API to ${toEmail}. Message ID: ${response.data?.id}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to send confirmation email to ${toEmail} via Resend:`, error.message);
    return false;
  }
};
