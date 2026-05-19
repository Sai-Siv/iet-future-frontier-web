import nodemailer from 'nodemailer';
import dns from 'dns';

// Force Node.js globally to resolve domains using IPv4 first (prevents ENETUNREACH IPv6 errors on Render!)
dns.setDefaultResultOrder('ipv4first');

// Helper to initialize the Nodemailer transporter safely
const getTransporter = () => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    console.warn('⚠️ WARNING: EMAIL_USER or EMAIL_PASS environment variables are missing. Nodemailer SMTP will not be available.');
    return null;
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for port 465 SSL
    family: 4,     // Forces Nodemailer to resolve and use IPv4 instead of IPv6!
    auth: {
      user: user,
      pass: pass, // Gmail App Password (16 characters)
    },
    tls: {
      rejectUnauthorized: false
    },
    connectionTimeout: 15000, // Increase slightly for slower networks
    greetingTimeout: 15000,
    socketTimeout: 15000
  });

  return transporter;
};

/**
 * Sends a premium registration confirmation email to the participant / leader
 * @param {Object} params
 * @param {string} params.toEmail - Recipient email address
 * @param {string} params.leaderName - Name of the team leader/participant
 * @param {string} params.eventName - Name of the event (e.g. PATN, InnoThon, etc.)
 * @param {string} params.registrationId - Generated Registration ID
 * @param {Array<{label: string, value: string}>} params.details - Key details rows to display
 */
export const sendConfirmationEmail = async ({ toEmail, leaderName, eventName, registrationId, details = [] }) => {
  // Premium Dark-Futuristic Responsive HTML template matching Future Frontier theme
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Registration Confirmed - Future Frontier 2025</title>
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
            <p>IET Future Frontier 2025</p>
          </div>
          <div class="content-body">
            <div class="greeting">Hello ${leaderName || 'Participant'},</div>
            <div class="intro-text">
              We are absolutely thrilled to confirm your registration for <strong>${eventName}</strong> at IET Hyderabad's flagship <strong>Future Technology Conclave 2025</strong>! 🚀
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
            <div class="footer-logo">FUTURE FRONTIER 2025</div>
            <div class="footer-text">
              Organized by IET Hyderabad Local Network & NIT Warangal
              <br>
              Venue: T-Hub, Hyderabad
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  // 1. Try Resend HTTP API first if RESEND_API_KEY is configured
  // This uses HTTP/HTTPS (Port 443) which bypasses Render Free Tier's outbound SMTP blocking!
  if (process.env.RESEND_API_KEY) {
    if (typeof fetch === 'undefined') {
      console.warn('⚠️ WARNING: RESEND_API_KEY is configured, but global fetch is not available in this Node version. Falling back to Nodemailer SMTP.');
    } else {
      console.log(`🚀 RESEND_API_KEY detected. Sending email via Resend API (HTTP/HTTPS)...`);
      try {
        const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
        const senderName = process.env.RESEND_SENDER_NAME || 'No-Reply | Future Frontier 2025';
        
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: `"${senderName}" <${fromEmail}>`,
            to: toEmail,
            reply_to: 'noreply.futuretechconclave@gmail.com',
            subject: `Registration Confirmed: ${eventName} - Future Frontier 2025`,
            html: htmlContent,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          console.log(`📧 Confirmation email successfully sent via Resend API to ${toEmail}. Message ID: ${data.id}`);
          return true;
        } else {
          console.error(`❌ Resend API Error:`, data);
          console.log('⚠️ Falling back to Nodemailer SMTP...');
        }
      } catch (resendError) {
        console.error(`❌ Failed to send via Resend API:`, resendError.message);
        console.log('⚠️ Falling back to Nodemailer SMTP...');
      }
    }
  }

  // 2. Fallback to Nodemailer SMTP (works perfectly locally, but will timeout on Render Free Tier due to SMTP block)
  const transporter = getTransporter();

  if (!transporter) {
    console.log(`ℹ️ [SIMULATED EMAIL] Confirmation details to: ${toEmail}`, {
      leaderName,
      eventName,
      registrationId
    });
    return true;
  }

  try {
    const mailOptions = {
      from: `"No-Reply | Future Frontier 2025" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      replyTo: 'noreply.futuretechconclave@gmail.com',
      subject: `Registration Confirmed: ${eventName} - Future Frontier 2025`,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`📧 Confirmation email successfully sent via Nodemailer to ${toEmail}. Message ID: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to send confirmation email to ${toEmail} via Nodemailer SMTP:`, error.message);
    
    // Check if the error looks like a connection timeout or network block
    if (
      error.message.includes('timeout') ||
      error.message.includes('ETIMEDOUT') ||
      error.code === 'ETIMEDOUT' ||
      error.message.includes('connection')
    ) {
      console.error(
        `💡 TROUBLESHOOTING TIP:\n` +
        `-------------------------------------------------------------------------------------------------\n` +
        `If your application is hosted on Render (Free Tier), outbound SMTP traffic (ports 25, 465, and 587)\n` +
        `is completely blocked by Render's firewall to prevent spam.\n\n` +
        `TO FIX THIS WITHOUT PAYING:\n` +
        `1. Create a free account at Resend (https://resend.com) - it takes 1 minute.\n` +
        `2. Get your free API key.\n` +
        `3. Add the 'RESEND_API_KEY' environment variable to your Render service / .env file.\n` +
        `This will automatically switch the email helper to use Resend's HTTP API (Port 443), which works\n` +
        `perfectly on Render Free Tier and never times out!\n` +
        `-------------------------------------------------------------------------------------------------`
      );
    }
    return false;
  }
};

