import React from 'react';
import { ClipboardList, CheckCircle, AlertCircle, ArrowRight, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PATNRegistrationSection = () => {
  const navigate = useNavigate();

  const requirements = [
    "Must be an IET member under 35 years old",
    "Valid student or professional ID",
    "Abstract of your presentation (200-300 words)",
    "Presentation slides in PDF format",
    "High-quality profile photo"
  ];

  const guidelines = [
    "Presentation duration: 10 minutes",
    "Q&A session: 5 minutes",
    "Topic must be technology-related",
    "Original content only",
    "Professional presentation attire required"
  ];

  return (
    <section id="registration" className="py-16 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 [text-shadow:_0_1px_10px_rgb(59_130_246_/_20%)]">
            Registration Details
          </h2>
          <div className="h-1 w-24 mx-auto bg-[#3B82F6] rounded-full shadow-[0_0_20px_rgba(59,130,246,0.3)]"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="relative overflow-hidden rounded-lg border border-[#3B82F6]/20 bg-black/40 p-6 
            shadow-[0_4px_20px_-2px_rgba(59,130,246,0.25),0_0_8px_0_rgba(59,130,246,0.1)] 
            hover:shadow-[0_8px_30px_-2px_rgba(59,130,246,0.35),0_0_12px_0_rgba(59,130,246,0.2)]
            hover:border-[#3B82F6]/40 group backdrop-blur-sm transition-all duration-500
            before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-b before:from-[#3B82F6]/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity"
          >
            <div className="relative flex items-center gap-3 mb-6">
              <div className="p-3 rounded-full bg-[#3B82F6]/5 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <CheckCircle className="w-6 h-6 text-[#3B82F6]" />
              </div>
              <h3 className="text-xl font-semibold text-white [text-shadow:_0_1px_5px_rgb(59_130_246_/_15%)]">
                Requirements
              </h3>
            </div>
            <ul className="space-y-3">
              {requirements.map((req, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] shadow-[0_0_8px_rgba(59,130,246,0.3)]"></div>
                  {req}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-lg border border-[#3B82F6]/20 bg-black/40 p-6 
            shadow-[0_4px_20px_-2px_rgba(59,130,246,0.25),0_0_8px_0_rgba(59,130,246,0.1)] 
            hover:shadow-[0_8px_30px_-2px_rgba(59,130,246,0.35),0_0_12px_0_rgba(59,130,246,0.2)]
            hover:border-[#3B82F6]/40 group backdrop-blur-sm transition-all duration-500
            before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-b before:from-[#3B82F6]/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity"
          >
            <div className="relative flex items-center gap-3 mb-6">
              <div className="p-3 rounded-full bg-[#3B82F6]/5 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <AlertCircle className="w-6 h-6 text-[#3B82F6]" />
              </div>
              <h3 className="text-xl font-semibold text-white [text-shadow:_0_1px_5px_rgb(59_130_246_/_15%)]">
                Guidelines
              </h3>
            </div>
            <ul className="space-y-3">
              {guidelines.map((guideline, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] shadow-[0_0_8px_rgba(59,130,246,0.3)]"></div>
                  {guideline}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-center">
          <button 
            onClick={() => navigate('/patn/register')}
            className="group relative overflow-hidden inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-md text-base font-semibold 
              bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-white px-10 py-5
              shadow-[0_4px_20px_-4px_rgba(59,130,246,0.5)] 
              hover:shadow-[0_8px_30px_-4px_rgba(59,130,246,0.6),0_0_20px_0_rgba(59,130,246,0.4)]
              transform hover:-translate-y-0.5 active:translate-y-0
              transition-all duration-300 ease-out
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-black
              disabled:pointer-events-none disabled:opacity-50"
          >
            <span className="relative z-10 flex items-center gap-3 transition-transform duration-300 group-hover:scale-[1.02]">
              <div className="relative">
                <UserPlus className="w-6 h-6 transition-transform duration-300 group-hover:rotate-6" />
                <ClipboardList className="w-4 h-4 absolute -top-1 -right-1 text-white/90" />
              </div>
              Register Now
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#60A5FA] to-[#3B82F6] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-[length:10px_10px] bg-repeat opacity-0 group-hover:opacity-10 transition-opacity duration-300
              [background-image:linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)]"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default PATNRegistrationSection;
