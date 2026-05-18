import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Cpu, Rocket, BrainCircuit, Leaf, Wifi, HeartPulse, Trophy, Calendar, Users, IndianRupee, Flag, Laptop,
  Mail, Instagram, Twitter, ArrowRight, Network, Smartphone, Gauge, Lightbulb, Award, Bookmark,
  ShieldCheck, ClipboardCheck, Phone, CalendarDays, ChevronRight, ArrowUp, Home
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const InnothonLanding = () => {
  const navigate = useNavigate();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isScrollingToTop, setIsScrollingToTop] = useState(false);

  const handleRegister = () => {
    navigate('/innothon/register');
  };

  const handleBackToTop = () => {
    setIsScrollingToTop(true);
    setShowBackToTop(false);
    
    const startingY = window.pageYOffset;
    const duration = 800;
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
      { id: "innovation", text: "Innovation " },
      { id: "challenge", text: "Challenge" }
    ];

    const typingSpeed = 150;
    const erasingSpeed = 100;
    const delayBetweenWords = 400;
    const delayBeforeErase = 1500;

    let wordIndex = 0;
    let charIndex = 0;
    let isErasing = false;

    let currentText = {
      innovation: "",
      challenge: ""
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
            currentText = { innovation: "", challenge: "" };
            setTimeout(type, typingSpeed);
          }
        }
      }
    };

    setTimeout(type, 1000);

    // Animation on scroll
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-section');
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) {
          element.classList.add('animated');

          const lists = element.querySelectorAll('.content-list');
          lists.forEach(list => list.classList.add('animated'));
        }
      });
    };

    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('scroll', handleScroll);
    animateOnScroll();

    return () => {
      window.removeEventListener('scroll', animateOnScroll);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Navigation />
      <div className="innothon-landing">
        
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
            <span>Innothon</span>
          </span>
        </div>

        <style>{`
          html, body {
            margin: 0;
            padding: 0;
            min-height: 100vh;
            background-color: #000000 !important;
          }

          .innothon-landing {
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
            font-family: 'Europa', Arial, sans-serif !important;
          }

          .header-content.animated {
            opacity: 1;
            transform: translateY(0);
          }

          h1, h2, h3, h4, h5, h6 {
            font-family: 'Europa', Arial, sans-serif !important;
          }

          h1 {
            font-weight: 800;
            font-size: 4.5rem;
            line-height: 1.1;
            margin: 0;
            font-family: 'Europa', Arial, sans-serif !important;
          }

          h2 {
            margin-top: 0.5rem;
            font-weight: 800;
            font-size: 1.875rem;
            margin: 0.5rem 0;
            color: white;
            white-space: nowrap;
            font-family: 'Europa', Arial, sans-serif !important;
          }

          .highlight {
            color: #AAC81E;
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
            box-shadow: 0 0 20px 2px #AAC81E;
            opacity: 0;
            transform: scale(0.9);
            transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            background: rgba(15, 15, 15, 0.8);
            backdrop-filter: blur(10px);
            font-family: 'Europa', Arial, sans-serif !important;
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
            box-shadow: 0 0 20px 2px #AAC81E;
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
            border-bottom: 2px solid #AAC81E;
            padding-bottom: 0.5rem;
            font-family: 'Europa', Arial, sans-serif !important;
          }

          .content-text {
            color: white;
            line-height: 1.6;
            font-size: 1.1rem;
            font-family: 'Europa', Arial, sans-serif !important;
          }

          .content-list {
            color: white;
            padding-left: 1.5rem;
            line-height: 1.6;
            font-size: 1.2rem;
            font-family: 'Europa', Arial, sans-serif !important;
          }

          .content-list li {
            opacity: 0;
            transform: translateX(-20px);
            transition: all 0.4s ease-out;
            margin-bottom: 0.5rem;
            display: flex;
            align-items: flex-start;
            font-family: 'Europa', Arial, sans-serif !important;
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
            background: linear-gradient(135deg, #AAC81E 0%, #8CAD0E 100%);
          }

          .icon-container svg {
            width: 1.5rem;
            height: 1.5rem;
            color: white;
          }

          .info-text {
            text-align: left;
            font-family: 'Europa', Arial, sans-serif !important;
          }

          .info-text p {
            margin: 0;
            font-family: 'Europa', Arial, sans-serif !important;
          }

          .info-text .label {
            font-size: 0.875rem;
            color: #d1d5db;
            font-family: 'Europa', Arial, sans-serif !important;
          }

          .info-text .value {
            font-weight: bold;
            color: white;
            font-family: 'Europa', Arial, sans-serif !important;
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
            border-left: 4px solid #AAC81E;
            transition: all 0.6s ease-out;
            opacity: 0;
            transform: translateY(30px);
            font-family: 'Europa', Arial, sans-serif !important;
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
            border-top: 4px solid #AAC81E;
            transition: all 0.6s ease-out;
            opacity: 0;
            transform: translateY(30px);
            font-family: 'Europa', Arial, sans-serif !important;
          }

          .level-card.animated {
            opacity: 1;
            transform: translateY(0);
          }

          .level-title {
            color: #AAC81E;
            font-weight: bold;
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            font-size: 1.3rem;
            font-family: 'Europa', Arial, sans-serif !important;
          }

          .level-title svg {
            margin-right: 0.5rem;
            width: 1.2rem;
            height: 1.2rem;
          }

          .track-title {
            color: #AAC81E;
            font-weight: bold;
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            font-size: 1.3rem;
            gap: 0.5rem;
            font-family: 'Europa', Arial, sans-serif !important;
          }

          .track-title svg {
            width: 1.2rem;
            height: 1.2rem;
          }

          .date-badge {
            background-color: #AAC81E;
            color: white;
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
            font-size: 0.8rem;
            margin-left: 0.5rem;
            font-family: 'Europa', Arial, sans-serif !important;
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
            color: #AAC81E;
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
            background-color: #AAC81E;
            color: white;
            border: none;
            padding: 12px 30px;
            font-size: 1.2rem;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(170, 200, 30, 0.4);
            display: block;
            margin: 40px auto;
            text-align: center;
            width: fit-content;
            text-decoration: none;
            font-weight: bold;
            font-family: 'Europa', Arial, sans-serif !important;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .register-btn:hover {
            background-color: #8CAD0E;
            transform: translateY(-3px);
            box-shadow: 0 7px 20px rgba(170, 200, 30, 0.6);
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
            font-family: 'Europa';
            font-style: normal;
            font-weight: 400;
            src: local('Europa');
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
            margin-top: 7rem;
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
            border: 2px solid #AAC81E;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: 'Europa', Arial, sans-serif !important;
            font-size: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            justify-content: center;
            text-align: center;
            min-height: 60px;
          }

          .track-tab:hover {
            background: rgba(170, 200, 30, 0.2);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(170, 200, 30, 0.3);
          }

          .track-tab.active {
            background: linear-gradient(135deg, #AAC81E 0%, #8CAD0E 100%);
            border-color: #AAC81E;
            box-shadow: 0 4px 15px rgba(170, 200, 30, 0.5);
          }

          .track-content {
            display: none;
            background-color: rgba(0, 0, 0, 0.2);
            border-radius: 0.5rem;
            padding: 1.5rem;
            border-left: 4px solid #AAC81E;
            transition: all 0.6s ease-out;
            opacity: 0;
            transform: translateY(30px);
            font-family: 'Europa', Arial, sans-serif !important;
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
            font-family: 'Europa', Arial, sans-serif !important;
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
            color: #AAC81E;
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
            background: linear-gradient(135deg, #AAC81E 0%, #8CAD0E 100%);
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
            box-shadow: 0 4px 15px rgba(170, 200, 30, 0.4);
            z-index: 1000;
          }

          .back-to-top.visible {
            opacity: 1;
            visibility: visible;
            transform: translateY(0) scale(1);
          }

          .back-to-top:hover {
            background: linear-gradient(135deg, #8CAD0E 0%, #6A8D0E 100%);
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 7px 20px rgba(170, 200, 30, 0.6);
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
            <b style={{ color: 'white' }}>Innothon</b>
          </h1>
          <h2 style={{ fontSize: '3vw', fontWeight: 800, margin: '0.5rem 0', color: 'white', lineHeight: 1.4 }}>
            <span className="typing-wrapper-container">
              <span id="innovation" className="typing-wrapper" style={{ color: '#AAC81E' }}></span>
              <span id="challenge" className="typing-wrapper" style={{ color: 'white' }}></span>
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
                <p className="value">2-4 Members</p>
              </div>
            </div>
            <div className="info-item">
              <div className="icon-container">
                <Calendar size={24} />
              </div>
              <div className="info-text">
                <p className="label">Duration</p>
                <p className="value">4-6 Weeks</p>
              </div>
            </div>
            <div className="info-item">
              <div className="icon-container">
                <Trophy size={24} />
              </div>
              <div className="info-text">
                <p className="label">Prizes</p>
                <p className="value">Cash & Incubation</p>
              </div>
            </div>
          </div>
        </div>

        {/* About the Event */}
        <div className="info-box-container about-event-section">
          <div className="content-box animate-section animate-left">
            <div className="content-heading">About the Event</div>
            <div className="content-text">
              Innothon is a multi-stage innovation challenge designed to foster creative problem-solving and prototype development. Participants progress through idea submission, prototype development, and final pitch rounds, with mentorship and workshops available to guide teams through the process.
            </div>
          </div>
        </div>

        {/* Competition Structure */}
        <div className="info-box-container competition-structure-section">
          <div className="content-box animate-section animate-bottom">
            <div className="content-heading no-border">Competition Structure</div>
            
            {/* Round 1 */}
            <div className="level-card animate-section animate-delay-1">
              <div className="level-title">
                <ClipboardCheck size={20} /> Round 1: Idea Submission & Shortlisting
              </div>
              <div className="content-text">
                <p><strong>Objective:</strong> Collect innovative ideas or solution approaches for the given problem statements.</p>
                <ul className="content-list">
                  <li><span className="bullet-point"><strong>Activity:</strong> Teams submit an abstract or concept note describing their idea</span></li>
                  <li><span className="bullet-point"><strong>Mode:</strong> Online submission via competition portal</span></li>
                  <li><span className="bullet-point"><strong>Duration:</strong> 1-2 weeks</span></li>
                  <li><span className="bullet-point"><strong>Judging Criteria:</strong> Relevance, originality, feasibility, and impact</span></li>
                </ul>
                <p><strong>Deliverables:</strong></p>
                <ul className="content-list">
                  <li><span className="bullet-point">Problem statement tackled</span></li>
                  <li><span className="bullet-point">Solution overview</span></li>
                  <li><span className="bullet-point">Uniqueness & feasibility</span></li>
                  <li><span className="bullet-point">Team details</span></li>
                </ul>
              </div>
            </div>
            
            {/* Round 2 */}
            <div className="level-card animate-section animate-delay-2">
              <div className="level-title">
                <Cpu size={20} /> Round 2: Prototype Development
              </div>
              <div className="content-text">
                <p><strong>Objective:</strong> Develop a basic working model or detailed solution plan.</p>
                <ul className="content-list">
                  <li><span className="bullet-point"><strong>Activity:</strong> Teams build a prototype (code, app, product design, or simulation)</span></li>
                  <li><span className="bullet-point"><strong>Mode:</strong> Virtual or hybrid — can be done remotely</span></li>
                  <li><span className="bullet-point"><strong>Duration:</strong> 1-3 weeks</span></li>
                  <li><span className="bullet-point"><strong>Judging Criteria:</strong> Functionality, innovation, practicality, and scalability</span></li>
                </ul>
                <p><strong>Deliverables:</strong></p>
                <ul className="content-list">
                  <li><span className="bullet-point">Demo video or screenshots</span></li>
                  <li><span className="bullet-point">Detailed explanation (PPT or report)</span></li>
                  <li><span className="bullet-point">Challenges faced & how they were solved</span></li>
                </ul>
              </div>
            </div>
            
            {/* Round 3 */}
            <div className="level-card animate-section animate-delay-3">
              <div className="level-title">
                <Award size={20} /> Round 3: Final Pitch & Demo
              </div>
              <div className="content-text">
                <p><strong>Objective:</strong> Showcase the complete solution to judges and stakeholders.</p>
                <ul className="content-list">
                  <li><span className="bullet-point"><strong>Activity:</strong> Teams present their prototype/demo live and answer jury questions</span></li>
                  <li><span className="bullet-point"><strong>Mode:</strong> Onsite</span></li>
                  <li><span className="bullet-point"><strong>Duration:</strong> 1-day final pitch event</span></li>
                  <li><span className="bullet-point"><strong>Judging Criteria:</strong> Solution effectiveness, presentation, impact, sustainability</span></li>
                </ul>
                <p><strong>Deliverables:</strong></p>
                <ul className="content-list">
                  <li><span className="bullet-point">Live demonstration</span></li>
                  <li><span className="bullet-point">Final presentation deck (slides)</span></li>
                  <li><span className="bullet-point">Q&A session with judges</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="info-box-container eligibility-criteria-section">
          <div className="content-box animate-section animate-left">
            <div className="content-heading">Rules & Eligibility</div>
            <ul className="content-list">
              <li><span className="bullet-point">Open to students, startups, and mixed teams</span></li>
              <li><span className="bullet-point">Team size: 2-4 members</span></li>
              <li><span className="bullet-point">No restrictions on tech stack or tools</span></li>
              <li><span className="bullet-point">All submissions must be original work</span></li>
              <li><span className="bullet-point">Plagiarism will result in immediate disqualification</span></li>
            </ul>
          </div>
        </div>

        {/* Mentorship Section */}
        <div className="info-box-container registration-fee-section">
          <div className="content-box animate-section animate-right">
            <div className="content-heading">Mentors & Support</div>
            <div className="two-column">
              <div className="animate-section animate-left">
                <h4 style={{ color: '#AAC81E', marginBottom: '0.5rem', fontSize: '24px' }}>Mentorship</h4>
                <ul className="content-list">
                  <li><span className="bullet-point">Dedicated mentors assigned in Round 2</span></li>
                  <li><span className="bullet-point">Industry experts provide guidance throughout</span></li>
                </ul>
              </div>
              <div className="animate-section animate-right">
                <h4 style={{ color: '#AAC81E', marginBottom: '0.5rem', fontSize: '24px' }}>Workshops</h4>
                <ul className="content-list">
                  <li><span className="bullet-point">Regular Q&A sessions with experts</span></li>
                  <li><span className="bullet-point">Skill-building workshops available</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Awards & Recognition */}
        <div className="info-box-container awards-recognition-section">
          <div className="content-box animate-section animate-bottom">
            <div className="content-heading">Awards & Benefits</div>
            <div className="two-column">
              <div className="animate-section animate-left">
                <h4 className="main-prizes" style={{ color: '#AAC81E', marginBottom: '0.5rem' }}>Main Prizes</h4>
                <ul className="content-list">
                  <li><span className="bullet-point">Cash prizes for top teams</span></li>
                  <li><span className="bullet-point">Trophies and certificates</span></li>
                </ul>
              </div>
              <div className="animate-section animate-right">
                <h4 className="additional-benefits" style={{ color: '#AAC81E', marginBottom: '0.5rem' }}>Additional Benefits</h4>
                <ul className="content-list">
                  <li><span className="bullet-point">Incubation support for winning ideas</span></li>
                  <li><span className="bullet-point">Internship opportunities</span></li>
                  <li><span className="bullet-point">Networking with industry leaders</span></li>
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
                <h4 style={{ color: '#AAC81E', marginBottom: '0.5rem', fontSize: '24px' }}>Event Coordinators</h4>
                <ul className="content-list" style={{ listStyleType: 'none', paddingLeft: 0 }}>
                  <li>
                    <span className="social-icon">
                      <Users size={24} strokeWidth={2} /> Alex Johnson: +91 9876543210
                    </span>
                  </li>
                  <li>
                    <span className="social-icon">
                      <Users size={24} strokeWidth={2} /> Sarah Williams: +91 8765432109
                    </span>
                  </li>
                </ul>
              </div>
              <div className="animate-section animate-right">
                <h4 style={{ color: '#AAC81E', marginBottom: '0.5rem', fontSize: '24px' }}>Email & Social</h4>
                <ul className="content-list" style={{ listStyleType: 'none', paddingLeft: 0 }}>
                  <li>
                    <span className="social-icon">
                      <Mail size={24} strokeWidth={2} /> innothon@college.edu
                    </span>
                  </li>
                  <li>
                    <span className="social-icon">
                      <Instagram size={24} strokeWidth={2} /> @innothon_official
                    </span>
                  </li>
                  <li>
                    <span className="social-icon">
                      <Twitter size={24} strokeWidth={2} /> @innothon
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

export default InnothonLanding;