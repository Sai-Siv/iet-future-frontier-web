import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { 
  Calendar, Clock, MapPin, Sparkles, Award, 
  Lightbulb, Smartphone, Users, Coffee, Utensils, Music, Trophy, CheckCircle2, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Agenda = () => {
  const [activeDay, setActiveDay] = useState<1 | 2>(1);

  const day1Schedule = [
    {
      time: '2:00 PM - 2:30 PM',
      title: 'Registration and Welcome',
      desc: 'Check-in, badge collection, team registration confirmation, and event kit distribution.',
      category: 'General',
      icon: CheckCircle2
    },
    {
      time: '2:00 PM - 4:00 PM',
      title: 'Innothon (Ideathon) – Stage 1',
      desc: 'Problem statement briefing, ideation, brainstorming, mentor interaction, and initial team discussions.',
      category: 'Innothon',
      icon: Lightbulb,
      highlight: true
    },
    {
      time: '4:00 PM - 4:30 PM',
      title: 'Appastral – Kick-off',
      desc: 'Competition launch and design guidelines. The 24-hour app design sprint begins (continues until Day 2, 2:00 PM).',
      category: 'Appastral',
      icon: Smartphone,
      highlight: true
    },
    {
      time: '4:30 PM - 6:00 PM',
      title: 'Team Preparation & Prototyping',
      desc: 'Further team collaboration time for both Innothon ideators and Appastral app developers.',
      category: 'Work Session',
      icon: Users
    },
    {
      time: '6:00 PM - 7:00 PM',
      title: 'Cultural Evening & Networking',
      desc: 'Vibrant cultural performances by volunteers and participants including music, dance, drama and community bonding.',
      category: 'Cultural',
      icon: Music,
      highlight: true
    }
  ];

  const day2Schedule = [
    {
      time: '9:00 AM - 9:15 AM',
      title: 'Registration and Welcome',
      desc: 'Morning check-in for Day 2 attendees, guest speakers, and faculty.',
      category: 'General',
      icon: CheckCircle2
    },
    {
      time: '9:15 AM - 9:30 AM',
      title: 'Inaugural Session & Event Overview',
      desc: 'Opening remarks by IET Hyderabad Leadership and VIT-AP University dignitaries.',
      category: 'Ceremony',
      icon: Sparkles
    },
    {
      time: '9:30 AM - 10:30 AM',
      title: 'Industry Talk: Emerging Technologies & Sustainable Solutions',
      desc: 'Keynote address by industry veterans on future technologies, AI, IoT, and sustainable engineering applications.',
      category: 'Keynote',
      icon: Users,
      highlight: true
    },
    {
      time: '10:30 AM - 11:00 AM',
      title: 'Tea & Networking Break',
      desc: 'Refreshments and peer networking with researchers, delegates, and industry guests.',
      category: 'Break',
      icon: Coffee
    },
    {
      time: '11:00 AM - 1:00 PM',
      title: 'Innothon (Ideathon) – Stage 2',
      desc: 'Solution development, pitch preparation, prototype refining, and final presentation readiness.',
      category: 'Innothon',
      icon: Lightbulb,
      highlight: true
    },
    {
      time: '1:30 PM - 2:30 PM',
      title: 'Lunch Break',
      desc: 'Lunch hosted at VIT-AP University dining hall for registered participants.',
      category: 'Break',
      icon: Utensils
    },
    {
      time: '2:00 PM SHARP',
      title: 'Appastral – Submission Deadline',
      desc: '24-hour challenge portal closes. All design wireframes, code repos, and pitch decks must be submitted.',
      category: 'Deadline',
      icon: Smartphone,
      badge: 'STRICT DEADLINE'
    },
    {
      time: '2:30 PM - 3:30 PM',
      title: 'Final Judging & Evaluation',
      desc: 'Jury evaluation and team defense for both Innothon Stage 2 and Appastral submissions.',
      category: 'Evaluation',
      icon: Trophy
    },
    {
      time: '3:00 PM - 3:30 PM',
      title: 'Awards Ceremony',
      desc: 'Grand celebration: Innothon winners, Appastral winners, and prestigious Student & Professional Awards presentation.',
      category: 'Awards',
      icon: Award,
      highlight: true
    },
    {
      time: '3:30 PM - 4:00 PM',
      title: 'Valedictory Address & Vote of Thanks',
      desc: 'Closing address by organizers, certificate presentation, group photographs, and formal conclusion.',
      category: 'Closing',
      icon: Sparkles
    }
  ];

  const currentSchedule = activeDay === 1 ? day1Schedule : day2Schedule;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navigation />

      <main className="flex-grow pt-24 pb-16 relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#A046B4]/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto max-w-5xl px-4 sm:px-6 relative z-10">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#A046B4]/10 border border-[#A046B4]/25 text-xs font-semibold text-purple-200 mb-3">
              <Calendar className="w-4 h-4 text-[#C084FC]" />
              <span>Official Event Program</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-3">
              IET 360° <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D8B4FE] to-[#A046B4]">Schedule</span>
            </h1>
            <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto">
              A Two-Day Event on Innovation, Sustainability, Industry Interaction, and Engineering Excellence.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs sm:text-sm text-white/80">
              <span className="flex items-center gap-1.5 font-semibold text-white">
                <Calendar className="w-4 h-4 text-[#C084FC]" /> 4 &amp; 5 December 2026
              </span>
              <span className="text-white/30 hidden sm:inline">&bull;</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#C084FC]" /> VIT-AP University, Amaravati
              </span>
            </div>
          </div>

          {/* Day Switcher Tabs */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-12">
            <button
              onClick={() => setActiveDay(1)}
              className={`flex-1 sm:flex-initial sm:min-w-[240px] px-6 py-4 rounded-2xl border font-bold text-left sm:text-center transition-all duration-300 ${
                activeDay === 1
                  ? 'bg-[#A046B4]/20 border-[#A046B4] text-white shadow-[0_0_25px_rgba(160,70,180,0.3)]'
                  : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="text-xs uppercase tracking-wider text-[#C084FC] font-extrabold mb-1">
                Day 1 &bull; 2:00 PM Onwards
              </div>
              <div className="text-base sm:text-lg font-black text-white">
                Friday, 4 December 2026
              </div>
              <div className="text-xs text-white/60 mt-1">
                Innothon Stage 1, Appastral Kick-off &amp; Cultural Evening
              </div>
            </button>

            <button
              onClick={() => setActiveDay(2)}
              className={`flex-1 sm:flex-initial sm:min-w-[240px] px-6 py-4 rounded-2xl border font-bold text-left sm:text-center transition-all duration-300 ${
                activeDay === 2
                  ? 'bg-[#A046B4]/20 border-[#A046B4] text-white shadow-[0_0_25px_rgba(160,70,180,0.3)]'
                  : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="text-xs uppercase tracking-wider text-[#C084FC] font-extrabold mb-1">
                Day 2 &bull; 9:00 AM – 4:00 PM
              </div>
              <div className="text-base sm:text-lg font-black text-white">
                Saturday, 5 December 2026
              </div>
              <div className="text-xs text-white/60 mt-1">
                Industry Talk, Appastral Finals &amp; Grand Awards
              </div>
            </button>
          </div>

          {/* Timeline List */}
          <div className="space-y-4">
            {currentSchedule.map((slot, index) => {
              const Icon = slot.icon;
              return (
                <div
                  key={index}
                  className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 backdrop-blur-xl ${
                    slot.highlight 
                      ? 'bg-gradient-to-r from-[#A046B4]/10 to-black/80 border-[#A046B4]/30 shadow-[0_4px_20px_rgba(160,70,180,0.15)]' 
                      : 'bg-black/50 border-white/10 hover:border-[#A046B4]/30'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-[#A046B4]/30 bg-[#A046B4]/15">
                        <Icon className="w-5 h-5 text-[#C084FC]" />
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block mb-1 bg-[#A046B4]/15 text-purple-200 border border-[#A046B4]/25">
                          {slot.category}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-white">
                          {slot.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-purple-200 bg-[#A046B4]/15 px-3 py-1.5 rounded-lg border border-[#A046B4]/25 shrink-0 self-start sm:self-center">
                      <Clock className="w-3.5 h-3.5 text-[#C084FC]" />
                      <span>{slot.time}</span>
                    </div>
                  </div>

                  <p className="text-sm text-white/70 pl-0 sm:pl-13 mt-2 leading-relaxed">
                    {slot.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Special Appastral 24-Hour Notice Banner */}
          <div className="mt-10 p-6 rounded-2xl bg-[#A046B4]/10 border border-[#A046B4]/30 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-purple-200 font-bold text-sm mb-1">
                <Smartphone className="w-4 h-4 text-[#C084FC]" />
                <span>Appastral: App Design Competition (24-Hour Challenge)</span>
              </div>
              <p className="text-xs sm:text-sm text-white/80">
                Starts <strong>4 Dec, 2:00 PM</strong> &rarr; Submission Deadline <strong>5 Dec, 2:00 PM</strong> at VIT-AP University.
              </p>
            </div>
            <Link
              to="/appastral"
              className="px-5 py-2.5 bg-[#A046B4] hover:bg-[#8E38A1] text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all shrink-0 inline-flex items-center gap-2 shadow-[0_0_20px_rgba(160,70,180,0.3)]"
            >
              <span>Appastral Guidelines</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Agenda;
