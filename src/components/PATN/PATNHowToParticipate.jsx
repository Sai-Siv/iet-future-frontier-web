import React, { useEffect } from 'react';
import { faVideo, faChalkboardTeacher, faTrophy, faCalendarAlt, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ScrollReveal from 'scrollreveal';

const PATNHowToParticipate = () => {
  useEffect(() => {
    ScrollReveal().reveal('.participate-header', { origin: 'top', distance: '20px', duration: 1000, delay: 100 });
    ScrollReveal().reveal('.step-section', { origin: 'bottom', distance: '40px', duration: 1000, interval: 200 });
  }, []);

  return (
    <section className="participate-container">
      <style>{`
        .participate-container {
          font-family: 'Europa', Arial, sans-serif;
          padding: 60px 20px;
          color: #fff;
        }
        .participate-header {
          text-align: center;
          margin-bottom: 50px;
        }
        .participate-header h1 {
          font-size: 3rem;
          font-weight: 900;
          text-shadow: 2px 2px #000;
        }
        .participate-header p {
          color: #e2e8f0;
          font-size: 1.125rem;
        }
        .steps {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .step-section {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 20px;
          border-radius: 20px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
          transition: transform 0.3s ease;
        }
        .step-section:hover {
          transform: translateY(-5px);
        }
        .step-content {
          background-color: #0a0a0a;
          border-radius: 15px;
          padding: 30px;
          flex: 1;
          box-shadow: 0 0 40px rgba(6, 182, 212, 0.6);
        }
        .step-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 20px;
        }
        .step-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(145deg, #22BBE0, #0b4c5f);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          color: #fff;
          font-size: 20px;
          box-shadow: 0 4px 8px rgba(34, 187, 224, 0.3);
        }
        .step-label {
          display: inline-block;
          background-color: #0b4c5f;
          color: #22BBE0;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 9999px;
          margin-bottom: 4px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .step-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #f1f5f9;
        }
        .step-date {
          color: #facc15;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
          font-size: 0.95rem;
        }
        .step-content p {
          color: #cbd5e1;
          font-size: 1.05rem;
          margin-bottom: 16px;
        }
        .step-content ul {
          padding-left: 20px;
          list-style: none;
        }
        .step-content ul li::before {
          content: '✔';
          color: #22BBE0;
          display: inline-block;
          width: 1em;
          margin-left: -1em;
          font-weight: bold;
        }
        .step-content ul li {
          color: #cbd5e1;
          font-size: 1rem;
          margin-bottom: 10px;
        }
        .step-number {
          background: linear-gradient(145deg, #22BBE0, #0b4c5f);
          width: 64px;
          height: 64px;
          border-radius: 50%;
          font-weight: 900;
          font-size: 1.4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          box-shadow: 0 4px 10px rgba(0, 210, 255, 0.4);
        }
        .arrow {
          font-size: 1.8rem;
          color: #22BBE0;
          transform: scaleX(1.2);
        }
        
        @media (max-width: 768px) {
          .step-section {
            flex-direction: column;
            text-align: center;
          }
          .step-section .step-number,
          .step-section .arrow {
            order: -1;
          }
          .step-content {
            width: 100%;
          }
          .arrow {
            display: none;
          }
          .line-connector {
            width: 90%;
          }
        }
      `}</style>

      <div className="participate-header">
        <h1>How to Participate</h1>
        <p>Follow these three simple steps to showcase your technical expertise</p>
      </div>

      <div className="steps">
        {/* Step 1 */}
        <div className="step-section">
          <div className="step-number">01</div>
          <div className="arrow"><FontAwesomeIcon icon={faArrowLeft} /></div>
          <div className="step-content">
            <div className="step-header">
              <div className="step-icon"><FontAwesomeIcon icon={faVideo} /></div>
              <div>
                <span className="step-label">Step 01</span>
                <div className="step-title">Video Submission</div>
              </div>
            </div>
            <p className="step-date"><FontAwesomeIcon icon={faCalendarAlt} /> July 20, 2025</p>
            <p>Record a 3-minute video on any engineering or technology topic of your choice and upload it to YouTube as Unlisted.</p>
            <ul>
              <li>Choose any engineering/technology topic</li>
              <li>Maximum 3 minutes duration</li>
              <li>Upload to YouTube as Unlisted</li>
              <li>Include the YouTube link in registration</li>
            </ul>
          </div>
        </div>

        <div className="line-connector"></div>

        {/* Step 2 */}
        <div className="step-section">
          <div className="step-content">
            <div className="step-header">
              <div className="step-icon" style={{ backgroundColor: '#22BBE0' }}>
                <FontAwesomeIcon icon={faChalkboardTeacher} />
              </div>
              <div>
                <span className="step-label">Step 02</span>
                <div className="step-title">Zonal Round</div>
              </div>
            </div>
            <p className="step-date"><FontAwesomeIcon icon={faCalendarAlt} /> August 2, 2025</p>
            <p>If shortlisted, present in person at your respective zonal center in front of a jury panel.</p>
            <ul>
              <li>10-minute presentation</li>
              <li>5-minute Q&amp;A session</li>
              <li>Present at your regional center</li>
              <li>Physical certificates awarded</li>
            </ul>
          </div>
          <div className="arrow"><FontAwesomeIcon icon={faArrowRight} /></div>
          <div className="step-number">02</div>
        </div>

        <div className="line-connector"></div>

        {/* Step 3 */}
        <div className="step-section">
          <div className="step-number">03</div>
          <div className="arrow"><FontAwesomeIcon icon={faArrowLeft} /></div>
          <div className="step-content">
            <div className="step-header">
              <div className="step-icon" style={{ backgroundColor: '#f44336' }}>
                <FontAwesomeIcon icon={faTrophy} />
              </div>
              <div>
                <span className="step-label">Step 03</span>
                <div className="step-title">Grand Finale</div>
              </div>
            </div>
            <p className="step-date"><FontAwesomeIcon icon={faCalendarAlt} /> October 11, 2025</p>
            <p>Finalists compete at the main event in Hyderabad for the championship title and prizes.</p>
            <ul>
              <li>Showcase your skills on a bigger stage</li>
              <li>Network with industry professionals</li>
              <li>Win prizes and recognition</li>
              <li>Enhance your professional portfolio</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PATNHowToParticipate;
