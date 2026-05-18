import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import PATNHeroSection from '../components/PATN/PATNHeroSection';
import PATNAboutSection from '../components/PATN/PATNAboutSection';
import PATNTimelineSection from '../components/PATN/PATNTimelineSection';
import PATNEvaluationSection from '../components/PATN/PATNEvaluationSection';
import PATNPrizesSection from '../components/PATN/PATNPrizesSection';
import PATNHowToParticipate from '../components/PATN/PATNHowToParticipate';
import PATNCallToAction from '@/components/PATN/PATNCallToAction';
import PATNEventDetails from '@/components/PATN/PATNEventDetailes';
import PATNzonalCenters from '../components/PATN/PATNzonalCenters';
import { useTheme } from '../contexts/ThemeContext';

const PATN = () => {
  const { isDark } = useTheme();

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        {/* Glowing Dots */}
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-glow"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  opacity: Math.random() * 0.2 + 0.1,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 fade-wrapper">
        <Navigation />
        <PATNHeroSection />
        <PATNAboutSection />
        <PATNEvaluationSection />
        <PATNTimelineSection />
        <PATNHowToParticipate />
        <PATNzonalCenters />
        <PATNEventDetails />
        <PATNPrizesSection />
        <PATNCallToAction />
        <Footer />
      </div>

      {/* Global Styles */}
      <style>{`
        @keyframes glow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.5); }
        }

        .animate-glow {
          animation: glow 3s infinite;
        }

        .glass-card {
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 
            0 4px 24px -1px rgba(255, 255, 255, 0.05),
            0 0 1px 0 rgba(255, 255, 255, 0.05);
          opacity: 0;
          animation: fadeInCard 0.8s ease forwards;
          animation-delay: 0.2s;
        }

        h2, h3 {
          color: #ffffff;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
        }

        .primary-button {
          background: linear-gradient(135deg, #ffffff 0%, #888888 100%);
          color: black;
          transition: all 0.3s ease;
          box-shadow: 0 4px 14px -1px rgba(255, 255, 255, 0.1);
        }

        .primary-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px -2px rgba(255, 255, 255, 0.2);
        }

        .hover-link {
          color: #ffffff;
          transition: all 0.3s ease;
          position: relative;
        }

        .hover-link:after {
          content: '';
          position: absolute;
          width: 0;
          height: 1px;
          bottom: -2px;
          left: 0;
          background: #ffffff;
          transition: width 0.3s ease;
        }

        .hover-link:hover:after {
          width: 100%;
        }

        section {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.6s ease forwards;
          animation-delay: 0.2s;
        }

        .fade-wrapper {
          opacity: 0;
          animation: fadeInWrapper 0.8s ease forwards;
          animation-delay: 0.2s;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInCard {
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInWrapper {
          to {
            opacity: 1;
          }
        }

        .scroll-progress {
          position: fixed;
          top: 0;
          left: 0;
          height: 2px;
          background: linear-gradient(to right, white, gray);
          z-index: 100;
          transition: width 0.2s ease;
        }
      `}</style>
    </div>
  );
};

export default PATN;
