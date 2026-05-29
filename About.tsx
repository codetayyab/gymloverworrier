import { useState } from 'react';
import { Dumbbell, HeartPulse, Grid, GlassWater, Trophy, Target, Sparkles, Check, Instagram, Twitter, Facebook, ChevronDown, ChevronUp } from 'lucide-react';
import { TRAINERS, FACILITIES } from '../data';
import { Trainer } from '../types';

export default function About() {
  const [expandedTrainerId, setExpandedTrainerId] = useState<string | null>(null);

  const toggleTrainerBio = (id: string) => {
    if (expandedTrainerId === id) {
      setExpandedTrainerId(null);
    } else {
      setExpandedTrainerId(id);
    }
  };

  // Helper to render correct facility icon
  const renderFacilityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Dumbbell':
        return <Dumbbell className="w-6 h-6 text-red-500" />;
      case 'HeartPulse':
        return <HeartPulse className="w-6 h-6 text-red-500" />;
      case 'Grid':
        return <Grid className="w-6 h-6 text-red-500" />;
      case 'GlassWater':
        return <GlassWater className="w-6 h-6 text-red-500" />;
      default:
        return <Dumbbell className="w-6 h-6 text-red-500" />;
    }
  };

  return (
    <section id="about" className="py-24 bg-neutral-950 border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs text-red-500 uppercase tracking-widest font-mono font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> About PowerFit Gym
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black text-white tracking-tight uppercase">
            WHO WE ARE & OUR AMBITION
          </h2>
          <div className="h-1 w-20 bg-red-500 mx-auto rounded-full mt-2"></div>
        </div>

        {/* MISSION & VISION BENTO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Mission Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-neutral-900 to-neutral-850 p-8 rounded-2xl border border-neutral-850 relative overflow-hidden flex flex-col justify-between group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl -mr-6 -mt-6"></div>
            
            <div className="space-y-6">
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl w-fit">
                <Target className="w-7 h-7 text-red-500" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-display font-bold text-white uppercase tracking-tight">Our Mission</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  To democratize hyper-performance athletic programming. We provide an uncompromising state-of-the-art training stadium where elite coaches, structured science, and continuous feedback enable athletes of all experience levels to safely blast through their genetic limitations.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-neutral-800 flex items-center gap-3 text-xs font-mono text-neutral-400">
              <Check className="w-4 h-4 text-emerald-500" /> Continuous Accountability Model
            </div>
          </div>

          {/* Core Banner Visual / Vision */}
          <div className="lg:col-span-7 bg-gradient-to-br from-neutral-900 to-neutral-850 rounded-2xl border border-neutral-850 overflow-hidden grid grid-cols-1 md:grid-cols-12">
            
            {/* Collage image left side */}
            <div className="md:col-span-5 min-h-[220px] relative">
              <img 
                src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=600&q=80" 
                alt="Strength rack with kettlebells and heavy weights" 
                className="absolute inset-0 w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-neutral-950/20"></div>
            </div>

            {/* Vision Text right side */}
            <div className="md:col-span-7 p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/25 rounded-xl w-fit">
                  <Trophy className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white uppercase tracking-tight">Our Vision</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  We envision a robust, non-judgmental community where active longevity and raw strength form the lifestyle nucleus. PowerFit is more than heavy steel; we are the catalyst for complete biological alignment and resilient confidence across generations.
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-neutral-850 flex gap-4 text-xs text-neutral-400">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Pure Steel
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Structured Nutrition
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> High Recovery
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* REVOLUTIONARY FACILITIES SECTOR */}
        <div className="space-y-10 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div className="space-y-2 text-left">
              <span className="text-xs text-emerald-400 font-mono uppercase tracking-widest font-bold block">
                FLAGSHIP CODES
              </span>
              <h3 className="text-2xl md:text-3.5xl font-display font-bold text-white tracking-tight uppercase">
                WORLD-CLASS FACILITIES
              </h3>
            </div>
            <p className="text-neutral-400 text-sm max-w-md font-sans leading-relaxed">
              Every detail of our 35,000 square foot facility has been strategically compiled to support maximal recovery, absolute muscle load, and focus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FACILITIES.map((fac) => (
              <div 
                key={fac.id} 
                className="bg-neutral-900 p-6 rounded-2xl border border-neutral-850 hover:border-red-500/30 transition-all duration-300 relative group text-left"
              >
                <div className="p-3 bg-neutral-950 rounded-xl w-fit border border-neutral-800 mb-5 group-hover:scale-110 transition-transform duration-300">
                  {renderFacilityIcon(fac.icon)}
                </div>
                <h4 className="text-lg font-display font-bold text-white uppercase mb-2">
                  {fac.title}
                </h4>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                  {fac.description}
                </p>
                <div className="absolute bottom-0 left-6 right-6 h-[2px] bg-gradient-to-r from-red-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
            ))}
          </div>
        </div>

        {/* WORLD-CLASS COACHES SECTION */}
        <div className="space-y-12 pt-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs text-red-500 font-mono uppercase tracking-widest font-bold">
              ELITE STAFF
            </span>
            <h3 className="text-2xl md:text-4xl font-display font-bold text-white tracking-tight uppercase">
              MEET OUR PERFORMANCE COACHES
            </h3>
            <p className="text-neutral-450 text-sm">
              We do not employ general floor monitors. Our leaders are industry-certified biomechanical athletes driven to coach you to glory.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRAINERS.map((trainer) => {
              const isExpanded = expandedTrainerId === trainer.id;
              return (
                <div 
                  key={trainer.id}
                  className="bg-neutral-900 border border-neutral-850 rounded-2xl overflow-hidden hover:border-red-500/40 transition-all duration-300 flex flex-col group relative"
                >
                  {/* Photo container with Specialties overlay */}
                  <div className="relative aspect-square sm:aspect-[4/5] overflow-hidden">
                    <img 
                      src={trainer.image} 
                      alt={trainer.name} 
                      className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent"></div>
                    
                    {/* Role Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 text-left">
                      <span className="text-[10px] font-mono font-bold bg-red-600 text-black px-2.0 py-1 rounded tracking-wide uppercase">
                        {trainer.role}
                      </span>
                      <h4 className="text-lg font-display font-bold text-white tracking-tight uppercase mt-1.5">
                        {trainer.name}
                      </h4>
                    </div>
                  </div>

                  {/* Expand-and-Details sector */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1">
                        {trainer.specialties.map((spec, i) => (
                          <span 
                            key={i} 
                            className="text-[9px] uppercase font-mono tracking-wider bg-neutral-950 text-neutral-400 border border-neutral-800 px-1.5 py-0.5 rounded"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>

                      {/* Bio with Toggle click option */}
                      <div>
                        <p className={`text-neutral-450 text-xs text-left leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                          {trainer.bio}
                        </p>
                        
                        <button
                          onClick={() => toggleTrainerBio(trainer.id)}
                          className="text-[10px] text-red-500 hover:text-red-400 font-bold uppercase tracking-wider flex items-center gap-0.5 mt-1.5 cursor-pointer"
                        >
                          {isExpanded ? (
                            <>Show Less <ChevronUp className="w-3.5 h-3.5" /></>
                          ) : (
                            <>Read Full Bio <ChevronDown className="w-3.5 h-3.5" /></>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Social networks & links */}
                    <div className="flex items-center justify-between pt-4 border-t border-neutral-950">
                      <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Connect</span>
                      <div className="flex gap-2">
                        {trainer.socials.instagram && (
                          <a 
                            href={`https://instagram.com`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="p-1.5 bg-neutral-950 hover:bg-red-500 rounded text-neutral-400 hover:text-black transition-colors"
                            aria-label={`${trainer.name} Instagram`}
                          >
                            <Instagram className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {trainer.socials.twitter && (
                          <a 
                            href={`https://twitter.com`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="p-1.5 bg-neutral-950 hover:bg-red-500 rounded text-neutral-400 hover:text-black transition-colors"
                            aria-label={`${trainer.name} Twitter`}
                          >
                            <Twitter className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {trainer.socials.facebook && (
                          <a 
                            value="facebook_target"
                            href={`https://facebook.com`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="p-1.5 bg-neutral-950 hover:bg-red-500 rounded text-neutral-400 hover:text-black transition-colors"
                            aria-label={`${trainer.name} Facebook`}
                          >
                            <Facebook className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
