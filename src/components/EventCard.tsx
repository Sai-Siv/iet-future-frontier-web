import React from 'react';
import { Star, Users, Trophy, CreditCard, Tag } from 'lucide-react';

interface EventCardProps {
  name: string;
  description: string;
  teamSize: string;
  prize: string;
  fee: string;
  status: 'open' | 'coming-soon';
  category: string;
}

const EventCard: React.FC<EventCardProps> = ({
  name,
  description,
  teamSize,
  prize,
  fee,
  status,
  category
}) => {
  return (
    <div className="card-dark rounded-lg p-4 h-full transform hover:scale-[1.02] transition-all duration-300">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-bold text-white [text-shadow:_0_1px_10px_rgb(255_255_255_/_20%)] leading-tight">{name}</h3>
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
          status === 'open' 
            ? 'bg-[#6E00FF]/20 text-[#B100FF] border border-[#B100FF]/30' 
            : 'bg-white/5 text-white/50 border border-white/10'
        }`}>
          {status === 'open' ? '🟢 Open' : '⏳ Coming Soon'}
        </span>
      </div>
      
      <p className="text-white/70 mb-4 text-sm leading-relaxed">
        {description}
      </p>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between p-2.5 glassmorphism rounded-lg">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-white" />
            <span className="text-xs font-medium text-white/70">Team Size:</span>
          </div>
          <span className="text-xs font-bold text-white">{teamSize}</span>
        </div>
        
        <div className="flex items-center justify-between p-2.5 glassmorphism rounded-lg">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-white" />
            <span className="text-xs font-medium text-white/70">Prize:</span>
          </div>
          <span className="text-xs font-bold text-white">{prize}</span>
        </div>
        
        <div className="flex items-center justify-between p-2.5 glassmorphism rounded-lg">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-white" />
            <span className="text-xs font-medium text-white/70">Fee:</span>
          </div>
          <span className="text-xs font-bold text-white">{fee}</span>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 glassmorphism rounded-lg border border-[#B100FF]/30">
          <Tag className="w-3 h-3 text-white" />
          <span className="text-xs font-semibold text-white">{category}</span>
        </div>
      </div>
      
      {status === 'open' && (
        <button className="w-full bg-background text-foreground py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          <span className="flex items-center justify-center gap-2">
            <Star className="w-4 h-4" />
            Register Now
          </span>
        </button>
      )}
    </div>
  );
};

export default EventCard;
