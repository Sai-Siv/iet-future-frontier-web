import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import {
  Calendar, MapPin, Users, Trophy, Clock,
  Settings, ClipboardCheck, Smartphone, Zap,
  MonitorSmartphone, ShieldCheck, Mail, Phone, LifeBuoy,
  ArrowUp, Download, CheckCircle2, ChevronRight,
  FileText, Megaphone, Lock, Bell, Code, MessageSquare, Play, Lightbulb, Presentation, MonitorPlay,
  Cpu, HeartPulse, Network, Leaf, IndianRupee, Flag, Laptop, Instagram
} from 'lucide-react';

const ProtoPlanetLanding = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

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
    // Initial check
    setTimeout(handleScroll, 100);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="protoplanet-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Poppins:wght@600;700;800&display=swap');

        .protoplanet-container {
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
          background: #a046b4;
          color: white;
          border: none;
          box-shadow: 0 0 20px rgba(160, 70, 180, 0.4);
        }
        .btn-primary:hover {
          background: #a046b4;
          box-shadow: 0 0 30px rgba(160, 70, 180, 0.6);
        }
        .btn-outline {
          background: transparent;
          color: white;
          border: 1px solid rgba(160, 70, 180, 0.5);
        }
        .btn-outline:hover {
          border-color: #a046b4;
          background: rgba(160, 70, 180, 0.1);
        }

        /* Glass Card Base */
        .glass-card {
          background: #151518;
          border: 1px solid rgba(160, 70, 180, 0.25);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        .glass-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 40px rgba(160, 70, 180, 0.15);
          border-color: rgba(160, 70, 180, 0.5);
        }
        
        /* Typography */
        .section-title-wrapper {
          text-align: center;
          margin-top: 120px;
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
          background: linear-gradient(90deg, transparent, rgba(160, 70, 180, 0.5), transparent);
        }
        .divider-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #a046b4;
          box-shadow: 0 0 10px #a046b4;
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
          background: radial-gradient(circle, rgba(160, 70, 180,0.15) 0%, transparent 70%);
          filter: blur(60px);
        }
        .hero-glow-2 {
          position: absolute;
          bottom: 10%;
          left: 10%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(160, 70, 180,0.1) 0%, transparent 70%);
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
            grid-template-columns: 1fr 1fr;
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
          font-size: 2.5rem;
          font-weight: 700;
          color: #a046b4;
          margin-bottom: 16px;
          line-height: 1.2;
        }
        .hero-desc {
          font-size: 16px;
          color: #A0A0A0;
          margin-bottom: 32px;
          max-width: 540px;
        }
        .hero-buttons {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }
        
        /* Hero Illustration (Lightbulb) */
        .phone-illustration {
          position: relative;
          width: 100%;
          max-width: 300px;
          margin: 0 auto;
          perspective: 1000px;
        }
        .phone-body {
          background: linear-gradient(145deg, #1A1A1E, #0D0D0F);
          border: 2px solid rgba(160, 70, 180,0.4);
          border-radius: 50%;
          padding: 10px;
          width: 300px;
          height: 300px;
          box-shadow: 0 0 50px rgba(160, 70, 180,0.2), inset 0 0 20px rgba(160, 70, 180,0.1);
          transform: rotateY(-15deg) rotateX(10deg);
          transform-style: preserve-3d;
          animation: float 6s ease-in-out infinite;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .phone-screen {
          background: #000;
          border-radius: 50%;
          width: 260px;
          height: 260px;
          border: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .phone-screen::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(160, 70, 180,0.2) 0%, transparent 60%);
        }
        .phone-icon-center {
          color: #a046b4;
          filter: drop-shadow(0 0 15px rgba(160, 70, 180,0.8));
          z-index: 2;
        }
        .circuit-lines {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(160, 70, 180,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(160, 70, 180,0.1) 1px, transparent 1px);
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

        /* 5 Column Grid (Event Details & Theme) */
        .grid-5 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 24px;
        }
        @media (min-width: 992px) {
          .grid-5 {
            grid-template-columns: repeat(5, 1fr);
          }
        }
        .stat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 32px 20px;
        }
        .stat-icon {
          color: #a046b4;
          margin-bottom: 16px;
          background: rgba(160, 70, 180, 0.1);
          padding: 16px;
          border-radius: 50%;
          box-shadow: 0 0 20px rgba(160, 70, 180,0.15);
          box-sizing: content-box;
        }
        .stat-title {
          font-size: 14px;
          color: #A0A0A0;
          margin-bottom: 8px;
          font-weight: 500;
        }
        .stat-value {
          font-size: 16px;
          font-weight: 600;
          color: white;
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
          border-color: rgba(160, 70, 180,0.3);
        }
        .checklist-icon {
          color: #a046b4;
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
          border: 2px solid rgba(160, 70, 180,0.3);
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
          border: 2px solid rgba(160, 70, 180,0.5);
        }
        .clipboard-shield {
          position: absolute;
          bottom: -20px;
          right: -20px;
          background: #0D0D0F;
          border-radius: 50%;
          padding: 10px;
        }

        /* Banner (PPT & Winners) */
        .horizontal-banner {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding: 40px;
        }
        @media (min-width: 768px) {
          .horizontal-banner {
            flex-direction: row;
          }
        }
        .banner-content {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .banner-icon {
          background: rgba(160, 70, 180,0.1);
          color: #a046b4;
          padding: 20px;
          border-radius: 16px;
        }

        /* Grand Finale / Structure */
        .grid-3 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        /* Winners */
        .winners-banner {
          background: linear-gradient(135deg, rgba(30, 0, 40, 0.9) 0%, rgba(10, 0, 20, 0.9) 100%);
          border: 1px solid rgba(160, 70, 180, 0.15);
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
          background: rgba(255, 215, 0, 0.08);
          padding: 24px;
          border-radius: 50%;
          border: 1px solid rgba(255, 215, 0, 0.2);
          box-shadow: 0 0 30px rgba(255, 215, 0, 0.15);
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
          color: #a046b4;
          font-weight: 600;
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
            <h1 className="hero-title">PROTOPLANET<br />2026</h1>
            <h2 className="hero-subtitle">Makethon for Sustainability Application.</h2>
            <p className="hero-desc">
              A hardware innovation competition designed to empower engineering students to develop and demonstrate impactful solutions using emerging and future technologies. Build what the future needs today.
            </p>
            <div className="hero-buttons">
              <Link to="/protoplanet/register" className="btn btn-primary">REGISTER NOW</Link>
              <a href="#" download className="btn btn-outline">
                <Download size={18} style={{ marginRight: '8px' }} /> DOWNLOAD PPT TEMPLATE
              </a>
            </div>
          </div>

          <div className="hero-image animate-on-scroll delay-2 visible">
            <div className="phone-illustration">
              <div className="phone-body">
                <div className="phone-screen">
                  <div className="circuit-lines"></div>
                  <Lightbulb size={120} strokeWidth={1.5} className="phone-icon-center" />
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

        <div className="grid-5">
          <div className="glass-card stat-card">
            <Calendar className="stat-icon" size={32} />
            <h3 className="stat-title">Event Date</h3>
            <p className="stat-value">August 22, 2026</p>
          </div>
          <div className="glass-card stat-card">
            <MapPin className="stat-icon" size={32} />
            <h3 className="stat-title">Venue</h3>
            <p className="stat-value">VIT-AP University, Amaravati</p>
          </div>
          <div className="glass-card stat-card">
            <Users className="stat-icon" size={32} />
            <h3 className="stat-title">Team Size</h3>
            <p className="stat-value">Maximum 3 Members</p>
          </div>
          <div className="glass-card stat-card">
            <IndianRupee className="stat-icon" size={32} />
            <h3 className="stat-title">Registration Fee</h3>
            <p className="stat-value">₹200 / Team</p>
          </div>
          <div className="glass-card stat-card">
            <Clock className="stat-icon" size={32} />
            <h3 className="stat-title">Time</h3>
            <p className="stat-value">10:00 AM - 4:00 PM</p>
          </div>
        </div>
      </section>

      {/* Tracks Section */}
      <section id="theme" className="section-container animate-on-scroll">
        <div className="section-title-wrapper">
          <h2 className="section-title">THEMATIC TRACKS</h2>
          <p className="section-subtitle">Develop your hardware solutions based on one of the following tracks:</p>
          <div className="section-divider" style={{ marginTop: '24px' }}>
            <div className="divider-line"></div>
            <div className="divider-dot"></div>
            <div className="divider-line"></div>
          </div>
        </div>

        <div className="grid-5">
          <div className="glass-card">
            <Cpu size={40} color="#a046b4" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>1. AI, IoT & Industry 4.0</h3>
            <p style={{ fontSize: '13px', color: '#A0A0A0' }}>Innovative solutions leveraging AI, IoT, and smart factory technologies.</p>
          </div>
          <div className="glass-card">
            <HeartPulse size={40} color="#a046b4" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>2. Healthcare & Assistive Tech</h3>
            <p style={{ fontSize: '13px', color: '#A0A0A0' }}>Tools to improve healthcare delivery, monitoring, and accessibility.</p>
          </div>
          <div className="glass-card">
            <Network size={40} color="#a046b4" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>3. Smart Cities & Mobility</h3>
            <p style={{ fontSize: '13px', color: '#A0A0A0' }}>Enhance urban infrastructure, transport, and civic systems.</p>
          </div>
          <div className="glass-card">
            <Lightbulb size={40} color="#a046b4" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>4. Open Innovation</h3>
            <p style={{ fontSize: '13px', color: '#A0A0A0' }}>If your idea solves a real problem innovatively, this is your track.</p>
          </div>
          <div className="glass-card">
            <Leaf size={40} color="#a046b4" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>5. Sustainable Technology</h3>
            <p style={{ fontSize: '13px', color: '#A0A0A0' }}>Solutions promoting sustainability and green energy efficiency.</p>
          </div>
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
                <span>Maximum team capacity is 3 members.</span>
              </li>
              <li>
                <CheckCircle2 className="checklist-icon" size={20} />
                <span>Registration fee: ₹200/- per team.</span>
              </li>
              <li>
                <CheckCircle2 className="checklist-icon" size={20} />
                <span>If any one participant is a part of IET, registration is <strong>free</strong>.</span>
              </li>
              <li>
                <CheckCircle2 className="checklist-icon" size={20} />
                <span>Problem statement must relate to the thematic tracks.</span>
              </li>
              <li>
                <CheckCircle2 className="checklist-icon" size={20} />
                <span>Presentation should not contain more than 10 slides.</span>
              </li>
              <li>
                <CheckCircle2 className="checklist-icon" size={20} />
                <span>File should be named as team.ppt (e.g., algo_rangers.ppt).</span>
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
                <ShieldCheck size={48} color="#a046b4" strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Official PPT Section */}
      <section id="template" className="section-container animate-on-scroll">
        <div className="glass-card horizontal-banner">
          <div className="banner-content">
            <div className="banner-icon">
              <FileText size={48} strokeWidth={1.5} />
            </div>
            <div>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>OFFICIAL PPT TEMPLATE</h3>
              <p style={{ color: '#A0A0A0', fontSize: '14px', margin: 0 }}>
                Download the official template before submission (coming soon).
              </p>
            </div>
          </div>
          <a href="#" className="btn btn-primary" style={{ flexShrink: 0 }}>
            <Download size={20} style={{ marginRight: '8px' }} /> DOWNLOAD PPT TEMPLATE
          </a>
        </div>
      </section>

      {/* Competition Flow */}
      <section id="finale" className="section-container animate-on-scroll">
        <div className="section-title-wrapper">
          <h2 className="section-title">COMPETITION FLOW</h2>
          <div className="section-divider" style={{ marginTop: '24px' }}>
            <div className="divider-line"></div>
            <div className="divider-dot"></div>
            <div className="divider-line"></div>
          </div>
        </div>

        <div className="grid-3">
          <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Flag size={40} color="#a046b4" strokeWidth={1.5} />
            <div>
              <h3 style={{ fontSize: '16px', marginBottom: '4px' }}>Round 1: Online Submission</h3>
              <p style={{ margin: 0, fontWeight: 400, color: '#A0A0A0', fontSize: '14px' }}>Last Date: 14th August 2026</p>
            </div>
          </div>
          <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Laptop size={40} color="#a046b4" strokeWidth={1.5} />
            <div>
              <h3 style={{ fontSize: '16px', marginBottom: '4px' }}>Round 2: On-Site Presentation</h3>
              <p style={{ margin: 0, fontWeight: 400, color: '#A0A0A0', fontSize: '14px' }}>22nd August 2026 at VIT-AP</p>
            </div>
          </div>
          <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Trophy size={40} color="#a046b4" strokeWidth={1.5} />
            <div>
              <h3 style={{ fontSize: '16px', marginBottom: '4px' }}>Grand Finale</h3>
              <p style={{ margin: 0, fontWeight: 400, color: '#A0A0A0', fontSize: '14px' }}>Top 5 teams selected to represent</p>
            </div>
          </div>
        </div>
      </section>

      {/* Winners */}
      <section className="section-container animate-on-scroll" style={{ marginTop: '60px' }}>
        <div className="winners-banner">
          <div className="winners-left-icon">
            <Trophy size={64} color="#FFD700" strokeWidth={1.5} />
          </div>
          <div className="winners-center">
            <h2 className="winners-title">AWARDS & RECOGNITION</h2>
            <p className="winners-desc">
              Winning teams will receive <span className="winners-highlight">attractive cash prizes</span>. Certificates of merit will be provided to all participants from IET Hyderabad LN.
            </p>
          </div>
          <div className="winners-right">
            <img src="https://api.iconify.design/mdi:crowd.svg?color=%23ffffff" style={{ width: '400px' }} alt="Crowd" />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-container animate-on-scroll">
        <div className="section-title-wrapper">
          <h2 className="section-title">CONTACT</h2>
          <p className="section-subtitle">Event Coordinators</p>
          <div className="section-divider" style={{ marginTop: '24px' }}>
            <div className="divider-line"></div>
            <div className="divider-dot"></div>
            <div className="divider-line"></div>
          </div>
        </div>

        <div className="grid-3">
          <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Mail size={32} color="#a046b4" strokeWidth={1.5} />
            <div>
              <p style={{ color: '#A0A0A0', fontSize: '13px', margin: '0 0 4px 0' }}>Email</p>
              <p style={{ margin: 0, fontWeight: 500 }}>iet.oncampus@vitap.ac.in</p>
            </div>
          </div>
          <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Phone size={32} color="#a046b4" strokeWidth={1.5} />
            <div>
              <p style={{ color: '#A0A0A0', fontSize: '13px', margin: '0 0 4px 0' }}>Phone (Bhanu Bhargavi)</p>
              <p style={{ margin: 0, fontWeight: 500 }}>+91 81431 27444</p>
            </div>
          </div>
          <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Instagram size={32} color="#a046b4" strokeWidth={1.5} />
            <div>
              <p style={{ color: '#A0A0A0', fontSize: '13px', margin: '0 0 4px 0' }}>Instagram</p>
              <p style={{ margin: 0, fontWeight: 500 }}>@iet.oncampus.vitap</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-container" style={{ textAlign: 'center', paddingBottom: '120px', paddingTop: '60px' }}>
        <Link to="/protoplanet/register" className="btn btn-primary" style={{ width: '100%', maxWidth: '600px', height: '64px', fontSize: '20px' }}>
          <Users size={24} style={{ marginRight: '12px' }} /> REGISTER NOW
        </Link>
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

export default ProtoPlanetLanding;
