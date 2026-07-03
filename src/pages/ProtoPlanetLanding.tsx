import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Cpu, Rocket, BrainCircuit, Leaf, Wifi, HeartPulse, Trophy, Calendar, Users, IndianRupee, Flag, Laptop,
  Mail, Instagram, Twitter, ArrowRight, Network, Smartphone, Gauge, Lightbulb, Award, Bookmark,
  ShieldCheck, ClipboardCheck, Phone, CalendarDays, ChevronRight, ArrowUp, Home
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const ProtoPlanetLanding = () => {
  const navigate = useNavigate();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isScrollingToTop, setIsScrollingToTop] = useState(false);

  const handleRegister = () => {
    navigate('/protoplanet/register');
  };

  const handleBackToTop = () => {
    setIsScrollingToTop(true);
    setShowBackToTop(false); // Hide button immediately when clicked

    const startingY = window.pageYOffset;
    const duration = 800; // Animation duration in ms
    const startTime = performance.now();

    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const scrollStep = (timestamp) => {
      const currentTime = timestamp - startTime;
      const progress = Math.min(currentTime / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      window.scrollTo(0, startingY * (1 - easedProgress));

      if (currentTime < duration) {
        requestAnimationFrame(scrollStep);
      } else {
        setIsScrollingToTop(false);
        // Show button again after a delay if user has scrolled down
        setTimeout(() => {
          if (window.pageYOffset > 300) {
            setShowBackToTop(true);
          }
        }, 1000);
      }
    };

    requestAnimationFrame(scrollStep);
  };

  const handleScroll = () => {
    if (!isScrollingToTop) {
      const scrollTop = window.pageYOffset;
      setShowBackToTop(scrollTop > 300);
    }
  };

  useEffect(() => {
    // Typing effect for the header
    const words = [
      { id: "hardware", text: "Hardware " },
      { id: "innovation", text: "Innovation " },
      { id: "sprint", text: "Challenge" }
    ];

    const typingSpeed = 150;
    const erasingSpeed = 100;
    const delayBetweenWords = 400;
    const delayBeforeErase = 1500;

    let wordIndex = 0;
    let charIndex = 0;
    let isErasing = false;

    let currentText = {
      hardware: "",
      innovation: "",
      sprint: ""
    };

    const type = () => {
      const currentWord = words[wordIndex];
      const el = document.getElementById(currentWord.id);

      if (!isErasing) {
        if (charIndex < currentWord.text.length) {
          currentText[currentWord.id] += currentWord.text.charAt(charIndex);
          el.textContent = currentText[currentWord.id];
          charIndex++;
          setTimeout(type, typingSpeed);
        } else {
          wordIndex++;
          charIndex = 0;
          if (wordIndex < words.length) {
            setTimeout(type, delayBetweenWords);
          } else {
            setTimeout(() => {
              isErasing = true;
              wordIndex = words.length - 1;
              charIndex = currentText[words[wordIndex].id].length;
              type();
            }, delayBeforeErase);
          }
        }
      } else {
        if (charIndex > 0) {
          currentText[words[wordIndex].id] = currentText[words[wordIndex].id].substring(0, charIndex - 1);
          document.getElementById(words[wordIndex].id).textContent = currentText[words[wordIndex].id];
          charIndex--;
          setTimeout(type, erasingSpeed);
        } else {
          wordIndex--;
          if (wordIndex >= 0) {
            charIndex = currentText[words[wordIndex].id].length;
            setTimeout(type, erasingSpeed);
          } else {
            isErasing = false;
            wordIndex = 0;
            charIndex = 0;
            currentText = { hardware: "", innovation: "", sprint: "" };
            setTimeout(type, typingSpeed);
          }
        }
      }
    };

    setTimeout(type, 1000);

    // Tab switching functionality
    const trackTabs = document.querySelectorAll('.track-tab');
    const trackContents = document.querySelectorAll('.track-content');

    trackTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetTrack = tab.getAttribute('data-track');

        // Remove active class from all tabs and contents
        trackTabs.forEach(t => t.classList.remove('active'));
        trackContents.forEach(c => c.classList.remove('active'));

        // Add active class to clicked tab and corresponding content
        tab.classList.add('active');
        const targetContent = document.getElementById(targetTrack);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      });
    });

    // Animation on scroll
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-section');
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) {
          element.classList.add('animated');

          // Animate list items if present
          const lists = element.querySelectorAll('.content-list');
          lists.forEach(list => list.classList.add('animated'));
        }
      });
    };

    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('scroll', handleScroll);
    animateOnScroll(); // Run once on load

    return () => {
      window.removeEventListener('scroll', animateOnScroll);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Navigation />
      <div className="proto-planet-landing">

        {/* Breadcrumb Navigation */}
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-item">
            <Home size={16} />
            <span>Home</span>
          </Link>
          <ChevronRight size={16} className="breadcrumb-separator" />
          <Link to="/events" className="breadcrumb-item">
            <span>Events</span>
          </Link>
          <ChevronRight size={16} className="breadcrumb-separator" />
          <span className="breadcrumb-item active">
            <span>ProtoPlanet</span>
          </span>
        </div>

        <style>{`
          html, body {
            margin: 0;
            padding: 0;
            min-height: 100vh;
            background-color: #000000 !important;
          }

          .proto-planet-landing {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
           
            padding: 1rem;
            padding-bottom: 50px;
            box-sizing: border-box;
          }

          .header-content {
            text-align: left;
            margin-bottom: 3rem;
            opacity: 0;
            transform: translateY(-50px);
            transition: all 1s ease-out;
            font-family: 'Times New Roman', Times, serif !important;
          }

          .header-content.animated {
            opacity: 1;
            transform: translateY(0);
          }

          h1, h2, h3, h4, h5, h6 {
            font-family: 'Times New Roman', Times, serif !important;
          }

          h1 {
            font-weight: 800;
            font-size: 4.5rem;
            line-height: 1.1;
            margin: 0;
            font-family: 'Times New Roman', Times, serif !important;
          }

          h2 {
            margin-top: 0.5rem;
            font-weight: 800;
            font-size: 1.875rem;
            margin: 0.5rem 0;
            color: white;
            white-space: nowrap;
            font-family: 'Times New Roman', Times, serif !important;
          }

          .highlight {
            color: #a046b4;
          }

          .typing-wrapper-container {
            display: inline-block;
            min-width: 260px;
            max-width: 100%;
            overflow-wrap: break-word;
            white-space: normal;
            line-height: 1.4;
          }

          .info-box-container {
            display: flex;
            justify-content: center;
            width: 100%;
            margin-top: 60px;
            margin-bottom: 60px;
          }

          .info-box {
            margin-top: 1rem;
            max-width: 50rem;
            width: 100%;
            border-radius: 1rem;
            padding: 1.5rem;
            display: flex;
            justify-content: space-around;
            align-items: center;
            gap: 1.5rem;
            box-shadow: 0 0 20px 2px #a046b4;
            opacity: 0;
            transform: scale(0.9);
            transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            background: rgba(15, 15, 15, 0.8);
            backdrop-filter: blur(10px);
            font-family: 'Times New Roman', Times, serif !important;
          }

          .info-box.animated {
            opacity: 1;
            transform: scale(1);
          }

          .content-box {
            margin-top: 1rem;
            max-width: 50rem;
            width: 100%;
            border-radius: 1rem;
            padding: 1.5rem;
            box-shadow: 0 0 20px 2px #a046b4;
            opacity: 0;
            transition: all 0.8s ease-out;
            transform: translateY(30px);
          }

          .content-box.animated {
            opacity: 1;
            transform: translateY(0) translateX(0);
          }

          .content-heading {
            color: white;
            font-size: 2rem;
            font-weight: bold;
            margin-bottom: 1rem;
            text-align: center;
            border-bottom: 2px solid #a046b4;
            padding-bottom: 0.5rem;
            font-family: 'Times New Roman', Times, serif !important;
          }

          .content-text {
            color: white;
            line-height: 1.6;
            font-size: 1.1rem;
            font-family: 'Times New Roman', Times, serif !important;
          }

          .content-list {
            color: white;
            padding-left: 1.5rem;
            line-height: 1.6;
            font-size: 1.2rem;
            font-family: 'Times New Roman', Times, serif !important;
          }

          .content-list li {
            opacity: 0;
            transform: translateX(-20px);
            transition: all 0.4s ease-out;
            margin-bottom: 0.5rem;
            display: flex;
            align-items: flex-start;
            font-family: 'Times New Roman', Times, serif !important;
          }

          .content-list.animated li {
            opacity: 1;
            transform: translateX(0);
          }

          .content-list.animated li:nth-child(1) { transition-delay: 0.1s; }
          .content-list.animated li:nth-child(2) { transition-delay: 0.2s; }
          .content-list.animated li:nth-child(3) { transition-delay: 0.3s; }
          .content-list.animated li:nth-child(4) { transition-delay: 0.4s; }
          .content-list.animated li:nth-child(5) { transition-delay: 0.5s; }
          .content-list.animated li:nth-child(6) { transition-delay: 0.6s; }

          .two-column {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
          }

          .three-column {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 1.5rem;
          }

          .four-column {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
          }

          .info-item {
            display: flex;
            align-items: center;
            gap: 1rem;
          }

          .icon-container {
            background-color: #6b7280;
            padding: 0.75rem;
            border-radius: 0.375rem;
            color: black;
            font-size: 1.25rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(135deg, #a046b4 0%, #6a0dad 100%);
          }

          .icon-container svg {
            width: 1.5rem;
            height: 1.5rem;
            color: white;
          }

          .info-text {
            text-align: left;
            font-family: 'Times New Roman', Times, serif !important;
          }

          .info-text p {
            margin: 0;
            font-family: 'Times New Roman', Times, serif !important;
          }

          .info-text .label {
            font-size: 0.875rem;
            color: #d1d5db;
            font-family: 'Times New Roman', Times, serif !important;
          }

          .info-text .value {
            font-weight: bold;
            color: white;
            font-family: 'Times New Roman', Times, serif !important;
          }

          .content-heading.no-border {
            border-bottom: none !important;
            padding-bottom: 0 !important;
          }

          .track-card {
            background-color: rgba(0, 0, 0, 0.2);
            border-radius: 0.5rem;
            padding: 1rem;
            margin-bottom: 1rem;
            border-left: 4px solid #a046b4;
            transition: all 0.6s ease-out;
            opacity: 0;
            transform: translateY(30px);
            font-family: 'Times New Roman', Times, serif !important;
          }

          .track-card.animated {
            opacity: 1;
            transform: translateY(0);
          }

          .level-card {
            background-color: rgba(0, 0, 0, 0.2);
            border-radius: 0.5rem;
            padding: 1rem;
            margin-bottom: 1rem;
            border-top: 4px solid #a046b4;
            transition: all 0.6s ease-out;
            opacity: 0;
            transform: translateY(30px);
            font-family: 'Times New Roman', Times, serif !important;
          }

          .level-card.animated {
            opacity: 1;
            transform: translateY(0);
          }

          .level-title {
            color: #a046b4;
            font-weight: bold;
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            font-size: 1.3rem;
            font-family: 'Times New Roman', Times, serif !important;
          }

          .level-title svg {
            margin-right: 0.5rem;
            width: 1.2rem;
            height: 1.2rem;
          }

          .track-title {
            color: #a046b4;
            font-weight: bold;
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            font-size: 1.3rem;
            gap: 0.5rem;
            font-family: 'Times New Roman', Times, serif !important;
          }

          .track-title svg {
            width: 1.2rem;
            height: 1.2rem;
          }

          .date-badge {
            background-color: #a046b4;
            color: white;
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
            font-size: 0.8rem;
            margin-left: 0.5rem;
            font-family: 'Times New Roman', Times, serif !important;
          }

          .timeline-date {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-left: auto;
            font-size: 0.8rem;
            color: #a0aec0;
            border: 1px solid #374151;
            border-radius: 9999px;
            padding: 0.25rem 0.75rem;
          }

          .timeline-date svg {
            color: #6b7280;
          }

          .timeline-desc {
            margin-top: 0.5rem;
            font-size: 1rem;
            color: #a0aec0;
            line-height: 1.6;
          }

          .animate-left {
            transform: translateX(-50px) !important;
          }

          .animate-left.animated {
            transform: translateX(0) !important;
          }

          .animate-right {
            transform: translateX(50px) !important;
          }

          .animate-right.animated {
            transform: translateX(0) !important;
          }

          .animate-top {
            transform: translateY(-50px) !important;
          }

          .animate-bottom {
            transform: translateY(50px) !important;
          }

          .animate-delay-1 {
            transition-delay: 0.2s !important;
          }

          .animate-delay-2 {
            transition-delay: 0.4s !important;
          }

          .animate-delay-3 {
            transition-delay: 0.6s !important;
          }

          .list-icon {
            margin-right: 0.5rem;
            color: #a046b4;
            min-width: 1.2rem;
          }

          @media (max-width: 992px) {
            h1 {
              font-size: 3.5rem;
            }

            h2 {
              font-size: 1.5rem;
            }

            .two-column, .three-column, .four-column {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 768px) {
            h1 {
              font-size: 2.5rem;
            }

            h2 {
              font-size: 1.25rem;
            }

            h3 {
              font-size: 1rem;
            }

            .header-content {
              text-align: center;
            }

            .info-box {
              flex-direction: column;
              align-items: flex-start;
              gap: 1rem;
              padding: 1rem;
            }

            .info-item {
              width: 100%;
            }

            .content-heading {
              font-size: 1.6rem;
            }

            .track-title, .level-title {
              font-size: 1.4rem;
            }
          }

          @media (max-width: 576px) {
            h1 {
              font-size: 2.5rem !important;
            }

            h2 {
              font-size: 1.1rem !important;
              text-align: center;
            }

            .info-text .label {
              font-size: 0.75rem;
            }

            .info-text .value {
              font-size: 0.875rem;
            }

            .content-heading {
              font-size: 1.4rem;
            }

            .track-title, .level-title {
              font-size: 1.2rem;
            }
          }

          .typing-wrapper-container {
            display: inline-block;
            min-width: 26ch;
            white-space: nowrap;
            vertical-align: bottom;
          }

          footer {
            background-color: #000 !important;
            color: white;
            padding: 1rem;
            text-align: center;
          }

          body {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }

          .content-container {
            flex: 1;
          }

          footer {
            margin-top: auto;
          }

          #header-placeholder {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1000;
            transition: transform 0.3s ease-in-out;
          }

          #header-placeholder.hidden {
            transform: translateY(-100%);
          }



          .register-btn {
            background-color: #a046b4;
            color: white;
            border: none;
            padding: 12px 30px;
            font-size: 1.2rem;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(160, 70, 180, 0.4);
            display: block;
            margin: 40px auto;
            text-align: center;
            width: fit-content;
            text-decoration: none;
            font-weight: bold;
            font-family: 'Times New Roman', Times, serif !important;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .register-btn:hover {
            background-color: #8a3ab9;
            transform: translateY(-3px);
            box-shadow: 0 7px 20px rgba(160, 70, 180, 0.6);
          }

          .register-btn:active {
            transform: translateY(1px);
          }

          .bullet-point {
            display: inline-flex;
            align-items: center;
            margin-bottom: 0.5rem;
          }

          .bullet-point::before {
            content: "•";
            color: white;
            margin-right: 0.5rem;
          }

          @font-face {
            font-family: 'Times New Roman', Times, serif;
            font-style: normal;
            font-weight: 400;
            
          }

          .main-prizes, .additional-benefits {
            font-size: 1.5rem !important;
          }

          .spacing {
            margin-top: 50px;
          }

          .social-icon {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 0.75rem;
            font-size: 1.1rem;
          }

          .social-icon svg {
            min-width: 24px;
          }

          /* Section-specific margins */
          .about-event-section {
            margin: 1.5rem 0;
          }

          .competition-structure-section {
            margin: 1rem 0;
          }

          .thematic-tracks-section {
            margin-top: 8rem
          }

          .eligibility-criteria-section {
            margin: 4.5rem 0;
          }

          .registration-fee-section {
            margin: 2rem 0;
          }

          .awards-recognition-section {
            margin: 2rem 0;
          }

          .contact-information-section {
            margin-top: 8rem
          }

          /* Interactive Tabs Styles */
          .tracks-container {
            margin-top: 2rem;
          }

          .tracks-tabs {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-bottom: 2rem;
            justify-content: center;
          }

          .track-tab {
            background: rgba(0, 0, 0, 0.3);
            border: 2px solid #a046b4;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: 'Times New Roman', Times, serif !important;
            font-size: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            justify-content: center;
            text-align: center;
            min-height: 60px;
          }

          .track-tab:hover {
            background: rgba(160, 70, 180, 0.2);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(160, 70, 180, 0.3);
          }

          .track-tab.active {
            background: linear-gradient(135deg, #a046b4 0%, #6a0dad 100%);
            border-color: #a046b4;
            box-shadow: 0 4px 15px rgba(160, 70, 180, 0.5);
          }

          .track-content {
            display: none;
            background-color: rgba(0, 0, 0, 0.2);
            border-radius: 0.5rem;
            padding: 1.5rem;
            border-left: 4px solid #a046b4;
            transition: all 0.6s ease-out;
            opacity: 0;
            transform: translateY(30px);
            font-family: 'Times New Roman', Times, serif !important;
          }

          .track-content.active {
            display: block;
            opacity: 1;
            transform: translateY(0);
          }

          @media (max-width: 768px) {
            .tracks-tabs {
              grid-template-columns: 1fr;
              gap: 0.75rem;
            }

            .track-tab {
              width: 100%;
              min-height: 50px;
              padding: 0.75rem 1rem;
            }
          }

          /* Breadcrumb Navigation */
          .breadcrumb {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 2rem;
            padding: 1rem 0;
            font-family: 'Times New Roman', Times, serif !important;
          }

          .breadcrumb-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #a0aec0;
            text-decoration: none;
            transition: color 0.3s ease;
            font-size: 0.9rem;
          }

          .breadcrumb-item:hover {
            color: #a046b4;
          }

          .breadcrumb-item.active {
            color: white;
            font-weight: 500;
          }

          .breadcrumb-separator {
            color: #6b7280;
            font-size: 0.8rem;
          }

          /* Back to Top Button */
          .back-to-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background: linear-gradient(135deg, #a046b4 0%, #6a0dad 100%);
            color: white;
            border: none;
            border-radius: 50%;
            width: 3.5rem;
            height: 3.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px) scale(0.9);
            box-shadow: 0 4px 15px rgba(160, 70, 180, 0.4);
            z-index: 1000;
          }

          .back-to-top.visible {
            opacity: 1;
            visibility: visible;
            transform: translateY(0) scale(1);
          }

          .back-to-top:hover {
            background: linear-gradient(135deg, #8a3ab9 0%, #5a0b9d 100%);
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 7px 20px rgba(160, 70, 180, 0.6);
          }

          .back-to-top:active {
            transform: translateY(1px) scale(0.98);
          }

          @media (max-width: 768px) {
            .back-to-top {
              bottom: 1.5rem;
              right: 1.5rem;
              width: 3rem;
              height: 3rem;
            }

            .breadcrumb {
              font-size: 0.8rem;
              margin-bottom: 2.5rem;
            }
          }
        `}</style>

        <div className="header-content animate-section animate-top">
          <h1 style={{ fontSize: '8vw', fontSizeAdjust: '4.5rem', fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
            <b style={{ color: 'white' }}>ProtoPlanet</b>
          </h1>
          <h2 style={{ fontSize: '3vw', fontWeight: 800, margin: '0.5rem 0', color: 'white', lineHeight: 1.4 }}>
            <span className="typing-wrapper-container">
              <span id="hardware" className="typing-wrapper" style={{ color: 'white' }}></span>
              <span id="innovation" className="typing-wrapper" style={{ color: '#a046b4' }}></span>
              <span id="sprint" className="typing-wrapper" style={{ color: 'white' }}></span>
            </span>
          </h2>
        </div>

        {/* Basic Info Box */}
        <div className="info-box-container">
          <div className="info-box animate-section animate-delay-1">
            <div className="info-item">
              <div className="icon-container">
                <Users size={24} />
              </div>
              <div className="info-text">
                <p className="label">Team Size</p>
                <p className="value">2-3 Members</p>
              </div>
            </div>
            <div className="info-item">
              <div className="icon-container">
                <IndianRupee size={24} />
              </div>
              <div className="info-text">
                <p className="label">Registration Fee</p>
                <p className="value">₹300-600</p>
              </div>
            </div>
            <div className="info-item">
              <div className="icon-container">
                <Calendar size={24} />
              </div>
              <div className="info-text">
                <p className="label">Date</p>
                <p className="value">August-October 2025</p>
              </div>
            </div>
          </div>
        </div>

        {/* About the Event */}
        <div className="info-box-container about-event-section">
          <div className="content-box animate-section animate-left">
            <div className="content-heading">About the Event</div>
            <div className="content-text">
              ProtoPlanet is a regional-level hardware innovation competition designed to empower undergraduate engineering students to develop and demonstrate impactful solutions using emerging and future technologies. The competition emphasizes innovation, functionality, and societal relevance—encouraging teams to build what the future needs today.
            </div>
          </div>
        </div>

        {/* Competition Structure */}
        <div className="info-box-container competition-structure-section">
          <div className="content-box animate-section animate-bottom">
            <div className="content-heading no-border">Competition Structure</div>
            {/* Level 1 */}
            <div className="level-card animate-section animate-delay-1">
              <div className="level-title">
                <Flag size={20} /> Level 1: Online Abstract Submission
                <div className="timeline-date">
                  <CalendarDays size={16} />
                  <span>August 9, 2025</span>
                </div>
              </div>
              <div className="content-text">
                Teams must submit a brief proposal outlining:
                <ul className="content-list">
                  <li><span className="bullet-point">Problem Statement</span></li>
                  <li><span className="bullet-point">Proposed Solution</span></li>
                  <li><span className="bullet-point">Basic System Architecture</span></li>
                  <li><span className="bullet-point">Expected Technological and Social Impact</span></li>
                </ul>
                <p>Shortlisted teams will be notified and invited to the next round.</p>
              </div>
            </div>
            {/* Level 2 */}
            <div className="level-card animate-section animate-delay-2">
              <div className="level-title">
                <Laptop size={20} /> Level 2: Regional Prototype Presentation
                <div className="timeline-date">
                  <CalendarDays size={16} />
                  <span>August 23, 2025</span>
                </div>
              </div>
              <div className="content-text">
                Shortlisted teams will be invited to showcase their working prototypes at a regional in-person event.
                <p><strong>Venue:</strong> VIT-AP University (Tentative)</p>
              </div>
            </div>
            {/* Grand Finale */}
            <div className="level-card animate-section animate-delay-3">
              <div className="level-title">
                <Trophy size={20} /> Grand Finale: Future Technology Conclave 2026
                <div className="timeline-date">
                  <CalendarDays size={16} />
                  <span>October 11, 2025</span>
                </div>
              </div>
              <div className="content-text">
                Top-performing teams will pitch their innovations at IET Hyderabad's flagship event.
                <p><strong>Venue:</strong> T-Hub, Hyderabad</p>
              </div>
            </div>
          </div>
        </div>

        {/* Thematic Tracks */}
        <div className="info-box-container thematic-tracks-section">
          <div className="content-box animate-section animate-right">
            <div className="content-heading">Thematic Tracks (Based on Future Technologies)</div>
            <div className="tracks-container">
              <div className="tracks-tabs">
                <button className="track-tab active" data-track="iot">
                  <Wifi size={20} /> IoT & Smart Environments
                </button>
                <button className="track-tab" data-track="robotics">
                  <Rocket size={20} /> Robotics & Intelligent Machines
                </button>
                <button className="track-tab" data-track="healthtech">
                  <HeartPulse size={20} /> HealthTech & Human Augmentation
                </button>
                <button className="track-tab" data-track="cleantech">
                  <Leaf size={20} /> Sustainable & Clean Tech
                </button>
              </div>

              <div className="track-content active" id="iot">
                <div className="track-title">
                  <Wifi size={20} /> IoT & Smart Environments
                </div>
                <div className="content-text">
                  Connected devices and intelligent systems for smart homes, cities, agriculture, and industries.
                  <p><strong>Examples:</strong></p>
                  <ul className="content-list">
                    <li><span className="bullet-point">Smart energy and water tracking systems</span></li>
                    <li><span className="bullet-point">IoT-enabled agriculture solutions</span></li>
                    <li><span className="bullet-point">Smart waste or pollution monitoring systems</span></li>
                  </ul>
                </div>
              </div>

              <div className="track-content" id="robotics">
                <div className="track-title">
                  <Rocket size={20} /> Robotics & Intelligent Machines
                </div>
                <div className="content-text">
                  Hardware innovations using robotics, embedded systems, or automation.
                  <p><strong>Examples:</strong></p>
                  <ul className="content-list">
                    <li><span className="bullet-point">Assistive robots or exoskeletons</span></li>
                    <li><span className="bullet-point">Autonomous service bots</span></li>
                    <li><span className="bullet-point">Intelligent embedded control systems</span></li>
                  </ul>
                </div>
              </div>

              <div className="track-content" id="healthtech">
                <div className="track-title">
                  <HeartPulse size={20} /> HealthTech & Human Augmentation
                </div>
                <div className="content-text">
                  Next-gen tools for healthcare, rehabilitation, and accessibility.
                  <p><strong>Examples:</strong></p>
                  <ul className="content-list">
                    <li><span className="bullet-point">Health monitoring wearables</span></li>
                    <li><span className="bullet-point">Smart assistive technologies</span></li>
                    <li><span className="bullet-point">Rehabilitation support systems</span></li>
                  </ul>
                </div>
              </div>

              <div className="track-content" id="cleantech">
                <div className="track-title">
                  <Leaf size={20} /> Sustainable & Clean Tech
                </div>
                <div className="content-text">
                  Technological solutions to promote sustainability and resource efficiency.
                  <p><strong>Examples:</strong></p>
                  <ul className="content-list">
                    <li><span className="bullet-point">Solar-powered devices</span></li>
                    <li><span className="bullet-point">Smart irrigation controllers</span></li>
                    <li><span className="bullet-point">Green energy or eco-monitoring systems</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Eligibility Criteria */}
        <div className="info-box-container eligibility-criteria-section">
          <div className="content-box animate-section animate-left">
            <div className="content-heading">Eligibility Criteria</div>
            <ul className="content-list">
              <li><span className="bullet-point">Open to undergraduate students (any year) from any branch of engineering</span></li>
              <li><span className="bullet-point">Institutions must be located in Telangana, Andhra Pradesh, or Chhattisgarh</span></li>
              <li><span className="bullet-point">Teams must consist of 2 to 3 members (no solo participation allowed)</span></li>
              <li><span className="bullet-point">At least two members from each team must attend both offline rounds in person</span></li>
              <li><span className="bullet-point">All projects must be original and developed solely by the participating team</span></li>
            </ul>
          </div>
        </div>

        {/* Registration Fee */}
        <div className="info-box-container registration-fee-section">
          <div className="content-box animate-section animate-right">
            <div className="content-heading">Registration Fee</div>
            <div className="two-column">
              <div className="animate-section animate-left">
                <h4 style={{ color: '#a046b4', marginBottom: '0.5rem', fontSize: '24px' }}>IET Member Team</h4>
                <ul className="content-list">
                  <li><span className="bullet-point"><strong>Fee:</strong> ₹300</span></li>
                  <li><span className="bullet-point"><em>(At least one team member must be a current IET student member to avail this rate)</em></span></li>
                </ul>
              </div>
              <div className="animate-section animate-right">
                <h4 style={{ color: '#a046b4', marginBottom: '0.5rem', fontSize: '24px' }}>Non-Member Team</h4>
                <ul className="content-list">
                  <li><span className="bullet-point"><strong>Fee:</strong> ₹600</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Awards & Recognition */}
        <div className="info-box-container awards-recognition-section">
          <div className="content-box animate-section animate-bottom">
            <div className="content-heading">Awards & Recognition</div>
            <div className="two-column">
              <div className="animate-section animate-left">
                <h4 className="main-prizes" style={{ color: '#a046b4', marginBottom: '0.5rem' }}>Main Prizes</h4>
                <ul className="content-list">
                  <li><span className="bullet-point"><strong>1st Prize:</strong> ₹10,000</span></li>
                  <li><span className="bullet-point"><strong>2nd Prize:</strong> ₹5,000</span></li>
                </ul>
              </div>
              <div className="animate-section animate-right">
                <h4 className="additional-benefits" style={{ color: '#a046b4', marginBottom: '0.5rem' }}>Additional Benefits</h4>
                <ul className="content-list">
                  <li><span className="bullet-point">All finalists receive Certificates of Merit from IET Hyderabad LN</span></li>
                  <li><span className="bullet-point">Top teams will present at the Future Technology Conclave 2026</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="spacing"></div>

        {/* Contact Information */}
        <div className="info-box-container contact-information-section">
          <div className="content-box animate-section animate-left">
            <div className="content-heading">Contact Information</div>
            <div className="two-column">
              <div className="animate-section animate-left">
                <h4 style={{ color: '#a046b4', marginBottom: '0.5rem', fontSize: '24px' }}>Event Coordinators</h4>
                <ul className="content-list" style={{ listStyleType: 'none', paddingLeft: 0 }}>
                  <li>
                    <span className="social-icon">
                      <Users size={24} strokeWidth={2} /> John Doe: +91 9876543210
                    </span>
                  </li>
                  <li>
                    <span className="social-icon">
                      <Users size={24} strokeWidth={2} /> Jane Smith: +91 8765432109
                    </span>
                  </li>
                </ul>
              </div>
              <div className="animate-section animate-right">
                <h4 style={{ color: '#a046b4', marginBottom: '0.5rem', fontSize: '24px' }}>Email & Social</h4>
                <ul className="content-list" style={{ listStyleType: 'none', paddingLeft: 0 }}>
                  <li>
                    <span className="social-icon">
                      <Mail size={24} strokeWidth={2} /> protoplanet@college.edu
                    </span>
                  </li>
                  <li>
                    <span className="social-icon">
                      <Instagram size={24} strokeWidth={2} /> @protoplanet_official
                    </span>
                  </li>
                  <li>
                    <span className="social-icon">
                      <Twitter size={24} strokeWidth={2} /> @protoplanet
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Register Now Button */}
        <button onClick={handleRegister} className="register-btn animate-section animate-bottom">
          Register Now <ArrowRight size={20} />
        </button>

        {/* Back to Top Button */}
        <button
          onClick={handleBackToTop}
          className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </button>
      </div>
      <Footer />
    </>
  );
};

export default ProtoPlanetLanding;
