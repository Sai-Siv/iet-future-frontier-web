import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Calendar, Users, Smartphone, ClipboardCheck, ShieldCheck, 
  Phone, Mail, Instagram, Twitter, ArrowRight, Wifi, Award,
  Bookmark, Cpu, Gauge, Lightbulb, Network, Trophy, Gift,
  RefreshCw, Layout, Bell, UserCheck, List, CalendarDays,
  ChevronRight, ArrowUp, Home
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const AppAstralLanding = () => {
  const navigate = useNavigate();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isScrollingToTop, setIsScrollingToTop] = useState(false);

  const handleRegister = () => {
    navigate('/appastral/register');
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
      { id: "mobile", text: "Mobile " },
      { id: "app", text: "App " },
      { id: "design", text: "Design " },
      { id: "innovation", text: "& Innovation " },
      { id: "sprint", text: "Sprint" }
    ];

    const typingSpeed = 150;
    const erasingSpeed = 100;
    const delayBetweenWords = 400;
    const delayBeforeErase = 1500;

    let wordIndex = 0;
    let charIndex = 0;
    let isErasing = false;

    let currentText = {
      mobile: "",
      app: "",
      design: "",
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
            currentText = { mobile: "", app: "", design: "", innovation: "", sprint: "" };
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
      <div className="app-astral-landing">
        
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
            <span>AppAstral</span>
          </span>
        </div>

        <style>{`
          html, body {
            margin: 0;
            padding: 0;
            min-height: 100vh;
            background-color: #000000 !important;
          }

          .app-astral-landing {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            margin-top: 80px;
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
            color: #22BBE0;
          }

          .info-box-container {
            display: flex;
            justify-content: center;
            width: 100%;
          
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
            box-shadow: 0 0 20px 2px #22BBE0;
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
            box-shadow: 0 0 20px 2px #22BBE0;
            opacity: 0;
            transition: all 0.8s ease-out;
            transform: translateY(30px);
            background: rgba(15, 15, 15, 0.8);
            backdrop-filter: blur(10px);
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
            border-bottom: 2px solid #22BBE0;
            padding-bottom: 0.5rem;
            font-family: 'Europa', Arial, sans-serif !important;
          }

          .content-text {
            color: white;
            line-height: 1.6;
            font-size: 1.1rem;
            font-family: 'Europa', Arial, sans-serif !important;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
            white-space: normal;
            word-wrap: break-word;
            overflow-wrap: break-word;
            text-align: left;
            display: block;
            width: 100%;
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
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 1.5rem;
            min-width: 0;
            width: 100%;
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
            background: linear-gradient(135deg, #22BBE0 0%, #1A8FB8 100%);
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

          .feature-card {
            background-color: rgba(0, 0, 0, 0.2);
            border-radius: 0.5rem;
            padding: 1.5rem;
            margin-bottom: 1rem;
            border-left: 4px solid #22BBE0;
            transition: all 0.6s ease-out;
            opacity: 0;
            transform: translateY(30px);
            font-family: 'Europa', Arial, sans-serif !important;
            cursor: pointer;
            position: relative;
          }

          .feature-card.animated {
            opacity: 1;
            transform: translateY(0);
          }

          .feature-card:hover {
            transform: translateY(-5px) !important;
            box-shadow: 0 10px 25px rgba(34, 187, 224, 0.3);
            background-color: rgba(34, 187, 224, 0.05);
          }

          .stage-card {
            background-color: rgba(0, 0, 0, 0.2);
            border-radius: 0.5rem;
            padding: 1.5rem;
            margin-bottom: 1rem;
            border-top: 4px solid #22BBE0;
            transition: all 0.6s ease-out;
            opacity: 0;
            transform: translateY(30px);
            font-family: 'Europa', Arial, sans-serif !important;
          }

          .stage-card.animated {
            opacity: 1;
            transform: translateY(0);
          }

          .stage-title {
            color: #22BBE0;
            font-weight: bold;
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            font-size: 1.3rem;
            font-family: 'Europa', Arial, sans-serif !important;
          }

          .stage-title svg {
            margin-right: 0.5rem;
            width: 1.2rem;
            height: 1.2rem;
          }

          .feature-title {
            color: #22BBE0;
            font-weight: bold;
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            font-size: 1.3rem;
            gap: 0.5rem;
            font-family: 'Europa', Arial, sans-serif !important;
            position: relative;
            transition: color 0.3s ease;
            white-space: nowrap;
            width: 100%;
          }

          .feature-title:hover {
            color: #1A8FB8;
          }

          .feature-title svg {
            width: 1.2rem;
            height: 1.2rem;
            transition: transform 0.3s ease;
          }

          .feature-card:hover .feature-title svg {
            transform: scale(1.1);
          }

          .feature-title:hover::after {
            content: attr(data-tooltip);
            position: absolute;
            background-color: rgba(15, 15, 15, 0.95);
            color: white;
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;
            font-size: 0.9rem;
            z-index: 100;
            left: 0;
            top: 100%;
            margin-top: 0.5rem;
            width: 100%;
            max-width: 300px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            border: 1px solid #22BBE0;
            animation: fadeIn 0.2s ease-out;
            white-space: normal;
            word-wrap: break-word;
            overflow-wrap: break-word;
            line-height: 1.4;
            text-align: left;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .date-badge {
            background-color: #22BBE0;
            color: white;
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
            font-size: 0.8rem;
            margin-left: 0.5rem;
            font-family: 'Europa', Arial, sans-serif !important;
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
            color: #22BBE0;
            min-width: 1.2rem;
          }

          .prize-card {
            background-color: rgba(0, 0, 0, 0.2);
            border-radius: 0.5rem;
            padding: 1.5rem;
            margin-bottom: 1rem;
            border: 2px solid #22BBE0;
            transition: all 0.6s ease-out;
            opacity: 0;
            transform: translateY(30px);
            text-align: center;
          }

          .prize-card.animated {
            opacity: 1;
            transform: translateY(0);
          }

          .prize-title {
            color: #22BBE0;
            font-weight: bold;
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
          }

          .prize-amount {
            font-size: 2rem;
            font-weight: bold;
            color: white;
            margin: 0.5rem 0;
          }

          .prize-description {
            color: #d1d5db;
            font-size: 1rem;
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

          @media (max-width: 992px) {
            h1 {
              font-size: 3.5rem;
            }

            h2 {
              font-size: 1.5rem;
            }

            .two-column, .three-column {
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

            .feature-title, .stage-title {
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

            .feature-title, .stage-title {
              font-size: 1.2rem;
            }
          }

          .register-btn {
            background-color: #22BBE0;
            color: white;
            border: none;
            padding: 12px 30px;
            font-size: 1.2rem;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(34, 187, 224, 0.4);
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
            background-color: #1A8FB8;
            transform: translateY(-3px);
            box-shadow: 0 7px 20px rgba(34, 187, 224, 0.6);
          }

          .register-btn:active {
            transform: translateY(1px);
          }

          @font-face {
            font-family: 'Europa';
            font-style: normal;
            font-weight: 400;
            src: local('Europa'), url('https://fonts.googleapis.com/css?family=Times+New+Roman') format('truetype');
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
            margin: 2.5rem 0;
          }

          .competition-structure-section {
            margin: 5.5rem 0;
          }

          .features-section {
            margin-top: 5rem
          }

          .eligibility-criteria-section {
            margin: 5rem 0;
          }

          .registration-fee-section {
            margin-top: 9rem;
          }

          .impact-section {
            margin: 0rem 0;
          }

          .contact-information-section {
            margin-top: 6rem
          }

          .ux-flow-section {
            margin: 5rem 0;
          }

          .submission-section {
            margin: 2rem 0;
          }

          .awards-section {
            margin: 5rem 0;
          }

          .problem-statement-section {
            margin: 5rem 0;
          }

          .typing-wrapper-container {
            display: inline-block;
            min-width: 26ch;
            white-space: nowrap;
            vertical-align: bottom;
          }

          .main-prizes, .additional-benefits {
            font-size: 1.5rem !important;
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
            color: #22BBE0;
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
            background: linear-gradient(135deg, #22BBE0 0%, #1A8FB8 100%);
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
            box-shadow: 0 4px 15px rgba(34, 187, 224, 0.4);
            z-index: 1000;
          }

          .back-to-top.visible {
            opacity: 1;
            visibility: visible;
            transform: translateY(0) scale(1);
          }

          .back-to-top:hover {
            background: linear-gradient(135deg, #1A8FB8 0%, #0F6B8F 100%);
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 7px 20px rgba(34, 187, 224, 0.6);
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
            <b style={{ color: 'white' }}>AppAstral</b>
          </h1>
          <h2 style={{ fontSize: '3vw', fontWeight: 800, margin: '0.5rem 0', color: 'white', lineHeight: 1.4 }}>
            <span className="typing-wrapper-container">
              <span id="mobile" className="typing-wrapper" style={{ color: 'white' }}></span>
              <span id="app" className="typing-wrapper" style={{ color: '#22BBE0' }}></span>
              <span id="design" className="typing-wrapper" style={{ color: 'white' }}></span>
              <span id="innovation" className="typing-wrapper" style={{ color: '#22BBE0' }}></span>
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
                <p className="value">2 Members</p>
              </div>
            </div>
            <div className="info-item">
              <div className="icon-container">
                <Calendar size={24} />
              </div>
              <div className="info-text">
                <p className="label">Submission Deadline</p>
                <p className="value">August 9, 2025</p>
              </div>
            </div>
            <div className="info-item">
              <div className="icon-container">
                <Award size={24} />
              </div>
              <div className="info-text">
                <p className="label">Finale</p>
                <p className="value">October 11, 2025</p>
              </div>
            </div>
          </div>
        </div>

        {/* About the Event */}
        <div className="info-box-container about-event-section">
          <div className="content-box animate-section animate-left">
            <div className="content-heading">About AppAstral</div>
            <div className="content-text">
              A platform to unleash creativity, solve real user needs, and build next-gen mobile experiences. AppAstral challenges participants to ideate and prototype innovative mobile applications that bridge digital gaps, enhance user engagement, and streamline community interactions.
            </div>
          </div>
        </div>

        {/* Problem Statement */}
        <div className="info-box-container problem-statement-section">
          <div className="content-box animate-section animate-right">
            <div className="content-heading">Problem Statement</div>
            <div className="content-text">
              Design a mobile app to revolutionize how the IET Hyderabad Local Network communicates, organizes, and engages with students across Telangana, Andhra Pradesh, and Chhattisgarh.
            </div>
            <div className="content-text" style={{ marginTop: '1rem' }}>
              Current communication and registration processes for IET HLN events are fragmented and web-heavy. The challenge is to create a mobile-first solution that:
            </div>
            <ul className="content-list">
              <li><span className="bullet-point">Centralizes event announcements, registrations, and results.</span></li>
              <li><span className="bullet-point">Syncs dynamically with the IET HLN website.</span></li>
              <li><span className="bullet-point">Increases student participation and awareness.</span></li>
              <li><span className="bullet-point">Offers an intuitive, accessible, and branded mobile experience.</span></li>
            </ul>
          </div>
        </div>

        {/* App Concept Overview */}
        <div className="info-box-container about-event-section">
          <div className="content-box animate-section animate-left">
            <div className="content-heading">App Concept Overview</div>
            <div className="content-text">
              IET HLN Events is a mobile application designed exclusively for the IET Hyderabad Local Network to streamline communications for events and updates, improve student engagement, and simplify registration and announcements for all its activities across Telangana, Andhra Pradesh, and Chhattisgarh.
            </div>
            <div className="content-text" style={{ marginTop: '1rem' }}>
              The app acts as a digital companion to the official IET Hyderabad Local Network website to ensure seamless sync of event data, announcements, and participant interactions between the web and mobile platforms.
            </div>
          </div>
        </div>

        {/* Website Integration */}
        <div className="info-box-container features-section">
          <div className="content-box animate-section animate-right">
            <div className="content-heading">Website Integration</div>
            <div className="three-column">
              <div className="feature-card animate-section animate-delay-1">
                <div className="feature-title" data-tooltip="Automatically syncs event data between the website and mobile app in real-time">
                  Real-time Sync 🔄
                </div>
                <div className="content-text">
                  Synchronization with the IET Hyderabad LN website for upcoming events and announcements.
                </div>
              </div>
              
              <div className="feature-card animate-section animate-delay-2">
                <div className="feature-title" data-tooltip="Admins update content once on the website and changes appear instantly on both platforms">
                  Unified Updates ✅
                </div>
                <div className="content-text">
                  Admins can post updates once on the website, which automatically reflect in the app.
                </div>
              </div>
              
              <div className="feature-card animate-section animate-delay-1">
                <div className="feature-title" data-tooltip="Maintains consistent IET branding across all interface elements">
                  Consistent Branding 🎨
                </div>
                <div className="content-text">
                  Unified branding and consistent user experience across platforms.
                </div>
              </div>
              
              <div className="feature-card animate-section animate-delay-2">
                <div className="feature-title" data-tooltip="Instant mobile alerts when new content is published on the website">
                  Push Notifications 🔔
                </div>
                <div className="content-text">
                  Mobile push notifications triggered by website updates.
                </div>
              </div>
              
              <div className="feature-card animate-section animate-delay-1">
                <div className="feature-title" data-tooltip="Seamless transition to web pages for complex forms or payment processing">
                  Web Redirection 🔗
                </div>
                <div className="content-text">
                  Redirects users to web-based event registration and payment portals where applicable.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Features */}
        <div className="info-box-container features-section">
          <div className="content-box animate-section animate-left">
            <div className="content-heading">Core Features</div>
            <div className="three-column">
              <div className="feature-card animate-section animate-delay-1">
                <div className="feature-title" data-tooltip="Interactive calendar with filtering options for event types, dates, and locations">
                  Event Calendar 📅
                </div>
                <div className="content-text">
                  Comprehensive, filterable listing of all upcoming IET HLN events with detailed info.
                </div>
              </div>
              
              <div className="feature-card animate-section animate-delay-2">
                <div className="feature-title" data-tooltip="Simplified sign-up process with form pre-filling for registered users">
                  Event Registration 📝
                </div>
                <div className="content-text">
                  In-app event registration forms integrated or linked to website portals.
                </div>
              </div>
              
              <div className="feature-card animate-section animate-delay-1">
                <div className="feature-title" data-tooltip="Centralized hub for all official communications and competition results">
                  Announcements 📢
                </div>
                <div className="content-text">
                  Dynamic display of competition results, winner announcements, and official news.
                </div>
              </div>
              
              <div className="feature-card animate-section animate-delay-2">
                <div className="feature-title" data-tooltip="One-time password verification for secure account creation">
                  User Registration 👤
                </div>
                <div className="content-text">
                  Secure, personalized login using OTP verification.
                </div>
              </div>
              
              <div className="feature-card animate-section animate-delay-1">
                <div className="feature-title" data-tooltip="Customizable alerts for event reminders, deadlines, and important updates">
                  Notifications 🔔
                </div>
                <div className="content-text">
                  Push alerts for event reminders, deadlines, results, and important announcements.
                </div>
              </div>
            </div>
            <div className="content-text" style={{ marginTop: '1.5rem', fontWeight: 'bold', color: '#22BBE0' }}>
              Participants must propose min 3 unique features or functionalities that make their app stand out. These features should go beyond the required specifications and demonstrate creativity, problem-solving, that adds value for your app.
            </div>
          </div>
        </div>

        {/* User Flow */}
        <div className="info-box-container ux-flow-section">
          <div className="content-box animate-section animate-right">
            <div className="content-heading">User Flow (UX Summary)</div>
            <div className="content-text">
              <ol className="content-list" style={{ listStyleType: 'decimal' }}>
                <li><span className="bullet-point">Splash Screen → IET HLN branding.</span></li>
                <li><span className="bullet-point">Mobile number sign-up with OTP verification.</span></li>
                <li><span className="bullet-point">Home Screen with featured events and notifications.</span></li>
                <li><span className="bullet-point">Bottom Navigation: Home | Events | Register | Announcements | Profile.</span></li>
              </ol>
            </div>
          </div>
        </div>

        {/* Eligibility Criteria */}
        <div className="info-box-container eligibility-criteria-section">
          <div className="content-box animate-section animate-left">
            <div className="content-heading">Eligibility & Team Size</div>
            <ul className="content-list">
              <li><span className="bullet-point">Team size: Maximum 2 members.</span></li>
              <li><span className="bullet-point">Participants: Undergraduate engineering students (any year, any branch).</span></li>
              <li><span className="bullet-point">Institutions: Located in Telangana, Andhra Pradesh, or Chhattisgarh.</span></li>
              <li><span className="bullet-point">Solo participation: Not allowed.</span></li>
            </ul>
          </div>
        </div>

        {/* Submission Requirements */}
        <div className="info-box-container submission-section">
          <div className="content-box animate-section animate-right">
            <div className="content-heading">Submission Requirements</div>
            <ul className="content-list">
              <li><span className="bullet-point">UI/UX design prototypes created with tools like Figma or Adobe XD.</span></li>
              <li><span className="bullet-point">5–7 wireframes/screens covering key app functionality and user journey.</span></li>
              <li><span className="bullet-point">Description of website-app synchronization approach.</span></li>
              <li><span className="bullet-point">Optional: interactive prototype link or video walkthrough.</span></li>
            </ul>
          </div>
        </div>

        {/* Expected Impact */}
        <div className="info-box-container impact-section">
          <div className="content-box animate-section animate-bottom">
            <div className="content-heading">Expected Technological and Social Impact</div>
            <ul className="content-list">
              <li><span className="bullet-point">Enables centralized, real-time communication between IET HLN and members.</span></li>
              <li><span className="bullet-point">Promotes higher student engagement and participation in technical events.</span></li>
              <li><span className="bullet-point">Provides easy access to event info, registrations, and results on mobile.</span></li>
              <li><span className="bullet-point">Enhances digital presence and professional branding of IET Hyderabad LN.</span></li>
              <li><span className="bullet-point">Facilitates efficient information dissemination and reduces communication gaps.</span></li>
            </ul>
          </div>
        </div>

        {/* Awards & Recognition */}
        <div className="info-box-container awards-section">
          <div className="content-box animate-section animate-bottom">
            <div className="content-heading">Awards & Recognition</div>
            <div className="two-column">
              <div className="animate-section animate-left">
                <h4 className="main-prizes" style={{ color: '#22bbe0', marginBottom: '0.5rem' }}>Main Prizes 🏅</h4>
                <ul className="content-list">
                  <li><span className="bullet-point"><strong>1st Prize:</strong> ₹10,000</span></li>
                  <li><span className="bullet-point"><strong>2nd Prize:</strong> ₹5,000</span></li>
                </ul>
              </div>
              <div className="animate-section animate-right">
                <h4 className="additional-benefits" style={{ color: '#22bbe0', marginBottom: '0.5rem' }}>Additional Benefits 🎁</h4>
                <ul className="content-list">
                  <li><span className="bullet-point">All finalists receive Certificates of Merit from IET Hyderabad LN</span></li>
                  <li><span className="bullet-point">Top teams will present at the Future Technology Conclave 2025</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Event Timeline */}
        <div className="info-box-container competition-structure-section">
          <div className="content-box animate-section animate-bottom">
            <div className="content-heading no-border">Event Timeline</div>
            {/* Level 1 */}
            <div className="stage-card animate-section animate-delay-1">
              <div className="stage-title">
                Submission Deadline 📤
                <div className="timeline-date">
                  <CalendarDays size={16} />
                  <span>August 2, 2025</span>
                </div>
              </div>
              <div className="timeline-desc">
                Online idea & prototype submission deadline.
              </div>
            </div>
            {/* Level 2 */}
            <div className="stage-card animate-section animate-delay-2">
              <div className="stage-title">
                Regional Round 🌍
                <div className="timeline-date">
                  <CalendarDays size={16} />
                  <span>August 23, 2025</span>
                </div>
              </div>
              <div className="timeline-desc">
                Shortlisted teams demo at regional event.
                <p><strong>Venue:</strong> VIT-AP University (Tentative).</p>
              </div>
            </div>
            {/* Grand Finale */}
            <div className="stage-card animate-section animate-delay-3">
              <div className="stage-title">
                Grand Finale 🏆
                <div className="timeline-date">
                  <CalendarDays size={16} />
                  <span>October 11, 2025</span>
                </div>
              </div>
              <div className="timeline-desc">
                Top teams showcase at flagship event.
                <p><strong>Venue:</strong> T-Hub, Hyderabad.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Registration Fee */}
        <div className="info-box-container registration-fee-section">
          <div className="content-box animate-section animate-right">
            <div className="content-heading">Registration Fee</div>
            <div className="two-column">
              <div className="animate-section animate-left">
                <h4 style={{ color: '#22BBE0', marginBottom: '0.5rem', fontSize: '24px'}}>IET Member Team</h4>
                <ul className="content-list">
                  <li><span className="bullet-point"><strong>Fee:</strong> ₹300.</span></li>
                  <li><span className="bullet-point"><em>(At least one member must be a current IET student member).</em></span></li>
                </ul>
              </div>
              <div className="animate-section animate-right">
                <h4 style={{ color: '#22BBE0', marginBottom: '0.5rem', fontSize: '24px' }}>Non-Member Team</h4>
                <ul className="content-list">
                  <li><span className="bullet-point"><strong>Fee:</strong> ₹600.</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="info-box-container contact-information-section">
          <div className="content-box animate-section animate-left">
            <div className="content-heading">Stay Connected</div>
            <div className="content-text" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              Follow IET Hyderabad Local Network for updates, registration links, and announcements.
            </div>
            <div className="two-column">
              <div className="animate-section animate-left">
                <h4 style={{ color: '#22BBE0', marginBottom: '0.5rem', fontSize: '24px' }}>Contact</h4>
                <ul className="content-list" style={{ listStyleType: 'none', paddingLeft: 0 }}>
                  <li>
                    <span className="social-icon">
                      <Mail size={24} strokeWidth={2} /> iethyd@theiet.org
                    </span>
                  </li>
                </ul>
              </div>
              <div className="animate-section animate-right">
                <h4 style={{ color: '#22BBE0', marginBottom: '0.5rem', fontSize: '24px' }}>Social Media</h4>
                <ul className="content-list" style={{ listStyleType: 'none', paddingLeft: 0 }}>
                  <li>
                    <span className="social-icon">
                      <Instagram size={24} strokeWidth={2} /> @iet_hyderabad
                    </span>
                  </li>
                  <li>
                    <span className="social-icon">
                      <Twitter size={24} strokeWidth={2} /> @IETHyderabad
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

export default AppAstralLanding;