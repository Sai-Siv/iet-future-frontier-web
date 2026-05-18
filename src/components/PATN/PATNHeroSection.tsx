import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from 'scrollreveal';
import { Calendar, MapPin, Trophy } from 'lucide-react';

const PATNHeroSection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Configure ScrollReveal animations
    ScrollReveal().reveal('.patn-event-badge', {
      origin: 'top',
      distance: '30px',
      duration: 800,
      delay: 100,
      easing: 'ease-in-out',
      scale: 0.9,
      beforeReveal: (el) => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(-30px) scale(0.9)';
      },
      afterReveal: (el) => {
        el.style.opacity = 1;
        el.style.transform = 'translateY(0) scale(1)';
      }
    });

    ScrollReveal().reveal('.patn-title-main, .patn-description', {
      origin: 'top',
      distance: '30px',
      duration: 1000,
      delay: 200,
      easing: 'ease-in-out',
      interval: 100,
    });

    ScrollReveal().reveal('.patn-event-info-item, .patn-prize-title, .patn-prize-subtext', {
      origin: 'bottom',
      distance: '30px',
      duration: 1000,
      delay: 300,
      easing: 'ease-in-out',
      interval: 100,
    });

    ScrollReveal().reveal('.patn-btn-register', {
      origin: 'bottom',
      distance: '20px',
      duration: 1000,
      delay: 500,
      scale: 0.9,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <>
      <style>
        {`
          .patn-hero-wrapper {
            position: relative;
            width: 100%;
            font-family: 'Europa', Arial, sans-serif;
            color: white;
            overflow-x: hidden;
            padding: 20px 0;
          }

          .patn-content-container {
            max-width: 1200px;
            margin: 0 auto;
            text-align: center;
            position: relative;
            z-index: 1;
          }

          .patn-circle-bg-1,
          .patn-circle-bg-2,
          .patn-circle-bg-3 {
            position: absolute;
            border-radius: 50%;
            background-color: #003A66;
            z-index: 0;
            opacity: 0.4;
            filter: blur(40px);
          }

          .patn-circle-bg-1 {
            top: 5vh;
            left: 5vw;
            width: 15vw;
            height: 15vw;
          }

          .patn-circle-bg-2 {
            bottom: 5vh;
            right: 5vw;
            width: 12vw;
            height: 12vw;
          }

          .patn-circle-bg-3 {
            top: 45%;
            left: 2vw;
            width: 10vw;
            height: 10vw;
          }

          .patn-event-badge {
            display: inline-flex;
            align-items: center;
            background-color: #facc15;
            color: black;
            padding: 0.5rem 1.25rem;
            border-radius: 9999px;
            margin-bottom: 2rem;
            margin-top: 85px;
            font-weight: bold;
            font-size: 1.125rem;
            user-select: none;
            box-shadow: 0 4px 15px rgba(255, 255, 0, 0.3);
            gap: 0.75rem;
            opacity: 0; /* Initial state for animation */
            transform: translateY(-30px) scale(0.9);
            transition: opacity 0.8s ease, transform 0.8s ease;
          }

          .patn-title-main {
            font-size: 3.5rem;
            font-weight: 700;
            line-height: 1.2;
            margin-bottom: 0.5rem;
            background: linear-gradient(to right, #ffffff, #22BBE0);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .patn-description {
            font-size: 1.125rem;
            color: #ffffff;
            margin-bottom: 2rem;
            max-width: 72rem;
            margin-left: auto;
            margin-right: auto;
          }

          .patn-event-info {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 2rem;
            margin-bottom: 2.5rem;
            font-size: 1rem;
          }

          .patn-event-info-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #22BBE0;
          }

          .patn-event-info-item span {
            color: white;
          }

          .patn-prize-title {
            font-size: 1.5rem;
            font-weight: 800;
            color: #facc15;
            margin-bottom: 0.25rem;
          }

          .patn-prize-subtext {
            font-family: 'Europa', Arial, sans-serif;
            font-weight: bold;
            font-size: 1.2rem;
            color: #fcfcfc;
            margin-bottom: 2.5rem;
          }

          .patn-btn-register {
            background: linear-gradient(to right, #ffffff, #22BBE0);
            color: black;
            font-size: 1.125rem;
            font-weight: 800;
            padding: 0.75rem 2rem;
            border-radius: 0.5rem;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            display: inline-block;
            margin-bottom: 3.5rem;
            box-shadow: 0 10px 25px rgba(34, 187, 224, 0.4);
            cursor: pointer;
            border: none;
          }

          .patn-btn-register:hover {
            transform: scale(1.05);
            box-shadow: 0 15px 35px rgba(34, 187, 224, 0.6);
          }
        `}
      </style>

      <div className="patn-hero-wrapper">
        {/* Background Circles */}
        <div className="patn-circle-bg-1"></div>
        <div className="patn-circle-bg-2"></div>
        <div className="patn-circle-bg-3"></div>

        {/* Main Content */}
        <div className="patn-content-container">
          <div className="patn-event-badge">
            <Trophy size={20} strokeWidth={2.5} color="black" />
            PATN 2025
          </div>

          <h1 className="patn-title-main">Present Around the Network</h1>

          <p className="patn-description">
            A prestigious platform for students and young professionals to showcase their technical knowledge and presentation skills.
          </p>

          <div className="patn-event-info">
            <div className="patn-event-info-item">
              <Calendar size={18} />
              <span>Oct 11, 2025</span>
            </div>
            <div className="patn-event-info-item">
              <MapPin size={18} />
              <span>T-Hub, Hyderabad</span>
            </div>
          </div>

          <h2 className="patn-prize-title">Total Prize Money: ₹15,000</h2>
          <p className="patn-prize-subtext">
            Winner: <span style={{ color: 'white' }}>₹10,000</span> | Runner-up: <span style={{ color: 'white' }}>₹5,000</span>
          </p>

          <button className="patn-btn-register" onClick={() => navigate('/patn/register')}>
            Register Now - Free Entry
          </button>
        </div>
      </div>
    </>
  );
};

export default PATNHeroSection;