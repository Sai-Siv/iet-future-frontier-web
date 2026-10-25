import React, { useState } from 'react';
import { 
  Lightbulb, Smartphone, Users, Trophy, Music, 
  Award, Sparkles, CheckCircle2, ArrowRight, ExternalLink, Calendar, MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';

const EventHighlightsSection = () => {
  const [isPosterOpen, setIsPosterOpen] = useState(false);

  const highlights = [
    {
      id: 'innothon',
      title: 'Innothon (Ideathon)',
      category: 'Stage 1 & 2 Challenge',
      desc: 'Solve real-world challenges aligned with UN Sustainable Development Goals (SDGs). Ideate, develop solutions, and pitch to industry judges.',
      icon: Lightbulb,
      badge: 'SDGs Focused',
      href: '/innothon'
    },
    {
      id: 'appastral',
      title: 'Appastral (App Design)',
      category: '24-Hour Challenge',
      desc: 'Design innovative mobile and web application solutions for real-world problems. Starts Day 1 at 2:00 PM, submission closes Day 2 at 2:00 PM.',
      icon: Smartphone,
      badge: '24-Hr Hackathon',
      href: '/appastral'
    },
    {
      id: 'industry-talk',
      title: 'Industry Talk',
      category: 'Expert Keynotes',
      desc: 'Learn directly from industry leaders and emerging tech innovators. Gain real-world insights on sustainable technologies & engineering excellence.',
      icon: Users,
      badge: 'Day 2 Keynote',
      href: '/agenda'
    },
    {
      id: 'awards',
      title: 'Student & Professional Awards',
      category: 'Excellence Recognition',
      desc: 'Recognise outstanding academic performance, innovation, young researchers, leadership, and notable contributions to technology.',
      icon: Trophy,
      badge: 'Nominations Open',
      href: '/awards'
    },
    {
      id: 'cultural',
      title: 'Cultural Performances',
      category: 'Evening Celebration',
      desc: 'Special performances by volunteers and participants including music, dance, drama and cultural showcases on Day 1 evening.',
      icon: Music,
      badge: 'Day 1 Evening',
      href: '/agenda'
    }
  ];

  const benefits = [
    { title: 'Attractive Prizes', desc: 'Cash awards & tech prizes for top winners' },
    { title: 'Winners & Runner-ups', desc: 'Exclusive trophies and podium recognition' },
    { title: 'Certificates', desc: 'Official IET & VIT-AP participation certificates' },
    { title: 'Networking Opportunities', desc: 'Connect with industry mentors & students' },
    { title: 'Industry Recognition', desc: 'Showcase projects to recruiters and startups' },
    { title: 'Memorable Experience', desc: 'Hands-on 2-day immersive tech carnival' }
  ];

  return (
    <section id="events" className="py-16 md:py-24 bg-[#050505] relative overflow-hidden border-t border-white/5">
      {/* Background single purple glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#A046B4]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#A046B4]/10 border border-[#A046B4]/25 text-xs font-semibold text-purple-200 mb-3 tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-[#C084FC]" />
            <span>IET 360° Flagship Tracks</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Event Highlights &amp; Competitions
          </h2>
          <p className="text-white/70 text-base md:text-lg leading-relaxed">
            A two-day multi-dimensional confluence of ideathons, app design, expert sessions, awards, and networking at VIT-AP University.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group relative rounded-2xl p-6 bg-black/60 backdrop-blur-xl border border-[#A046B4]/20 hover:border-[#A046B4]/60 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-[0_4px_25px_rgba(160,70,180,0.15)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-[#A046B4]/30 bg-[#A046B4]/15 shadow-lg">
                      <Icon className="w-6 h-6 text-[#C084FC]" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#A046B4]/15 text-purple-200 border border-[#A046B4]/30">
                      {item.badge}
                    </span>
                  </div>

                  <span className="text-xs font-bold uppercase tracking-wider text-white/50 block mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <Link
                  to={item.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#C084FC] hover:text-white transition-all group-hover:gap-3"
                >
                  <span>Explore Track</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}

          {/* Official Poster Card */}
          <div 
            onClick={() => setIsPosterOpen(true)}
            className="group relative rounded-2xl p-6 bg-gradient-to-br from-black/80 to-[#120818] backdrop-blur-xl border border-[#A046B4]/30 hover:border-[#A046B4]/80 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 cursor-pointer shadow-[0_4px_30px_rgba(160,70,180,0.2)]"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#A046B4]/20 flex items-center justify-center border border-[#A046B4]/40">
                  <ExternalLink className="w-6 h-6 text-[#C084FC]" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#A046B4]/20 text-purple-200 border border-[#A046B4]/40">
                  Official Poster
                </span>
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-white/50 block mb-1">
                4 &amp; 5 December 2026
              </span>
              <h3 className="text-xl font-bold text-white mb-2">
                IET 360° Official Brochure
              </h3>
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                Click to view the full resolution official event poster containing complete schedule, prizes, and venue details.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#C084FC] group-hover:text-white group-hover:gap-3 transition-all">
              <span>View Full Poster</span>
              <ExternalLink className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Perks & Benefits Section */}
        <div className="rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-white/[0.04] to-black/80 border border-white/10 backdrop-blur-xl">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              Why Participate in IET 360°?
            </h3>
            <p className="text-white/60 text-sm">
              Open for Students, Faculty, Industry Professionals, Researchers, Innovators &amp; Volunteers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {benefits.map((b, idx) => (
              <div 
                key={idx}
                className="flex items-start gap-3.5 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#A046B4]/30 transition-colors"
              >
                <CheckCircle2 className="w-5 h-5 text-[#C084FC] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-bold text-sm">{b.title}</h4>
                  <p className="text-white/60 text-xs mt-0.5 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-white/80 text-xs sm:text-sm">
              <MapPin className="w-4 h-4 text-[#C084FC]" />
              <span>Venue: <strong>VIT-AP University</strong>, Amaravati, Andhra Pradesh</span>
            </div>
            <Link
              to="/agenda"
              className="px-5 py-2.5 rounded-xl bg-[#A046B4]/20 hover:bg-[#A046B4]/30 text-white font-bold text-xs sm:text-sm border border-[#A046B4]/40 transition-all inline-flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#C084FC]" />
              <span>Explore Detailed Schedule</span>
            </Link>
          </div>
        </div>

      </div>

      {/* Poster Lightbox Modal */}
      {isPosterOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in"
          onClick={() => setIsPosterOpen(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center justify-center">
            <button
              onClick={() => setIsPosterOpen(false)}
              className="absolute -top-12 right-0 text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              Close &times;
            </button>
            <img 
              src="/iet360_poster.jpg" 
              alt="IET 360 Official Poster" 
              className="max-h-[85vh] w-auto object-contain rounded-xl shadow-2xl border border-white/20"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default EventHighlightsSection;
