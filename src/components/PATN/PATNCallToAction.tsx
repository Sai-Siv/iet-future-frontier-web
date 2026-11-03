import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';

const PATNCallToAction: React.FC = () => {
  useEffect(() => {
    ScrollReveal().reveal('.patn-container', {
      origin: 'bottom',
      distance: '50px',
      duration: 1000,
      delay: 200,
      easing: 'ease-in-out',
      reset: false,
    });
  }, []);

  return (
    <>
      <style>
        {`
          .patn-container {
            text-align: center;
            padding: 2rem;
            margin: 2rem auto;
            max-width: 1200px;
            color: white;
            font-family: "Times New Roman", Times, serif;
          }

          .patn-title {
            font-weight: 700;
            font-size: 2.5rem;
            color: #f0f0f0;
            margin-bottom: 1rem;
          }

          .patn-lead {
            font-size: 1.25rem;
            color: #dcdcdc;
            line-height: 1.6;
            margin-bottom: 2rem;
          }

          .patn-btn-register {
            background: linear-gradient(to right, #ffffff, #22BBE0);
            color: black;
            font-size: 1.125rem;
            font-weight: 800;
            padding: 0.75rem 2rem;
            border-radius: 0.5rem;
            display: inline-block;
            margin-bottom: 1rem;
            box-shadow: 0 10px 25px rgba(34, 187, 224, 0.4);
            border: none;
            cursor: pointer;
            text-decoration: none;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .patn-btn-register:hover {
            transform: scale(1.05);
            box-shadow: 0 15px 35px rgba(34, 187, 224, 0.6);
          }
        `}
      </style>

      <div className="patn-container">
        <h1 className="patn-title">PATN 2026 Registration Has Closed</h1>
        <p className="patn-lead">
          The registration deadline was July 21, 2026. New registrations are no longer being accepted.
        </p>
        <button className="patn-btn-register" disabled style={{ opacity: 0.6, cursor: 'not-allowed' }}>
            Registration Closed
          </button>
        
      </div>
    </>
  );
};

export default PATNCallToAction;
