import { useState } from 'react';
import { Dumbbell, Flame, Award, Calendar, Zap, Check, Sparkles } from 'lucide-react';
import { SERVICES } from '../data';
import { ServiceClass } from '../types';

export default function Services() {
  const [selectedIntensity, setSelectedIntensity] = useState<'All' | 'Medium' | 'High' | 'Extreme'>('All');
  const [selectedService, setSelectedService] = useState<ServiceClass | null>(SERVICES[0]);

  // Filter services by active level
  const filteredServices = SERVICES.filter(s => {
    if (selectedIntensity === 'All') return true;
    return s.intensity === selectedIntensity;
  });

  const renderServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Dumbbell':
        return <Dumbbell className="w-5 h-5 text-emerald-400" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-amber-500" />;
      case 'Award':
        return <Award className="w-5 h-5 text-cyan-400" />;
      case 'Calendar':
        return <Calendar className="w-5 h-5 text-emerald-400" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-red-500" />;
      default:
        return <Dumbbell className="w-5 h-5 text-white" />;
    }
  };

  const getIntensityBadgeColor = (intensity: 'Medium' | 'High' | 'Extreme') => {
    switch (intensity) {
      case 'Medium':
        return 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/20';
      case 'High':
        return 'bg-amber-950/40 text-amber-500 border border-amber-500/25';
      case 'Extreme':
        return 'bg-red-950/45 text-red-400 border border-red-500/30';
    }
  };

  return (
    <section id="services" className="py-24 bg-neutral-900 border-t border-neutral-950 relative overflow-hidden">
      
      {/* Absolute Decorative Grid Graphics */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 uppercase tracking-widest font-mono font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Expert Services
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black text-white tracking-tight uppercase">
            CHOOSE YOUR DISCIPLINE
          </h2>
          <div className="h-1 w-20 bg-emerald-400 mx-auto rounded-full mt-2"></div>
        </div>

        {/* CONTROLS BAR: INTENSITY FILTER */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-neutral-950/70 p-4 rounded-xl border border-neutral-800 gap-4 max-w-4xl mx-auto">
          <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            Intensity Filter
          </span>
          <div className="flex flex-wrap justify-center gap-1.5">
            {(['All', 'Medium', 'High', 'Extreme'] as const).map((level) => (
              <button
                key={level}
                onClick={() => setSelectedIntensity(level)}
                className={`px-3 py-1.5 text-xs font-mono font-bold uppercase rounded-md tracking-wider transition-all duration-200 cursor-pointer ${
                  selectedIntensity === level
                    ? 'bg-emerald-500 text-black shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                {level} {level !== 'All' ? 'Output' : ''}
              </button>
            ))}
          </div>
        </div>

        {/* WORKOUT DISCIPLINES DISPLAY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* List of services */}
          <div className="col-span-1 lg:col-span-5 space-y-4">
            {filteredServices.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedService(service)}
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center gap-4 cursor-pointer relative overflow-hidden group ${
                  selectedService?.id === service.id
                    ? 'bg-neutral-950 border-red-500 shadow-glow-red'
                    : 'bg-neutral-950/30 border-neutral-850 hover:bg-neutral-950/60 hover:border-neutral-700'
                }`}
              >
                {/* Active glow band */}
                {selectedService?.id === service.id && (
                  <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-red-500"></div>
                )}
                
                {/* Custom icon */}
                <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800 group-hover:scale-105 transition-transform duration-300">
                  {renderServiceIcon(service.icon)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-display font-black text-white uppercase truncate">
                      {service.title}
                    </h3>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-mono tracking-widest font-black ${getIntensityBadgeColor(service.intensity)}`}>
                      {service.intensity}
                    </span>
                  </div>
                  <p className="text-neutral-500 text-xs truncate">
                    {service.tagline}
                  </p>
                </div>
              </button>
            ))}

            {filteredServices.length === 0 && (
              <p className="text-center text-neutral-500 text-xs py-7 font-mono">
                No services match the designated intensity level. Change standard query above.
              </p>
            )}
          </div>

          {/* Core Expanded Panel of Active Choice */}
          <div className="col-span-1 lg:col-span-7">
            {selectedService ? (
              <div id="service-expanded-deck" className="bg-neutral-950 border border-neutral-850 rounded-2xl overflow-hidden shadow-2xl flex flex-col items-stretch">
                
                {/* Big Image Section */}
                <div className="h-64 sm:h-80 relative">
                  <img 
                    src={selectedService.image} 
                    alt={selectedService.title} 
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent"></div>
                  
                  {/* Dynamic absolute badges on photo */}
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between flex-wrap gap-2">
                    <div>
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded mb-1.5 inline-block ${getIntensityBadgeColor(selectedService.intensity)}`}>
                        {selectedService.intensity} Metabolic Load
                      </span>
                      <h4 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight leading-none">
                        {selectedService.title}
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Text Analysis Segment */}
                <div className="p-6 sm:p-8 space-y-6 text-left">
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-red-500 tracking-wider font-mono block">
                      — {selectedService.tagline}
                    </span>
                    <p className="text-neutral-300 text-sm leading-relaxed">
                      {selectedService.description}
                    </p>
                  </div>

                  {/* Programmatic Key Benefits with Tickmarks */}
                  <div className="border-t border-neutral-900 pt-5 space-y-4">
                    <span className="text-xs font-bold text-white uppercase tracking-wider font-display block">
                      Program Highlights & Perks
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {selectedService.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex gap-2.5 items-start bg-neutral-900/40 p-3 rounded-lg border border-neutral-900">
                          <Check className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-xs text-neutral-300 leading-tight">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            ) : (
              <div className="bg-neutral-950 border border-neutral-850 rounded-2xl p-10 text-center text-neutral-500 font-mono">
                Select a discipline from the index on the left to pull diagnostics data.
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
