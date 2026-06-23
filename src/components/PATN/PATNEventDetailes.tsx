import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserCheck,
  faMapMarkerAlt,
  faLightbulb,
  faCheckCircle,
  faUserGraduate,
} from '@fortawesome/free-solid-svg-icons';
import ScrollReveal from 'scrollreveal';

interface Styles {
  [key: string]: React.CSSProperties;
}

const PATNEventDetails = () => {
  useEffect(() => {
    ScrollReveal().reveal('#details .infoCard', {
      origin: 'bottom',
      distance: '30px',
      duration: 800,
      easing: 'ease-in-out',
      interval: 200
    });
  }, []);

  const styles: Styles = {
    container: {
      backgroundColor: '#000000',
      padding: '2rem',
      borderRadius: '1.5rem',
      
      margin: '2rem auto',
      maxWidth: '1200px',
      color: 'white',
      fontFamily: "'Times New Roman', Times, serif"
    },
    title: {
      textAlign: 'center',
      fontSize: '2.8rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
      color: '#ffffff'
    },
    subtitle: {
      textAlign: 'center',
      color: '#cccccc',
      fontSize: '1.2rem',
      marginBottom: '2.5rem'
    },
    row: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '1.5rem',
      marginBottom: '1.5rem'
    },
    infoCard: {
      background: '#111',
      borderRadius: '1rem',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      boxShadow: '0 4px 18px rgba(34, 187, 224, 0.3)',
      flex: '1 1 300px',
      maxWidth: '500px'
    },
    infoHeader: {
      background: 'linear-gradient(to right, #003A66, #22bbe0)',
      borderRadius: '1rem 1rem 0 0',
      padding: '1rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    infoHeaderH3: {
      color: '#ffffff',
      fontWeight: 'bold',
      margin: 0,
      fontSize: '1.3rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.6rem',
      justifyContent: 'center'
    },
    whiteIcon: {
      color: '#ffffff',
      marginRight: '0.5rem',
      fontSize: '1.1rem',
      minWidth: '20px'
    },
    infoBody: {
      padding: '1.5rem',
      flexGrow: 1,
      fontSize: '1rem',
      lineHeight: '1.6'
    },
    infoList: {
      listStyle: 'none',
      padding: 0,
      margin: '1rem 0'
    },
    infoListItem: {
      marginBottom: '0.75rem',
      fontSize: '1rem',
      display: 'flex',
      alignItems: 'center'
    },
    infoListIcon: {
      color: '#22bbe0',
      marginRight: '0.5rem',
      fontSize: '1.1rem',
      minWidth: '20px'
    },
    infoNote: {
      background: '#1a1a1a',
      color: '#ffffff',
      borderRadius: '0.5rem',
      padding: '0.75rem 1rem',
      marginTop: '1rem',
      fontSize: '0.95rem',
      borderLeft: '4px solid #22bbe0'
    },
    whyParticipate: {
      background: '#111',
      borderRadius: '1rem',
      padding: '2rem 1.5rem',
      marginTop: '3rem',
      boxShadow: '0 6px 20px rgba(34, 187, 224, 0.3)'
    },
    whyTitle: {
      textAlign: 'center',
      color: '#22bbe0',
      fontWeight: 'bold',
      marginBottom: '2rem',
      fontSize: '1.7rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '0.6rem'
    },
    whyList: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem'
    },
    whyListCol: {
      flex: '1 1 300px',
      padding: '0 1rem'
    }
  };

  return (
    <section
      id="details"
      style={{ backgroundColor: '#000000', padding: '2rem 1rem', fontFamily: "'Times New Roman', Times, serif" }}
    >
      <div style={styles.container}>
        <h1 style={styles.title}>Event Details</h1>
        <p style={styles.subtitle}>Everything you need to know about PATN 2026</p>

        <div style={styles.row}>
          {/* Eligibility Criteria */}
          <div className="infoCard" style={styles.infoCard}>
            <div style={styles.infoHeader}>
              <h3 style={styles.infoHeaderH3}>
                <FontAwesomeIcon icon={faUserCheck} style={styles.whiteIcon} />
                Eligibility Criteria
              </h3>
            </div>
            <div style={styles.infoBody}>
              <p>Open to students and young professionals from:</p>
              <ul style={styles.infoList}>
                <li style={styles.infoListItem}>
                  <FontAwesomeIcon icon={faMapMarkerAlt} style={styles.infoListIcon} /> Andhra Pradesh
                </li>
                <li style={styles.infoListItem}>
                  <FontAwesomeIcon icon={faMapMarkerAlt} style={styles.infoListIcon} /> Telangana
                </li>
                <li style={styles.infoListItem}>
                  <FontAwesomeIcon icon={faMapMarkerAlt} style={styles.infoListIcon} /> Chhattisgarh
                </li>
              </ul>
              <div style={styles.infoNote}>
                Passionate about engineering and technology? This event is for you!
              </div>
            </div>
          </div>

          {/* Topic Guidelines */}
          <div className="infoCard" style={styles.infoCard}>
            <div style={styles.infoHeader}>
              <h3 style={styles.infoHeaderH3}>
                <FontAwesomeIcon icon={faLightbulb} style={styles.whiteIcon} />
                Topic Guidelines
              </h3>
            </div>
            <div style={styles.infoBody}>
              <p>Choose topics related to engineering, tech, or innovation:</p>
              <ul style={styles.infoList}>
                <li style={styles.infoListItem}>
                  <FontAwesomeIcon icon={faCheckCircle} style={styles.infoListIcon} /> Engineering innovations
                </li>
                <li style={styles.infoListItem}>
                  <FontAwesomeIcon icon={faCheckCircle} style={styles.infoListIcon} /> Emerging technologies (AI, IoT, etc.)
                </li>
                <li style={styles.infoListItem}>
                  <FontAwesomeIcon icon={faCheckCircle} style={styles.infoListIcon} /> Sustainable solutions
                </li>
                <li style={styles.infoListItem}>
                  <FontAwesomeIcon icon={faCheckCircle} style={styles.infoListIcon} /> Industry 4.0 & Automation
                </li>
                <li style={styles.infoListItem}>
                  <FontAwesomeIcon icon={faCheckCircle} style={styles.infoListIcon} /> Any tech-related idea
                </li>
              </ul>
              <div style={styles.infoNote}>
                <FontAwesomeIcon icon={faLightbulb} style={styles.infoListIcon} />
                Pick a topic that reflects your passion and creativity!
              </div>
            </div>
          </div>
        </div>

        <div style={styles.whyParticipate}>
          <h2 style={styles.whyTitle}>
            <FontAwesomeIcon icon={faUserGraduate} style={styles.infoListIcon} />
            Why Participate in PATN 2026?
          </h2>
          <div style={styles.whyList}>
            <div style={styles.whyListCol}>
              <ul style={styles.infoList}>
                <li style={styles.infoListItem}>
                  <FontAwesomeIcon icon={faCheckCircle} style={styles.infoListIcon} /> Showcase technical knowledge
                </li>
                <li style={styles.infoListItem}>
                  <FontAwesomeIcon icon={faCheckCircle} style={styles.infoListIcon} /> Improve communication skills
                </li>
                <li style={styles.infoListItem}>
                  <FontAwesomeIcon icon={faCheckCircle} style={styles.infoListIcon} /> Win exciting prizes
                </li>
                <li style={styles.infoListItem}>
                  <FontAwesomeIcon icon={faCheckCircle} style={styles.infoListIcon} /> Develop professionally
                </li>
              </ul>
            </div>
            <div style={styles.whyListCol}>
              <ul style={styles.infoList}>
                <li style={styles.infoListItem}>
                  <FontAwesomeIcon icon={faCheckCircle} style={styles.infoListIcon} /> Network with peers
                </li>
                <li style={styles.infoListItem}>
                  <FontAwesomeIcon icon={faCheckCircle} style={styles.infoListIcon} /> Get certified participation
                </li>
                <li style={styles.infoListItem}>
                  <FontAwesomeIcon icon={faCheckCircle} style={styles.infoListIcon} /> Gain career visibility
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PATNEventDetails;
