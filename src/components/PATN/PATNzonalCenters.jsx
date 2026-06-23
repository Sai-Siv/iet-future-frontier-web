import React, { useEffect } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaBuilding, FaUserTie } from 'react-icons/fa';
import ScrollReveal from 'scrollreveal';

const PATNzonalCenters = () => {
  useEffect(() => {
    ScrollReveal().reveal('.page-header', {
      origin: 'top',
      distance: '30px',
      duration: 1000,
      easing: 'ease-in-out',
    });

    ScrollReveal().reveal('.zone-card', {
      origin: 'bottom',
      distance: '40px',
      duration: 1000,
      interval: 200,
      easing: 'ease-in-out',
    });

    ScrollReveal().reveal('.important-note', {
      origin: 'bottom',
      distance: '30px',
      duration: 1000,
      easing: 'ease-in-out',
    });
  }, []);

  const styles = {
    pageHeader: {
      textAlign: 'center',
      marginBottom: '1rem',
      fontFamily: "'Times New Roman', Times, serif",
      padding: '0 1.5rem'
    },
    pageHeaderH1: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
      background: 'linear-gradient(to right, #ffffff, #ffffff)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontFamily: "'Times New Roman', Times, serif"
    },
    pageHeaderP: {
      fontSize: '1.125rem',
      color: '#a0aec0',
      maxWidth: '700px',
      margin: '0 auto',
      fontFamily: "'Times New Roman', Times, serif"
    },
    eventDate: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: '#22BBE0',
      fontWeight: 'bold',
      marginTop: '1rem',
      fontFamily: "'Times New Roman', Times, serif"
    },
    zonalCenters: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '2rem',
      padding: '0 1.5rem',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    zoneCard: {
      backgroundColor: '#0a0a0a',
      borderRadius: '0.5rem',
      overflow: 'hidden',
      width: '100%',
      maxWidth: '360px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
      fontFamily: "'Times New Roman', Times, serif",
      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    },
    zoneHeader: {
      padding: '1.5rem',
      position: 'relative',
    },
    zoneBadge: {
      display: 'inline-block',
      fontWeight: 'bold',
      padding: '0.25rem 1rem',
      borderRadius: '9999px',
      fontSize: '0.875rem',
      marginBottom: '0.5rem',
    },
    zoneTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      margin: '0.5rem 0',
    },
    mapIcon: {
      position: 'absolute',
      right: '1.5rem',
      top: '1.5rem',
      fontSize: '1.5rem'
    },
    zoneBody: {
      padding: '1.5rem',
    },
    location: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.75rem',
      marginBottom: '0.5rem'
    },
    coordinator: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.75rem',
      marginBottom: '0.5rem'
    },
    iconStyle: {
      marginTop: '0.2rem',
      color: '#22BBE0'
    },
    locationDetails: {
      flex: 1
    },
    coordinatorDetails: {
      flex: 1
    },
    locationName: {
      fontWeight: 'bold',
      marginBottom: '0.25rem',
      color: 'white'
    },
    locationAddress: {
      fontSize: '0.875rem',
      color: '#a0aec0'
    },
    divider: {
      border: 'none',
      height: '1px',
      backgroundColor: '#374151',
      margin: '1.25rem 0'
    },
    coordinatorTitle: {
      fontSize: '0.875rem',
      color: '#a0aec0',
      marginBottom: '0.25rem'
    },
    coordinatorName: {
      fontWeight: 'bold',
      marginBottom: '0.25rem',
      color: 'white'
    },
    coordinatorInfo: {
      fontSize: '0.875rem',
      color: '#a0aec0',
      lineHeight: '1.5'
    },
    zone1: {
      background: 'linear-gradient(to right, #22BBE0, #003A66)',
      color: 'white'
    },
    zone1Badge: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      color: 'white'
    },
    zone2: {
      background: 'linear-gradient(to right, #003A66, #22bbe0)',
      color: 'white'
    },
    zone2Badge: {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      color: 'white'
    },
    importantNote: {
      backgroundColor: 'rgba(10, 10, 10, 0.8)',
      borderRadius: '0.5rem',
      boxShadow: '0 0 40px rgba(6, 182, 212, 0.6)',
      padding: '2rem',
      textAlign: 'center'
    },
    noteTitle: {
      fontWeight: 'bold',
      color: '#22BBE0',
      marginBottom: '1rem',
      fontSize: '1.25rem'
    },
    noteContent: {
      lineHeight: '1.6',
      fontSize: '0.8rem',
      color: '#f1f1f1'
    },
    container: {
      margin: '3rem auto',
      maxWidth: '1200px'
    }
  };

  return (
    <div style={styles.container}>
      <div className="page-header" style={styles.pageHeader}>
        <h1 style={styles.pageHeaderH1}>Zonal Centers</h1>
        <p style={styles.pageHeaderP}>Local heats will be conducted at these regional centers for PATN 2026</p>
        <div style={styles.eventDate}>
          <FaCalendarAlt />
          <span>July 31, 2026</span>
        </div>
      </div>

      <div style={styles.zonalCenters}>
        {/* Zone 1 */}
        <div className="zone-card" style={styles.zoneCard}>
          <div style={{ ...styles.zoneHeader, ...styles.zone1 }}>
            <span style={{ ...styles.zoneBadge, ...styles.zone1Badge }}>Zone 1</span>
            <h2 style={styles.zoneTitle}>Telangana & Andhra Pradesh</h2>
            <FaMapMarkerAlt style={styles.mapIcon} />
          </div>
          <div style={styles.zoneBody}>
            <div style={styles.location}>
              <FaBuilding style={styles.iconStyle} />
              <div style={styles.locationDetails}>
                <div style={styles.locationName}>Muffakham Jah College of Engineering &amp; Technology (MJCET)</div>
                <div style={styles.locationAddress}>Hyderabad, Telangana</div>
              </div>
            </div>

            <div style={styles.divider}></div>

            <div style={styles.coordinator}>
              <FaUserTie style={styles.iconStyle} />
              <div style={styles.coordinatorDetails}>
                <div style={styles.coordinatorTitle}>Event Coordinators</div>
                <div style={styles.coordinatorName}>1. Dr. Palash Mishra</div>
                <div style={styles.coordinatorInfo}>
                  Assistant Professor<br />
                  Department of Electrical Engineering<br />
                  MJCET
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <div style={styles.coordinatorName}>2. Dr. K Anil Naik</div>
                  <div style={styles.coordinatorInfo}>
                    Assistant Professor<br />
                    Department of Electrical Engineering<br />
                    MJCET
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.divider}></div>

            <div style={styles.coordinator}>
              <FaUserTie style={styles.iconStyle} />
              <div style={styles.coordinatorDetails}>
                <div style={styles.coordinatorTitle}>Zonal Coordinators</div>
                <div style={styles.coordinatorName}>1. Mrs. G B Christina</div>
                <div style={styles.coordinatorInfo}>
                  Assistant Professor<br />
                  SCET Narsapur A.P<br />
                </div>
                <div style={styles.coordinatorInfo}>📞 +916300743773</div>

                <div style={{ marginTop: '1rem' }}>
                  <div style={styles.coordinatorName}>2. Ms.Bhavya</div>
                  <div style={styles.coordinatorInfo}>
                  Associate Engineer <br />
                 KPIT Technologies<br />
                </div>
                  <div style={styles.coordinatorInfo}>📞 +917981123992</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Zone 2 */}
        <div className="zone-card" style={styles.zoneCard}>
          <div style={{ ...styles.zoneHeader, ...styles.zone2 }}>
            <span style={{ ...styles.zoneBadge, ...styles.zone2Badge }}>Zone 2</span>
            <h2 style={styles.zoneTitle}>Chhattisgarh</h2>
            <FaMapMarkerAlt style={styles.mapIcon} />
          </div>
          <div style={styles.zoneBody}>
            <div style={styles.location}>
              <FaBuilding style={styles.iconStyle} />
              <div style={styles.locationDetails}>
                <div style={styles.locationName}> Kalinga University</div>
                <div style={styles.locationAddress}>Raipur, Chhattisgarh</div>
              </div>
            </div>



            <div style={styles.divider}></div>

            <div style={styles.coordinator}>
              <FaUserTie style={styles.iconStyle} />
              <div style={styles.coordinatorDetails}>
                <div style={styles.coordinatorTitle}>Zonal Coordinator</div>
                <div style={styles.coordinatorName}>Dr. Sunayana Shukla</div>
                <div style={styles.coordinatorInfo}>
                  Assistant Professor and Senior Manager<br />
                  Kalinga University, Raipur
                </div>
                <div style={styles.coordinatorInfo}>📞 +91 79910 56030</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div style={{ textAlign: 'center', margin: '2rem 0', fontFamily: "'Times New Roman', Times, serif", color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>
        For any queries: <a href="mailto:yp@iethlnevents.in" style={{ color: '#22BBE0', textDecoration: 'none', fontWeight: 'bold' }}>yp@iethlnevents.in</a>
      </div>

      {/* Important Note */}
      <div style={{ margin: '3rem auto', maxWidth: '1200px' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: '800px' }}>
            <div className="important-note" style={styles.importantNote}>
              <div style={styles.noteTitle}>Important Note</div>
              <div style={styles.noteContent}>
                Participants must present at their respective zonal center based on their state of residence or study. <br />
                Physical certificates will be issued to all participants from the Zonal Round onwards. <br />
                The competition follows strict academic integrity standards – all presentations must be original work.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PATNzonalCenters;