import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Crown, Users, GraduationCap, ArrowRight } from 'lucide-react';

type Member = { name: string; role: string };

const executiveCommittee: Member[] = [
  { name: 'Dr. Ch. Nagendra Panini', role: 'Chairperson' },
  { name: 'Dr. V. Valli Kumari', role: 'Vice Chairperson' },
  { name: 'Dr. K. Kalyan Sagar', role: 'Hony. Secretary' },
  { name: 'Dr. Beebi Naseeba', role: 'Joint Secretary' },
  { name: 'Dr. H. C. P. Pavan Kumar', role: 'Treasurer' },
  { name: 'Mrs. G. B. Christina', role: 'Joint Treasurer' },
];

const ypTeam: Member[] = [
  { name: 'Er. Utkarsh Sakalle', role: 'Chair' },
  { name: 'Ch. Siva Teja', role: 'Member' },
  { name: 'T. Teja Rama Lakshmi', role: 'Member' },
  { name: 'V. Harshitha', role: 'Member' },
  { name: 'M. Jashmitha', role: 'Member' },
  { name: 'S. Mounika', role: 'Member' },
];

type Coordinator = { name: string; designation: string };
type EventGroup = { event: string; href: string; accent: string; coordinators: Coordinator[] };

const SCOPE = 'School of Computer Science and Engineering (SCOPE)';

const eventCoordinators: EventGroup[] = [
  {
    event: 'Innothon',
    href: '/innothon',
    accent: '#AAC81E',
    coordinators: [
      { name: 'Dr. Venkatesh B', designation: 'Associate Professor Grade-1' },
      { name: 'Dr. Ravi Kumar Poluru', designation: 'Assistant Professor (Senior Grade 2)' },
    ],
  },
  {
    event: 'AppAstral',
    href: '/appastral',
    accent: '#22BBE0',
    coordinators: [
      { name: 'Dr. Sudheer Devulapalli', designation: 'Assistant Professor (Senior Grade 2)' },
      { name: 'Dr. Karrothu Aravind', designation: 'Assistant Professor (Senior Grade 2)' },
    ],
  },
];

const ACCENT = '#a046b4';

const initials = (name: string) =>
  name
    .replace(/^(Dr|Er|Mrs|Mr|Ms)\.?\s*/i, '')
    .split(/[\s.]+/)
    .filter(Boolean)
    .slice(-2)
    .map((p) => p[0])
    .join('')
    .toUpperCase();

const SectionHeading = ({ icon: Icon, title, subtitle }: { icon: React.ElementType; title: string; subtitle: string }) => (
  <div className="text-center mb-10">
    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 border" style={{ background: 'rgba(160,70,180,0.12)', borderColor: 'rgba(160,70,180,0.35)', color: ACCENT }}>
      <Icon className="w-6 h-6" />
    </div>
    <h2 className="text-3xl md:text-4xl font-black text-white mb-2">{title}</h2>
    <p className="text-gray-400">{subtitle}</p>
    <div className="flex items-center justify-center gap-3 mt-5 opacity-80">
      <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-[#a046b4]" />
      <div className="w-1.5 h-1.5 rounded-full bg-[#a046b4] shadow-[0_0_12px_#a046b4]" />
      <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-[#a046b4]" />
    </div>
  </div>
);

const MemberCard = ({ member, highlight }: { member: Member; highlight?: boolean }) => (
  <div
    className="group relative rounded-2xl border p-6 flex items-center gap-4 transition-all duration-300 hover:-translate-y-1"
    style={{
      background: 'linear-gradient(145deg, rgba(21,21,24,0.9), rgba(13,13,15,0.95))',
      borderColor: highlight ? 'rgba(160,70,180,0.6)' : 'rgba(255,255,255,0.08)',
      boxShadow: highlight ? '0 10px 30px rgba(160,70,180,0.25)' : undefined,
    }}
  >
    <div
      className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg text-white"
      style={{ background: 'linear-gradient(135deg, #a046b4, #22BBE0)' }}
      aria-hidden="true"
    >
      {initials(member.name)}
    </div>
    <div className="min-w-0">
      <h3 className="text-lg font-bold text-white leading-tight">{member.name}</h3>
      <p className="text-sm font-semibold uppercase tracking-wider mt-1" style={{ color: ACCENT }}>
        {member.role}
      </p>
    </div>
  </div>
);

const Committee = () => {
  return (
    <div className="min-h-screen bg-black w-full overflow-clip relative">
      <Navigation />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-1/4 w-96 h-96 bg-[#22BBE0]/10 rounded-full blur-[100px]" />
        <div className="absolute top-[60%] right-1/4 w-96 h-96 bg-[#a046b4]/10 rounded-full blur-[100px]" />
      </div>

      <main className="pt-24 pb-20 relative z-10">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Hero */}
          <div className="text-center mb-20 pt-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-400 mb-4">IET Hyderabad Local Network</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-4">
              <span className="text-white">Our</span> <span style={{ color: ACCENT }}>Committee</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              The people leading the IET Hyderabad LN and coordinating our flagship events.
            </p>
          </div>

          {/* Executive Committee */}
          <section className="mb-24">
            <SectionHeading icon={Crown} title="Executive Committee" subtitle="IET Hyderabad LN" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {executiveCommittee.map((m, i) => (
                <MemberCard key={m.name} member={m} highlight={i === 0} />
              ))}
            </div>
          </section>

          {/* YP Team */}
          <section className="mb-24">
            <SectionHeading icon={Users} title="Young Professionals Team" subtitle="IET Hyderabad LN YP Section" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {ypTeam.map((m, i) => (
                <MemberCard key={m.name} member={m} highlight={i === 0} />
              ))}
            </div>
          </section>

          {/* Event Coordinators */}
          <section>
            <SectionHeading icon={GraduationCap} title="Event Coordinators" subtitle="Faculty Coordinators — VIT-AP University" />
            <div className="grid gap-8 lg:grid-cols-2">
              {eventCoordinators.map((group) => (
                <div
                  key={group.event}
                  className="rounded-2xl border p-6 sm:p-8"
                  style={{ borderColor: `${group.accent}55`, background: 'linear-gradient(145deg, rgba(21,21,24,0.9), rgba(13,13,15,0.95))' }}
                >
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <h3 className="text-2xl font-black text-white">
                      <span style={{ color: group.accent }}>{group.event}</span>
                    </h3>
                    <Link
                      to={group.href}
                      className="inline-flex items-center gap-1 text-sm font-semibold transition-opacity hover:opacity-80"
                      style={{ color: group.accent }}
                    >
                      View event <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {group.coordinators.map((c) => (
                      <div key={c.name} className="flex items-start gap-4 rounded-xl p-4 bg-white/[0.03] border border-white/5">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-bold"
                          style={{ background: `${group.accent}1f`, border: `1px solid ${group.accent}4d`, color: group.accent }}
                          aria-hidden="true"
                        >
                          {initials(c.name)}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-lg font-bold text-white leading-tight">{c.name}</h4>
                          <p className="text-sm text-gray-200 mt-1">{c.designation}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{SCOPE}</p>
                          <p className="text-xs text-gray-500 mt-0.5">VIT-AP University</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Committee;
