
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2025-08-09T23:59:59').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    const timer = setInterval(updateCountdown, 1000);
    updateCountdown();

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days, color: 'from-blue-500 to-blue-600' },
    { label: 'Hours', value: timeLeft.hours, color: 'from-purple-500 to-purple-600' },
    { label: 'Minutes', value: timeLeft.minutes, color: 'from-pink-500 to-pink-600' },
    { label: 'Seconds', value: timeLeft.seconds, color: 'from-red-500 to-red-600' }
  ];

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="w-6 h-6 text-white/80" />
        <span className="text-white/80 font-medium">Time Remaining</span>
      </div>
      
      <div className="flex items-center justify-center gap-6 flex-wrap">
        {timeUnits.map((unit, index) => (
          <div key={unit.label} className="text-center">
            <div className={`relative p-6 bg-gradient-to-br ${unit.color} rounded-2xl min-w-[100px] shadow-glow border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105`}>
              <div className="absolute inset-0 bg-white/10 rounded-2xl"></div>
              <div className="relative z-10">
                <div className="text-4xl font-black text-white mb-2">
                  {unit.value.toString().padStart(2, '0')}
                </div>
                <div className="text-sm font-semibold text-white/90 uppercase tracking-wider">
                  {unit.label}
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-2 right-2 w-2 h-2 bg-white/30 rounded-full"></div>
              <div className="absolute bottom-2 left-2 w-1 h-1 bg-white/20 rounded-full"></div>
            </div>
            
            {index < timeUnits.length - 1 && (
              <div className="hidden sm:block absolute top-1/2 right-[-1.5rem] transform -translate-y-1/2 text-2xl font-bold text-white/60">
                :
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
