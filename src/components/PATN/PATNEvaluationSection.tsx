import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import { Presentation, Lightbulb, Target, MessageSquare } from 'lucide-react';

const PATNEvaluationSection = () => {
  useEffect(() => {
    ScrollReveal().reveal('.sr-fade', {
      distance: '50px',
      duration: 1000,
      easing: 'ease-out',
      origin: 'bottom',
      interval: 100,
      reset: false,
    });
  }, []);

  const criteria = [
    {
      icon: <Presentation className="w-6 h-6 text-[#22BBE0]" />,
      title: "Presentation Skills",
      percentage: "35%",
      description: "Clarity, confidence, timing, and engagement with the audience"
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-[#22BBE0]" />,
      title: "Technical Content",
      percentage: "35%",
      description: "Depth of knowledge, research quality, and technical accuracy"
    },
    {
      icon: <Target className="w-6 h-6 text-[#22BBE0]" />,
      title: "Visual Aids",
      percentage: "15%",
      description: "Quality and effectiveness of slides and visual materials"
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-[#22BBE0]" />,
      title: "Q&A Session",
      percentage: "15%",
      description: "Ability to handle questions and provide clear answers"
    }
  ];

  return (
    <section className="py-16 bg-black" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sr-fade">
          <h2 className="text-[2.5rem] font-bold text-white mb-4 [text-shadow:_0_1px_10px_rgb(34_187_224_/_20%)]" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
            Evaluation Criteria
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {criteria.map((criterion, index) => (
            <div
              key={index}
              className="sr-fade relative overflow-hidden rounded-lg border border-[#22BBE0]/20 bg-black/40 p-6 
              shadow-[0_4px_20px_-2px_rgba(34,187,224,0.25),0_0_8px_0_rgba(34,187,224,0.1)] 
              hover:shadow-[0_8px_30px_-2px_rgba(34,187,224,0.35),0_0_12px_0_rgba(34,187,224,0.2)]
              hover:border-[#22BBE0]/40 group backdrop-blur-sm transition-all duration-500
              before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-b before:from-[#22BBE0]/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity"
              style={{ fontFamily: "'Times New Roman', Times, serif" }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-[#22BBE0]/5 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(34,187,224,0.2)]">
                  {criterion.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 [text-shadow:_0_1px_5px_rgb(34_187_224_/_15%)]" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                  {criterion.title}
                </h3>
                <div className="text-2xl font-bold text-[#22BBE0] mb-3 [text-shadow:_0_1px_8px_rgb(34_187_224_/_20%)]" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                  {criterion.percentage}
                </div>
                <p className="text-gray-300" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                  {criterion.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PATNEvaluationSection;