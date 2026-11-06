import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import {
  Calendar, MapPin, Users, Trophy, Clock,
  Settings, ClipboardCheck, Smartphone, Zap,
  MonitorSmartphone, ShieldCheck, Mail, Phone, LifeBuoy,
  ArrowUp, CheckCircle2, ChevronRight,
  FileText, Megaphone, Lock, Bell, Code, MessageSquare, Play, Lightbulb, Presentation, MonitorPlay,
  Sparkles, Utensils, Coffee, BrainCircuit, Leaf, HeartPulse, GraduationCap, Building2, CreditCard, Sprout
} from 'lucide-react';

const InnothonLanding = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeScheduleDay, setActiveScheduleDay] = useState<1 | 2>(1);

  const day1Schedule = [
    {
      time: '1:00 PM – 2:00 PM',
      tag: 'Check-In & Registration',
      title: 'Registrations',
      desc: 'Participant arrival, check-in, registration confirmation, kit distribution, and team onboarding at VIT-AP University.',
      icon: CheckCircle2
    },
    {
      time: '2:00 PM – 2:15 PM',
      tag: 'Ideation Kick-off',
      title: 'Idea Generation',
      desc: 'Official challenge commencement: Theme briefing, domain selection, brainstorming, and initial concept formation.',
      icon: Lightbulb,
      highlight: true
    },
    {
      time: '2:15 PM – 3:30 PM',
      tag: 'Sprint Phase 1',
      title: 'Implementation',
      desc: 'First intense sprint: Architecture design, solution modeling, component mapping, and initial prototype building.',
      icon: Code
    },
    {
      time: '3:30 PM – 3:40 PM',
      tag: 'Refreshment Break',
      title: 'Tea Break',
      desc: 'Tea and refreshments served to keep participants energized for the next sprint phase.',
      perk: 'Tea and Refreshments provided',
      icon: Coffee
    },
    {
      time: '3:40 PM – 5:00 PM',
      tag: 'Sprint Phase 2',
      title: 'Implementation',
      desc: 'Second implementation block: Prototype refinement, pitch deck preparation, and feature validation.',
      icon: Settings
    },
    {
      time: '5:00 PM – 7:00 PM',
      tag: 'Milestone Evaluation',
      title: 'Evaluation – Round 1',
      desc: 'First formal jury review: Problem relevance, solution uniqueness, technical feasibility, and prototype progress.',
      icon: Trophy,
      highlight: true
    }
  ];

  const day2Schedule = [
    {
      time: '8:30 AM – 11:30 AM',
      tag: 'Jury Pitch & Demo',
      title: '10 minutes Presentation',
      desc: 'Teams deliver their 10-minute solution presentation, live prototype showcase, and defense before the evaluation panel.',
      icon: Presentation,
      highlight: true
    },
    {
      time: '11:30 AM – 11:40 AM',
      tag: 'Refreshment Break',
      title: 'Tea Break',
      desc: 'Short tea and refreshment break before the final round evaluations.',
      perk: 'Tea and Refreshments provided',
      icon: Coffee
    },
    {
      time: '11:40 AM – 1:00 PM',
      tag: 'Final Judging',
      title: 'Evaluation – Round 2',
      desc: 'In-depth jury evaluation round: Scalability analysis, business viability, Q&A defense, and final score consolidation.',
      icon: Trophy,
      highlight: true
    },
    {
      time: '1:00 PM – 2:00 PM',
      tag: 'Lunch Break',
      title: 'Lunch Break',
      desc: 'Lunch hosted for all registered participants and delegates at the campus dining facility.',
      perk: 'Lunch hosted at the hostel mess',
      icon: Utensils
    },
    {
      time: '2:00 PM – 5:00 PM',
      tag: 'Grand Ceremony',
      title: 'Prizes Distribution & Valedictory Ceremony',
      desc: 'Grand valedictory session: Keynote talks, felicitation of dignitaries, announcement of winners, and cash prize distribution.',
      icon: Zap,
      highlight: true
    }
  ];

  const thematicTracks = [
    {
      name: 'AI for Social Good',
      desc: 'Leveraging AI/ML to solve critical societal, environmental, and public welfare challenges.',
      icon: BrainCircuit
    },
    {
      name: 'Sustainable Tech',
      desc: 'Developing eco-friendly tech to combat climate change, promote clean energy, and reduce waste.',
      icon: Leaf
    },
    {
      name: 'Healthcare Innovation',
      desc: 'Improving patient care, medical diagnostics, accessibility, and mental health through technology.',
      icon: HeartPulse
    },
    {
      name: 'Education Technology',
      desc: 'Modernizing classroom learning, remote education, skill building, and academic inclusion.',
      icon: GraduationCap
    },
    {
      name: 'Smart City Solutions',
      desc: 'Optimizing urban traffic, waste management, municipal services, and public safety infrastructure.',
      icon: Building2
    },
    {
      name: 'Financial Inclusion',
      desc: 'Empowering underbanked communities with secure, simplified mobile banking and payment tools.',
      icon: CreditCard
    },
    {
      name: 'Agriculture Technology',
      desc: 'Enhancing crop yield, automating farming systems, smart irrigation, and supply chain logistics.',
      icon: Sprout
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 300);

      const sections = document.querySelectorAll('.animate-on-scroll');
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight * 0.85) {
          section.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    setTimeout(handleScroll, 100);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="innothon-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Poppins:wght@600;700;800&display=swap');

        .innothon-container {
          background-color: #000000;
          min-height: 100vh;
          color: white;
          font-family: 'Times New Roman', Times, serif !important;
          overflow-x: hidden;
          line-height: 1.6;
        }

        h1, h2, h3, h4, h5, h6 {
          font-family: 'Times New Roman', Times, serif !important;
          margin: 0;
        }

        .section-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 20px 24px;
        }

        /* Buttons */
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 52px;
          padding: 0 28px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 15px;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          font-family: 'Times New Roman', Times, serif !important;
        }
        .btn:hover {
          transform: scale(1.03);
        }
        .btn-primary {
          background: #AAC81E;
          color: #000000;
          border: none;
          font-weight: 700;
          box-shadow: 0 0 20px rgba(170, 200, 30, 0.4);
        }
        .btn-primary:hover {
          background: #b8d626;
          box-shadow: 0 0 30px rgba(170, 200, 30, 0.6);
        }

        /* Glass Card Base */
        .glass-card {
          background: #151518;
          border: 1px solid rgba(170, 200, 30, 0.25);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        .glass-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 40px rgba(170, 200, 30, 0.15);
          border-color: rgba(170, 200, 30, 0.5);
        }
        
        /* Typography */
        .section-title-wrapper {
          text-align: center;
          margin-top: 100px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .section-title {
          font-size: 32px;
          font-weight: 800;
          color: white;
          letter-spacing: 2px;
          text-transform: uppercase;
          position: relative;
          display: inline-block;
          margin-bottom: 16px;
        }
        .section-subtitle {
          color: #A0A0A0;
          font-size: 16px;
          max-width: 600px;
          text-align: center;
        }
        .section-divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 48px;
          justify-content: center;
        }
        .divider-line {
          height: 1px;
          width: 60px;
          background: linear-gradient(90deg, transparent, rgba(170, 200, 30, 0.5), transparent);
        }
        .divider-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #AAC81E;
          box-shadow: 0 0 10px #AAC81E;
        }

        /* Hero */
        .hero-section {
          min-height: calc(100vh - 120px);
          display: flex;
          align-items: center;
          padding-top: 0;
          position: relative;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .hero-glow-1 {
          position: absolute;
          top: 20%;
          right: 10%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(170, 200, 30, 0.15) 0%, transparent 70%);
          filter: blur(60px);
        }
        .hero-glow-2 {
          position: absolute;
          bottom: 10%;
          left: 10%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(170, 200, 30, 0.1) 0%, transparent 70%);
          filter: blur(60px);
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 60px;
          align-items: center;
          position: relative;
          z-index: 10;
        }
        @media (min-width: 992px) {
          .hero-grid {
            grid-template-columns: 1.1fr 0.9fr;
          }
        }
        .hero-title {
          font-size: 4.2rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 8px;
          background: white;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-subtitle {
          font-size: 2.3rem;
          font-weight: 700;
          color: #AAC81E;
          margin-bottom: 16px;
          line-height: 1.2;
        }
        .hero-desc {
          font-size: 16px;
          color: #A0A0A0;
          margin-bottom: 32px;
          max-width: 540px;
        }
        
        /* Hero Visual Illustration */
        .tech-illustration {
          position: relative;
          width: 100%;
          max-width: 320px;
          margin: 0 auto;
          perspective: 1000px;
        }
        .tech-body {
          background: linear-gradient(145deg, #1A1A1E, #0D0D0F);
          border: 2px solid rgba(170, 200, 30, 0.4);
          border-radius: 36px;
          padding: 12px;
          box-shadow: 0 0 50px rgba(170, 200, 30, 0.2), inset 0 0 20px rgba(170, 200, 30, 0.1);
          transform: rotateY(-15deg) rotateX(10deg);
          transform-style: preserve-3d;
          animation: float 6s ease-in-out infinite;
        }
        .tech-screen {
          background: #000;
          border-radius: 26px;
          height: 480px;
          border: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .tech-screen::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(170, 200, 30, 0.25) 0%, transparent 60%);
        }
        .tech-icon-center {
          color: #AAC81E;
          filter: drop-shadow(0 0 20px rgba(170, 200, 30, 0.9));
          z-index: 2;
        }
        .circuit-lines {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(170, 200, 30, 0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(170, 200, 30, 0.12) 1px, transparent 1px);
          background-size: 40px 40px;
          background-position: center center;
          opacity: 0.5;
          z-index: 1;
        }
        @keyframes float {
          0% { transform: translateY(0px) rotateY(-15deg) rotateX(10deg); }
          50% { transform: translateY(-20px) rotateY(-10deg) rotateX(15deg); }
          100% { transform: translateY(0px) rotateY(-15deg) rotateX(10deg); }
        }

        /* Stats Grid */
        .grid-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
          gap: 20px;
        }
        .stat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 28px 18px;
        }
        .stat-icon {
          color: #AAC81E;
          margin-bottom: 14px;
          background: rgba(170, 200, 30, 0.1);
          padding: 14px;
          border-radius: 50%;
          box-shadow: 0 0 20px rgba(170, 200, 30, 0.15);
          box-sizing: content-box;
        }
        .stat-title {
          font-size: 13px;
          color: #A0A0A0;
          margin-bottom: 6px;
          font-weight: 500;
        }
        .stat-value {
          font-size: 15px;
          font-weight: 700;
          color: white;
        }

        /* Schedule Tabs & Timeline */
        .schedule-tabs {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-bottom: 32px;
          flex-wrap: wrap;
        }
        .schedule-tab-btn {
          padding: 14px 28px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(21, 21, 24, 0.6);
          color: #A0A0A0;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: inherit;
        }
        .schedule-tab-btn:hover {
          color: white;
          border-color: rgba(170, 200, 30, 0.4);
          background: rgba(170, 200, 30, 0.08);
        }
        .schedule-tab-btn.active {
          border-color: #AAC81E;
          background: rgba(170, 200, 30, 0.15);
          color: #AAC81E;
          box-shadow: 0 0 25px rgba(170, 200, 30, 0.25);
        }
        .timeline-card {
          background: #151518;
          border: 1px solid rgba(170, 200, 30, 0.2);
          border-radius: 14px;
          padding: 22px 24px;
          margin-bottom: 16px;
          transition: all 0.3s ease;
          display: flex;
          align-items: flex-start;
          gap: 20px;
        }
        .timeline-card:hover {
          border-color: rgba(170, 200, 30, 0.5);
          box-shadow: 0 6px 24px rgba(170, 200, 30, 0.12);
          transform: translateX(4px);
        }
        .timeline-card.highlight {
          border-color: rgba(170, 200, 30, 0.6);
          background: linear-gradient(90deg, rgba(170, 200, 30, 0.1) 0%, #151518 100%);
          box-shadow: 0 0 30px rgba(170, 200, 30, 0.15);
        }
        .time-badge {
          background: rgba(170, 200, 30, 0.12);
          color: #AAC81E;
          border: 1px solid rgba(170, 200, 30, 0.3);
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          white-space: nowrap;
          min-width: 170px;
          text-align: center;
        }
        .tag-badge {
          display: inline-block;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.08);
          color: #A0A0A0;
          margin-bottom: 6px;
        }
        .tag-badge.special {
          background: rgba(170, 200, 30, 0.2);
          color: #AAC81E;
          border: 1px solid rgba(170, 200, 30, 0.4);
        }
        .activity-title {
          font-size: 18px;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 4px;
        }
        .activity-desc {
          font-size: 14px;
          color: #A0A0A0;
          margin: 0;
          line-height: 1.5;
        }
        .perk-note {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 10px;
          font-size: 12px;
          color: #AAC81E;
          background: rgba(170, 200, 30, 0.08);
          padding: 5px 12px;
          border-radius: 6px;
          border-left: 3px solid #AAC81E;
        }
        @media (max-width: 768px) {
          .timeline-card {
            flex-direction: column;
            gap: 12px;
          }
          .time-badge {
            min-width: auto;
            width: 100%;
            text-align: left;
          }
        }

        /* 3 & 7 Grids */
        .grid-3 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        .grid-7 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        @media (min-width: 576px) { .grid-7 { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 992px) { .grid-7 { grid-template-columns: repeat(4, 1fr); } }
        @media (min-width: 1200px) { .grid-7 { grid-template-columns: repeat(7, 1fr); } }
        
        .eval-card {
          padding: 24px 16px;
          text-align: center;
        }
        .eval-icon {
          color: #AAC81E;
          margin-bottom: 12px;
          width: 32px;
          height: 32px;
        }
        .eval-title {
          font-size: 13px;
          font-weight: 600;
        }

        /* Guidelines */
        .guidelines-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          align-items: center;
        }
        @media (min-width: 992px) {
          .guidelines-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        .checklist {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .checklist li {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 24px;
          background: rgba(21, 21, 24, 0.6);
          padding: 16px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.3s ease;
        }
        .checklist li:hover {
          background: #151518;
          border-color: rgba(170, 200, 30, 0.3);
        }
        .checklist-icon {
          color: #AAC81E;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .clipboard-illustration {
          position: relative;
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
          aspect-ratio: 3/4;
          background: #151518;
          border: 2px solid rgba(170, 200, 30, 0.3);
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          padding: 40px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }
        .clipboard-clip {
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 120px;
          height: 30px;
          background: #2A2A30;
          border-radius: 15px;
          border: 2px solid rgba(170, 200, 30, 0.5);
        }
        .clipboard-shield {
          position: absolute;
          bottom: -20px;
          right: -20px;
          background: #0D0D0F;
          border-radius: 50%;
          padding: 10px;
        }

        /* Winners */
        .winners-banner {
          background: linear-gradient(135deg, rgba(20, 30, 10, 0.9) 0%, rgba(13, 20, 8, 0.9) 100%);
          border: 1px solid rgba(170, 200, 30, 0.25);
          border-radius: 16px;
          padding: 40px 48px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
          backdrop-filter: blur(10px);
          gap: 40px;
        }
        .winners-left-icon {
          flex-shrink: 0;
          background: rgba(170, 200, 30, 0.12);
          padding: 24px;
          border-radius: 50%;
          border: 1px solid rgba(170, 200, 30, 0.3);
          box-shadow: 0 0 30px rgba(170, 200, 30, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }
        .winners-center {
          flex: 1;
          text-align: left;
          z-index: 2;
        }
        .winners-title {
          color: white;
          font-size: 32px;
          font-weight: 800;
          margin: 0 0 12px 0;
          letter-spacing: 2px;
          text-shadow: 0 0 20px rgba(255,255,255,0.2);
        }
        .winners-desc {
          color: #A0A0A0;
          font-size: 16px;
          margin: 0;
          max-width: 450px;
          line-height: 1.6;
        }
        .winners-highlight {
          color: #AAC81E;
          font-weight: 700;
        }
        .winners-right {
          position: absolute;
          right: 0;
          bottom: -10px;
          opacity: 0.08;
          pointer-events: none;
          display: flex;
          align-items: flex-end;
          z-index: 1;
        }
        @media (max-width: 768px) {
          .winners-banner {
            flex-direction: column;
            text-align: center;
            padding: 40px 24px;
          }
          .winners-center {
            text-align: center;
          }
          .winners-desc {
            margin: 0 auto;
          }
        }

        /* Animations */
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .animate-on-scroll.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .delay-1 { transition-delay: 0.1s; }
        .delay-2 { transition-delay: 0.2s; }
        .delay-3 { transition-delay: 0.3s; }

        /* Back to Top Button */
        .back-to-top {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          background: linear-gradient(135deg, #AAC81E 0%, #8CAD0E 100%);
          color: #000;
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
          background: linear-gradient(135deg, #b8d626 0%, #AAC81E 100%);
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
        }
              /* ===== Mobile overflow fixes ===== */
        .hero-grid { grid-template-columns: minmax(0, 1fr); }
        .hero-grid > * { min-width: 0; }
        @media (min-width: 992px) {
          .hero-grid { grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr); }
        }
        .hero-title { font-size: clamp(2.2rem, 12vw, 4.2rem); overflow-wrap: break-word; }
        .hero-subtitle { font-size: clamp(1.5rem, 7vw, 2.3rem); }
        .hero-desc { overflow-wrap: break-word; }
        @media (max-width: 576px) {
          .section-container { padding-left: 16px; padding-right: 16px; }
          .phone-body, .tech-body { transform: none; max-width: 100%; }
          .winners-right { display: none; }
        }
      `}</style>

      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section id="home" className="hero-section section-container">
        <div className="hero-bg">
          <div className="hero-glow-1"></div>
          <div className="hero-glow-2"></div>
        </div>
        <div className="hero-grid">
          <div className="hero-content animate-on-scroll visible">
            <h1 className="hero-title">IDEATHON<br />2026</h1>
            <h2 className="hero-subtitle">Think. Innovate. Transform.</h2>
            <p className="hero-desc">
              A two-day premier innovation and ideation challenge organized by IET Hyderabad Local Network at VIT-AP University.
              Transform breakthrough ideas into viable prototypes and pitch before industry leaders.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <button type="button" className="btn btn-primary" disabled aria-disabled="true" style={{ opacity: 0.6, cursor: 'not-allowed' }}>REGISTRATION STARTS SOON</button>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 20px', borderRadius: '8px', background: 'rgba(170, 200, 30, 0.1)', border: '1px solid rgba(170, 200, 30, 0.35)' }}>
                <Clock size={16} color="#AAC81E" />
                <span style={{ fontSize: '14px', color: '#FFFFFF', fontWeight: 600 }}>Last Date to Register: <span style={{ color: '#AAC81E' }}>20 November 2026</span></span>
              </div>
            </div>
          </div>

          <div className="hero-image animate-on-scroll delay-2 visible">
            <div className="tech-illustration">
              <div className="tech-body">
                <div className="tech-screen">
                  <div className="circuit-lines"></div>
                  <Lightbulb size={120} strokeWidth={1.5} className="tech-icon-center" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section id="details" className="section-container animate-on-scroll">
        <div className="section-title-wrapper">
          <h2 className="section-title">EVENT DETAILS</h2>
          <div className="section-divider" style={{ marginTop: '24px' }}>
            <div className="divider-line"></div>
            <div className="divider-dot"></div>
            <div className="divider-line"></div>
          </div>
        </div>

        <div className="grid-stats">
          <div className="glass-card stat-card">
            <Calendar className="stat-icon" size={32} />
            <h3 className="stat-title">Event Dates</h3>
            <p className="stat-value">4–5 December 2026</p>
          </div>
          <div className="glass-card stat-card" style={{ border: '1px solid rgba(170, 200, 30, 0.5)', background: 'linear-gradient(145deg, rgba(170,200,30,0.08), rgba(21,21,24,0.8))' }}>
            <Clock className="stat-icon" size={32} />
            <h3 className="stat-title">Last Date to Register</h3>
            <p className="stat-value" style={{ color: '#AAC81E' }}>20 November 2026</p>
          </div>
          <div className="glass-card stat-card">
            <MapPin className="stat-icon" size={32} />
            <h3 className="stat-title">Venue</h3>
            <p className="stat-value">VIT-AP University</p>
          </div>
          <div className="glass-card stat-card">
            <Users className="stat-icon" size={32} />
            <h3 className="stat-title">Team Size</h3>
            <p className="stat-value">2–4 Members</p>
          </div>
          <div className="glass-card stat-card">
            <Trophy className="stat-icon" size={32} />
            <h3 className="stat-title">Competition Format</h3>
            <p className="stat-value">Ideathon Sprint (2 Rounds)</p>
          </div>
          <div className="glass-card stat-card">
            <Clock className="stat-icon" size={32} />
            <h3 className="stat-title">Time</h3>
            <p className="stat-value">Starts 1:00 PM (4 Dec)</p>
          </div>
        </div>
      </section>

      {/* The Challenge Highlights */}
      <section id="challenge" className="section-container animate-on-scroll">
        <div className="section-title-wrapper">
          <h2 className="section-title">THE CHALLENGE</h2>
          <p className="section-subtitle">A high-impact two-day innovation sprint turning novel concepts into viable prototypes</p>
          <div className="section-divider" style={{ marginTop: '24px' }}>
            <div className="divider-line"></div>
            <div className="divider-dot"></div>
            <div className="divider-line"></div>
          </div>
        </div>

        <div className="grid-3">
          <div className="glass-card" style={{ padding: '28px' }}>
            <Sparkles size={36} color="#AAC81E" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>Idea Generation &amp; Brainstorming</h3>
            <p style={{ fontSize: '14px', color: '#A0A0A0', lineHeight: 1.6, margin: 0 }}>
              Teams dive into focused ideation across modern societal domains, defining problems and shaping innovative approaches.
            </p>
          </div>
          <div className="glass-card" style={{ padding: '28px' }}>
            <Code size={36} color="#AAC81E" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>Rapid Implementation Sprint</h3>
            <p style={{ fontSize: '14px', color: '#A0A0A0', lineHeight: 1.6, margin: 0 }}>
              Structured development blocks on Day 1 allow teams to construct functional models, design architectures, and prototype features.
            </p>
          </div>
          <div className="glass-card" style={{ padding: '28px' }}>
            <Trophy size={36} color="#AAC81E" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>2-Round Rigorous Evaluation</h3>
            <p style={{ fontSize: '14px', color: '#A0A0A0', lineHeight: 1.6, margin: 0 }}>
              Undergo milestone evaluation in Round 1 and pitch live with 10-minute demo presentations before jury in Round 2.
            </p>
          </div>
        </div>
      </section>

      {/* Programme Schedule Section */}
      <section id="schedule" className="section-container animate-on-scroll">
        <div className="section-title-wrapper">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 18px', borderRadius: '9999px', background: 'rgba(170, 200, 30, 0.1)', border: '1px solid rgba(170, 200, 30, 0.3)', marginBottom: '16px' }}>
            <Calendar size={16} color="#AAC81E" />
            <span style={{ fontSize: '13px', color: '#AAC81E', fontWeight: 700, letterSpacing: '1px' }}>4–5 DECEMBER 2026 • VIT-AP UNIVERSITY</span>
          </div>
          <h2 className="section-title">EVENT SCHEDULE</h2>
          <p className="section-subtitle">
            IDEATHON — Complete Two-Day Schedule organized by IET Hyderabad Local Network
          </p>
          <div className="section-divider" style={{ marginTop: '24px' }}>
            <div className="divider-line"></div>
            <div className="divider-dot"></div>
            <div className="divider-line"></div>
          </div>
        </div>

        {/* Schedule Day Selector Tabs */}
        <div className="schedule-tabs">
          <button
            type="button"
            onClick={() => setActiveScheduleDay(1)}
            className={`schedule-tab-btn ${activeScheduleDay === 1 ? 'active' : ''}`}
          >
            <Clock size={18} />
            <span>DAY 1 — Friday, 4 December 2026</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveScheduleDay(2)}
            className={`schedule-tab-btn ${activeScheduleDay === 2 ? 'active' : ''}`}
          >
            <Clock size={18} />
            <span>DAY 2 — Saturday, 5 December 2026</span>
          </button>
        </div>

        {/* Schedule Timeline List */}
        <div>
          {(activeScheduleDay === 1 ? day1Schedule : day2Schedule).map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index} className={`timeline-card ${item.highlight ? 'highlight' : ''}`}>
                <div className="time-badge">
                  {item.time}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '6px' }}>
                    <span className={`tag-badge ${item.highlight ? 'special' : ''}`}>
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="activity-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <IconComponent size={20} color="#AAC81E" style={{ flexShrink: 0 }} />
                    <span>{item.title}</span>
                  </h3>
                  <p className="activity-desc">
                    {item.desc}
                  </p>
                  {item.perk && (
                    <div className="perk-note">
                      <span>☕</span>
                      <span>{item.perk}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Thematic Tracks Section */}
      <section id="tracks" className="section-container animate-on-scroll">
        <div className="section-title-wrapper">
          <h2 className="section-title">THEMATIC TRACKS</h2>
          <p className="section-subtitle">Select your preferred problem domain and pioneer transformative technological answers:</p>
          <div className="section-divider" style={{ marginTop: '24px' }}>
            <div className="divider-line"></div>
            <div className="divider-dot"></div>
            <div className="divider-line"></div>
          </div>
        </div>

        <div className="grid-3">
          {thematicTracks.map((track, idx) => {
            const TrackIcon = track.icon;
            return (
              <div key={idx} className="glass-card" style={{ padding: '24px' }}>
                <TrackIcon size={36} color="#AAC81E" style={{ marginBottom: '14px' }} />
                <h3 style={{ fontSize: '17px', marginBottom: '8px', color: '#FFFFFF', fontWeight: 700 }}>
                  {track.name}
                </h3>
                <p style={{ fontSize: '13px', color: '#A0A0A0', margin: 0, lineHeight: 1.5 }}>
                  {track.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Guidelines Section */}
      <section id="guidelines" className="section-container animate-on-scroll">
        <div className="section-title-wrapper">
          <h2 className="section-title">GUIDELINES</h2>
          <div className="section-divider">
            <div className="divider-line"></div>
            <div className="divider-dot"></div>
            <div className="divider-line"></div>
          </div>
        </div>

        <div className="guidelines-grid">
          <div>
            <ul className="checklist">
              <li>
                <CheckCircle2 className="checklist-icon" size={20} />
                <span>Team capacity is 2 to 4 members.</span>
              </li>
              <li>
                <CheckCircle2 className="checklist-icon" size={20} />
                <span>Develop and present working prototype &amp; solution demonstration.</span>
              </li>
              <li>
                <CheckCircle2 className="checklist-icon" size={20} />
                <span>Open technology stack — use any programming languages, frameworks, or cloud APIs.</span>
              </li>
              <li>
                <CheckCircle2 className="checklist-icon" size={20} />
                <span>Original work created and implemented during the Ideathon schedule.</span>
              </li>
              <li>
                <CheckCircle2 className="checklist-icon" size={20} />
                <span>Adhere to strict academic and ethical integrity; plagiarism is prohibited.</span>
              </li>
              <li>
                <CheckCircle2 className="checklist-icon" size={20} />
                <span>Teams must participate in both evaluation rounds to qualify for final awards.</span>
              </li>
            </ul>
          </div>

          <div style={{ padding: '20px' }}>
            <div className="clipboard-illustration">
              <div className="clipboard-clip"></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
                <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', width: '100%', borderRadius: '2px' }}></div>
                <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', width: '80%', borderRadius: '2px' }}></div>
                <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', width: '90%', borderRadius: '2px' }}></div>
                <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', width: '60%', borderRadius: '2px' }}></div>
              </div>
              <div className="clipboard-shield">
                <ShieldCheck size={48} color="#AAC81E" strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grand Finale */}
      <section id="finale" className="section-container animate-on-scroll">
        <div className="section-title-wrapper">
          <h2 className="section-title">EVALUATION FLOW</h2>
          <div className="section-divider" style={{ marginTop: '24px' }}>
            <div className="divider-line"></div>
            <div className="divider-dot"></div>
            <div className="divider-line"></div>
          </div>
        </div>

        <div className="grid-3">
          <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Lightbulb size={40} color="#AAC81E" strokeWidth={1.5} />
            <p style={{ margin: 0, fontWeight: 500 }}>Formulate novel solution framework.</p>
          </div>
          <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <MonitorPlay size={40} color="#AAC81E" strokeWidth={1.5} />
            <p style={{ margin: 0, fontWeight: 500 }}>Demonstrate live working prototype.</p>
          </div>
          <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <MessageSquare size={40} color="#AAC81E" strokeWidth={1.5} />
            <p style={{ margin: 0, fontWeight: 500 }}>10-minute presentation &amp; jury Q&amp;A.</p>
          </div>
        </div>
      </section>

      {/* Evaluation Criteria */}
      <section className="section-container animate-on-scroll">
        <div className="section-title-wrapper">
          <h2 className="section-title">EVALUATION CRITERIA</h2>
          <div className="section-divider" style={{ marginTop: '24px' }}>
            <div className="divider-line"></div>
            <div className="divider-dot"></div>
            <div className="divider-line"></div>
          </div>
        </div>

        <div className="grid-7">
          <div className="glass-card eval-card">
            <Lightbulb className="eval-icon" strokeWidth={1.5} />
            <div className="eval-title">Innovation</div>
          </div>
          <div className="glass-card eval-card">
            <Settings className="eval-icon" strokeWidth={1.5} />
            <div className="eval-title">Feasibility</div>
          </div>
          <div className="glass-card eval-card">
            <Code className="eval-icon" strokeWidth={1.5} />
            <div className="eval-title">Implementation</div>
          </div>
          <div className="glass-card eval-card">
            <Zap className="eval-icon" strokeWidth={1.5} />
            <div className="eval-title">Scalability</div>
          </div>
          <div className="glass-card eval-card">
            <Users className="eval-icon" strokeWidth={1.5} />
            <div className="eval-title">Social Impact</div>
          </div>
          <div className="glass-card eval-card">
            <Presentation className="eval-icon" strokeWidth={1.5} />
            <div className="eval-title">Presentation</div>
          </div>
          <div className="glass-card eval-card">
            <LifeBuoy className="eval-icon" strokeWidth={1.5} />
            <div className="eval-title">Technical Q&amp;A</div>
          </div>
        </div>
      </section>

      {/* Winners & Awards */}
      <section className="section-container animate-on-scroll">
        <div className="winners-banner">
          <div className="winners-left-icon">
            <Trophy size={64} color="#AAC81E" strokeWidth={1.5} />
          </div>
          <div className="winners-center">
            <h2 className="winners-title">AWARDS &amp; RECOGNITION</h2>
            <p className="winners-desc">
              Outstanding teams will be awarded with <span className="winners-highlight">exciting cash prizes</span>, incubation guidance, and official IET certificates of excellence.
            </p>
          </div>
          <div className="winners-right">
            <img src="https://api.iconify.design/mdi:crowd.svg?color=%23ffffff" style={{ width: '400px' }} alt="Crowd" />
          </div>
        </div>
      </section>

      {/* Coordinators & Contact Section */}
      <section id="contact" className="section-container animate-on-scroll">
        <div className="section-title-wrapper">
          <h2 className="section-title">COORDINATORS &amp; CONTACT</h2>
          <p className="section-subtitle">Event Faculty &amp; Student Inquiries — VIT-AP University</p>
          <div className="section-divider" style={{ marginTop: '24px' }}>
            <div className="divider-line"></div>
            <div className="divider-dot"></div>
            <div className="divider-line"></div>
          </div>
        </div>

        {/* Faculty Coordinator Profile Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: '24px', marginBottom: '32px' }}>
          {[
            { name: 'Dr. Venkatesh B', role: 'Associate Professor Grade-1', school: 'School of Computer Science and Engineering (SCOPE)' },
            { name: 'Dr. Ravi Kumar Poluru', role: 'Assistant Professor (Senior Grade 2)', school: 'School of Computer Science and Engineering (SCOPE)' },
          ].map((c) => (
            <div key={c.name} className="glass-card" style={{ padding: '28px', border: '1px solid rgba(170, 200, 30, 0.35)', background: 'linear-gradient(145deg, rgba(21,21,24,0.9), rgba(13,13,15,0.95))' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'rgba(170, 200, 30, 0.12)', border: '1px solid rgba(170, 200, 30, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#AAC81E', flexShrink: 0 }}>
                  <Users size={28} />
                </div>
                <div>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#AAC81E', fontWeight: 700 }}>Faculty Coordinator</span>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, margin: '4px 0 6px 0', color: '#FFFFFF' }}>{c.name}</h3>
                  <p style={{ color: '#E0E0E0', fontSize: '14px', margin: '0 0 4px 0' }}>{c.role}</p>
                  <p style={{ color: '#A0A0A0', fontSize: '13px', margin: '0 0 2px 0' }}>{c.school}</p>
                  <p style={{ color: '#888888', fontSize: '12px', margin: 0 }}>VIT-AP University</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid-3">
          <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Mail size={32} color="#AAC81E" strokeWidth={1.5} />
            <div>
              <p style={{ color: '#A0A0A0', fontSize: '13px', margin: '0 0 4px 0' }}>Email</p>
              <p style={{ margin: 0, fontWeight: 500 }}>iethyderabadflc@gmail.com</p>
            </div>
          </div>
          <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <MapPin size={32} color="#AAC81E" strokeWidth={1.5} />
            <div>
              <p style={{ color: '#A0A0A0', fontSize: '13px', margin: '0 0 4px 0' }}>Location</p>
              <p style={{ margin: 0, fontWeight: 500 }}>VIT-AP University, Amaravati</p>
            </div>
          </div>
          <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <LifeBuoy size={32} color="#AAC81E" strokeWidth={1.5} />
            <div>
              <p style={{ color: '#A0A0A0', fontSize: '13px', margin: '0 0 4px 0' }}>Support</p>
              <p style={{ margin: 0, fontWeight: 500 }}>Ideathon &amp; Registration Inquiries</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-container" style={{ textAlign: 'center', paddingBottom: '120px' }}>
        <button type="button" className="btn btn-primary" disabled aria-disabled="true" style={{ opacity: 0.6, cursor: 'not-allowed', width: '100%', maxWidth: '600px', height: '64px', fontSize: '20px' }}>
          <Users size={24} style={{ marginRight: '12px' }} /> REGISTRATION STARTS SOON
        </button>
      </section>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default InnothonLanding;