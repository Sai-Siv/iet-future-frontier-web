import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import { CalendarDays, Video,Presentation, Trophy, Clock } from 'lucide-react';

const PATNTimelineSection = () => {
  useEffect(() => {
    ScrollReveal().reveal('.timeline-header', {
      origin: 'top',
      distance: '50px',
      duration: 800,
      easing: 'ease-out',
    });

    ScrollReveal().reveal('.timeline-event', {
      origin: 'right',
      distance: '50px',
      duration: 800,
      easing: 'ease-out',
      interval: 200,
    });

    ScrollReveal().reveal('.presentation-format-box', {
      origin: 'bottom',
      distance: '50px',
      duration: 800,
      easing: 'ease-out',
    });
  }, []);

  return (
    <section className="timeline-container">
      <style>{`
        .timeline-container {
           font-family: 'Europa', Arial, sans-serif;
          min-height: 100vh;
          font-size: 1.3rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 3rem 1rem;
          background: #000;
          color: white;
        }

        .timeline-header {
          text-align: center;
          max-width: 64rem;
          width: 100%;
          margin-bottom: 4rem;
        }

        .timeline-header h1 {
          font-size: 2.5rem;
          font-weight: 800;
        }

        .timeline-header p {
          margin-top: 0.75rem;
          font-size: 1.125rem;
          color: #a0aec0;
        }

        .timeline-main {
          position: relative;
          max-width: 64rem;
          width: 100%;
        }

        .timeline-event {
          display: flex;
          position: relative;
          margin-bottom: 3rem;
          z-index: 10;
        }

        .timeline-icon-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 30px;
          margin-right: 1rem;
          position: relative;
        }

        .timeline-icon {
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          z-index: 20;
          flex-shrink: 0;
        }

        .timeline-yellow {
          background: linear-gradient(145deg, #22BBE0, #0b4c5f);
          color: white;
        }

        .timeline-connector {
          position: absolute;
          left: 50%;
          top: 3.5rem;
          width: 3px;
          height: calc(100% + 3rem);
          background-color: #fff;
          transform: translateX(-50%);
          z-index: 10;
        }

        .timeline-event:last-child .timeline-connector {
          display: none;
        }

        .timeline-content {
          background-color: #0a0a0a;
          border-radius: 0.5rem;
          padding: 1rem;
          flex: 1;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .timeline-title {
          display: flex;
          justify-content: space-between;
          align-items: start;
        }

        .timeline-title h2 {
          font-size: 1.3rem;
          font-weight: 700;
          color: white;
        }

        .timeline-date {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: #a0aec0;
          border: 1px solid #374151;
          border-radius: 9999px;
          padding: 0.25rem 0.75rem;
        }

        .timeline-desc {
          margin-top: 0.5rem;
          font-size: 1rem;
          color: #a0aec0;
          line-height: 1.6;
        }

        .presentation-format-box {
          background: #0a0a0a;
          box-shadow: 0 0 25px rgba(6, 182, 212, 0.4);
          border-radius: 1rem;
          padding: 2rem;
          max-width: 40rem;
          width: 100%;
          text-align: center;
          margin: 3rem auto 0;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .presentation-format-box:hover {
          transform: translateY(-5px);
          box-shadow: 0 0 40px rgba(6, 182, 212, 0.6);
        }

        .presentation-format-box svg {
          color: #22BBE0;
          width: 3rem;
          height: 3rem;
          margin-bottom: 1rem;
        }

        .presentation-format-box h2 {
          color: #ffffff;
          font-weight: 700;
          font-size: 1.75rem;
          margin-bottom: 1rem;
        }

        .presentation-format-box p {
          color: #e2e8f0;
          font-size: 1rem;
          margin-bottom: 0.5rem;
          line-height: 1.5;
        }

        .highlight {
          color: #22BBE0;
          font-weight: 700;
          font-size: 1.1rem;
        }
          .icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
}
      `}</style>

      <div className="timeline-header">
        <h1>Event Timeline</h1>
        <p>Follow these important dates to participate in PATN 2025</p>
      </div>

      <div className="timeline-main">
        {/* Event 1 */}
        <div className="timeline-event">
          <div className="timeline-icon-wrapper">
            <div className="timeline-icon timeline-yellow">
              <Video />
            </div>
            <div className="timeline-connector"></div>
          </div>
          <div className="timeline-content">
            <div className="timeline-title">
              <h2>Registration Deadline</h2>
              <div className="timeline-date">
                <CalendarDays size={16} />
                <span>July 20, 2025</span>
              </div>
            </div>
            <p className="timeline-desc">
              Last date to submit your 3-minute video presentation on YouTube
            </p>
          </div>
        </div>

        {/* Event 2 */}
        <div className="timeline-event">
          <div className="timeline-icon-wrapper">
            <div className="timeline-icon timeline-yellow">
            <Presentation />
              
            </div>
            <div className="timeline-connector"></div>
          </div>
          <div className="timeline-content">
            <div className="timeline-title">
              <h2>Zonal Level (Local Heats)</h2>
              <div className="timeline-date">
                <CalendarDays size={16} />
                <span>August 2, 2025</span>
              </div>
            </div>
            <p className="timeline-desc">
              Present in person at your respective zonal center
            </p>
          </div>
        </div>

        {/* Event 3 */}
        <div className="timeline-event">
          <div className="timeline-icon-wrapper">
            <div className="timeline-icon timeline-yellow">
              <Trophy />
            </div>
          </div>
          <div className="timeline-content">
            <div className="timeline-title">
              <h2>Grand Finale</h2>
              <div className="timeline-date">
                <CalendarDays size={16} />
                <span>October 11, 2025</span>
              </div>
            </div>
            <p className="timeline-desc">
              Final competition at T-Hub, Hyderabad
            </p>
          </div>
        </div>

        {/* Presentation Format Box */}
        <div className="presentation-format-box">
  <div className="icon-container">
    <Clock />
  </div>
  <h2>Presentation Format</h2>
  <p><span className="highlight">10 minutes</span> presentation</p>
  <p><span className="highlight">5 minutes</span> Q&amp;A session</p>
  <p>Present on any engineering or technology topic of your choice</p>
</div>
      </div>
    </section>
  );
};

export default PATNTimelineSection;
