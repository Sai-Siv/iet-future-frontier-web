
import React, { useEffect } from 'react';
import Preloader from '../components/Preloader';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import GallerySection from '../components/GallerySection';
import Footer from '../components/Footer';
import FloatingHelpButton from '../components/FloatingHelpButton';

const Index = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-section-visible');
          observer.unobserve(entry.target); // Only animate once
        }
      });
    }, observerOptions);

    // Target ALL sections on the page for a sweeping, continuous reveal effect
    const animatedElements = document.querySelectorAll('section');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Preloader />
      <Navigation />
      <HeroSection />
      <GallerySection />
      <Footer />
      <FloatingHelpButton />

      {/* Global Animation Styles matching PATN behavior but with Scroll triggering */}
      <style>{`
        section {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        section.animate-section-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* The Hero section should animate immediately, bypassing scroll observer delay */
        section#home {
          animation: heroFadeInUp 1s ease-out forwards;
        }

        @keyframes heroFadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Index;
