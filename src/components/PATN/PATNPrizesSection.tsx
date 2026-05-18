import React, { useEffect } from 'react';
import { Trophy, Award } from 'lucide-react';
import ScrollReveal from 'scrollreveal';

const PATNPrizesSection = () => {
  useEffect(() => {
    ScrollReveal().reveal('.prize-card', {
      duration: 1000,
      distance: '50px',
      origin: 'bottom',
      easing: 'ease-in-out',
      interval: 200,
    });
  }, []);

  const prizes = [
    {
      icon: <Trophy className="w-8 h-8 text-[#22BBE0]" />,
      title: "First Prize",
      amount: "₹10,000",
      benefits: ["Certificate of Excellence", "Regional Round Entry", "Mentorship Opportunity"]
    },
    {
      icon: <Award className="w-8 h-8 text-[#22BBE0]" />,
      title: "Second Prize",
      amount: "₹5,000",
      benefits: ["Certificate of Merit", "Regional Round Entry", "Networking Access"]
    }
  ];

  return (
    <section className="py-16 bg-black" style={{ fontFamily: '"Europa", Times, serif' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-white mb-4 font-bold [font-size:2.5rem] [text-shadow:_0_1px_10px_rgb(34_187_224_/_20%)]">
            Prizes & Benefits
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {prizes.map((prize, index) => (
            <div
              key={index}
              className="prize-card relative overflow-hidden rounded-lg border border-[#22BBE0]/20 bg-black/40 p-6 
              shadow-[0_4px_20px_-2px_rgba(34,187,224,0.25),0_0_8px_0_rgba(34,187,224,0.1)] 
              hover:shadow-[0_8px_30px_-2px_rgba(34,187,224,0.35),0_0_12px_0_rgba(34,187,224,0.2)]
              hover:border-[#22BBE0]/40 group backdrop-blur-sm transition-all duration-500
              before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-b before:from-[#22BBE0]/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity"
            >
              <div className="relative flex flex-col items-center text-center">
                <div className="p-4 rounded-full bg-[#22BBE0]/5 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(34,187,224,0.2)]">
                  {prize.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 [text-shadow:_0_1px_5px_rgb(34_187_224_/_15%)]">
                  {prize.title}
                </h3>
                <div className="text-3xl font-bold text-[#22BBE0] mb-4 [text-shadow:_0_1px_8px_rgb(34_187_224_/_20%)]">
                  {prize.amount}
                </div>
                <ul className="space-y-2">
                  {prize.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="text-gray-300">
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PATNPrizesSection;
