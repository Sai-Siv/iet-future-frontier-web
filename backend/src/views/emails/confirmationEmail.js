const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

// Names and team names are user input, so they must not be able to inject markup into the email.
const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ESCAPES[char]);

export const renderConfirmationEmail = ({ leaderName, eventName, registrationId, details = [] }) => {
  const safeName = escapeHtml(leaderName || 'Participant');
  const safeEvent = escapeHtml(eventName);
  const safeId = escapeHtml(registrationId);

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Registration Confirmed - IET 360° (IET 360 Degree)</title>
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
            <p>IET 360° &bull; One Platform. Infinite Possibilities.</p>
          </div>
          <div class="content-body">
            <div class="greeting">Hello ${safeName},</div>
            <div class="intro-text">
              We are pleased to confirm your registration for <strong>${safeEvent}</strong> at IET Hyderabad's flagship <strong>IET 360° (IET 360 Degree)</strong>! 🚀
              <br><br>
              Your registration has been successfully recorded in our database. Below are the key details of your entry:
            </div>
            
            <div class="details-card">
              <h3>Registration Summary</h3>
              <div class="detail-row">
                <span class="detail-label">Event:</span>
                <span class="detail-value" style="color: #a046b4; font-weight: bold;">${safeEvent}</span>
              </div>
              <div style="clear: both; height: 10px;"></div>
              <div class="detail-row">
                <span class="detail-label">Registration ID:</span>
                <span class="detail-value" style="font-family: monospace; background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: 4px;">${safeId}</span>
              </div>
              <div style="clear: both; height: 10px;"></div>
              ${details.map(d => `
                <div class="detail-row">
                  <span class="detail-label">${escapeHtml(d.label)}:</span>
                  <span class="detail-value">${escapeHtml(d.value)}</span>
                </div>
                <div style="clear: both; height: 10px;"></div>
              `).join('')}
            </div>

            <div class="intro-text">
              Our organizing committee will review your submission details. Keep an eye on your inbox for further updates and schedules!
              <br><br>
              <span style="display: block; padding: 12px; background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.15); border-radius: 6px; color: #ef4444; font-size: 13px; text-align: center; font-weight: 500;">
                ⚠️ Please do not reply directly to this email. This is an automated notification.
              </span>
            </div>
          </div>
          <div class="footer-section">
            <div class="footer-logo">IET 360°</div>
            <div class="footer-text">
              Organized by IET Hyderabad Local Network
              <br>
              Venue: VIT-AP University, Amaravati, Andhra Pradesh (4 & 5 December 2026)
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};
