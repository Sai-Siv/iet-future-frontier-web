import React, { useState, useRef } from 'react';
import Autoplay from "embla-carousel-autoplay";
import ClassNames from "embla-carousel-class-names";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const autoplayPlugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));
  const classNamesPlugin = useRef(ClassNames());
  const baseGalleryItems = [
    {
      image: '/slide1.jpg',
    },
    {
      image: '/slide2.jpg',
    },
    {
      image: '/slide3.jpg',
    },
    {
      image: '/slide4.jpg',
    },
    {
      image: '/slide5.jpg',
    }
  ];

  // Tripling the array ensures Embla has plenty of slides to seamlessly loop forever without rewinding
  const galleryItems = [...baseGalleryItems, ...baseGalleryItems, ...baseGalleryItems];

  return (
    <section className="py-12 bg-black relative overflow-hidden">
      <div className="container mx-auto max-w-screen-lg px-4 sm:px-6 relative z-10">
        <div className="animate-fade-in space-y-6">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white [text-shadow:_0_1px_10px_rgb(255_255_255_/_20%)]">
              Event Gallery
            </h2>
            <div className="h-1 w-40 mx-auto rounded-full bg-background shadow-[0_0_20px_rgba(255,255,255,0.1)]"></div>
          </div>

          <style>{`
            .embla-gallery {
              perspective: 1000px;
            }
            /* DO NOT transform the outer slide, it breaks Embla's loop calculations */
            .embla-gallery .inner-card {
              transition: all 0.7s cubic-bezier(0.2, 0.8, 0.2, 1);
              transform: scale(0.8) translateZ(-100px);
              opacity: 0.3;
              filter: blur(2px);
            }
            /* When the outer slide is snapped, transform its inner card */
            .embla-gallery .is-snapped .inner-card {
              transform: scale(1.1) translateZ(0);
              opacity: 1;
              z-index: 10;
              filter: blur(0px);
            }
          `}</style>

          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            plugins={[
              autoplayPlugin.current,
              classNamesPlugin.current
            ]}
            className="w-full max-w-6xl mx-auto embla-gallery py-10"
            onMouseEnter={() => autoplayPlugin.current.stop()}
            onMouseLeave={() => autoplayPlugin.current.play()}
          >
            <CarouselContent>
              {galleryItems.map((item, index) => {
                return (
                  <CarouselItem key={index} className="basis-[70%] sm:basis-[60%] md:basis-1/2 lg:basis-1/3 flex items-center justify-center">
                    <div className="p-1 md:p-4 w-full">
                      <div
                        className="inner-card w-full rounded-2xl overflow-hidden transition-colors duration-700"
                        onClick={() => setSelectedImage(item.image)}
                      >
                        <img
                          src={item.image}
                          alt="Gallery"
                          className="w-full h-auto object-contain block transition-transform duration-300 hover:scale-[1.03] cursor-pointer"
                        />
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="left-2 md:-left-8 lg:-left-12 bg-black/40 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:text-white text-white w-10 h-10 md:w-12 md:h-12 shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all" />
            <CarouselNext className="right-2 md:-right-8 lg:-right-12 bg-black/40 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:text-white text-white w-10 h-10 md:w-12 md:h-12 shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all" />
          </Carousel>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl w-full flex justify-center items-center">
            {/* Close button */}
            <button 
              className="absolute top-4 right-4 text-white bg-black/50 hover:bg-[#B100FF] rounded-full w-10 h-10 flex items-center justify-center transition-colors z-10"
              onClick={() => setSelectedImage(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
            <img 
              src={selectedImage} 
              alt="Full screen preview" 
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl scale-in-center"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
