import { ArrowRight, Sparkles, Dumbbell, Shield, Trophy, Activity } from 'lucide-react';

interface HeroProps {
  onJoinClick: () => void;
  onViewPlansClick: () => void;
}

export default function Hero({ onJoinClick, onViewPlansClick }: HeroProps) {
  return (
    <section 
      id="home" 
      className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-black"
    >
      {/* Background Image with Dark Linear Overlays */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=80" 
          alt="Atmospheric modern dark warehouse gym barbell lifting arena" 
          className="w-full h-full object-cover object-center opacity-45 scale-105 select-none"
          loading="eager"
        />
        {/* Radical Vignette & Shaders */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-black/80"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-transparent to-neutral-950/60"></div>
        
        {/* Interactive Ambient Decorative Lighting */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-red-600/10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-emerald-500/10 blur-3xl"></div>
      </div>

      {/* Hero Core Content Deck */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 flex flex-col justify-center items-center">
        
        {/* Quality Badging Title */}
        <div className="inline-flex items-center gap-2 bg-neutral-900/85 border border-red-500/30 px-3.5 py-1.5 rounded-full backdrop-blur-md animate-fade-in animate-bounce-slow">
          <Sparkles className="w-4 h-4 text-red-500 animate-pulse" />
          <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest text-red-400">
            Welcome to PowerFit Elite Athletics
          </span>
        </div>

        {/* Master Heading */}
        <div className="space-y-4 max-w-4.5xl mx-auto">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-black text-white tracking-tight uppercase leading-none">
            TRANSFORM YOUR <span className="text-red-500 tracking-normal inline-block relative">BODY,</span>
            <br />
            TRANSFORM YOUR <span className="text-emerald-400 font-extrabold underline decoration-emerald-500/40 underline-offset-8">LIFE</span>
          </h1>
          
          {/* Gym Intro Section */}
          <p className="text-neutral-300 text-sm sm:text-lg md:text-xl max-w-2xl mx-auto font-sans font-light leading-relaxed pt-2">
            No fads. No excuses. Just scientifically-backed programming, elite professional trainers, 
            and a high-octane environment Engineered exclusively for those hungry for real results.
          </p>
        </div>

        {/* CTA Button Deck */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-sm sm:max-w-md pt-4">
          <button
            onClick={onJoinClick}
            id="hero-join-cta"
            className="w-full sm:w-auto bg-red-500 hover:bg-red-400 text-black px-8 py-4 rounded-xl font-display font-bold uppercase tracking-wider text-sm shadow-xl shadow-glow-red transition-all duration-300 hover:scale-[1.03] cursor-pointer flex items-center justify-center gap-2"
          >
            Join PowerFit Now
            <ArrowRight className="w-4 h-4 text-black" strokeWidth={2.5} />
          </button>
          
          <button
            onClick={onViewPlansClick}
            id="hero-view-plans-cta"
            className="w-full sm:w-auto bg-neutral-900 hover:bg-neutral-850 text-white border border-neutral-700 hover:border-emerald-500 px-8 py-4 rounded-xl font-display font-medium uppercase tracking-wider text-sm transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
          >
            Membership Plans
          </button>
        </div>

        {/* Trust Badging Markers / Gym Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 pt-12 md:pt-16 w-full max-w-5xl border-t border-neutral-900">
          
          <div className="bg-neutral-950/50 p-4 rounded-xl border border-neutral-900 backdrop-blur-xs text-center flex flex-col justify-center items-center">
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-5 h-5 text-red-500" />
              <span className="text-2xl md:text-3.5xl font-display font-bold text-white tracking-tight">5,000+</span>
            </div>
            <p className="text-[11px] uppercase tracking-widest text-neutral-400 font-mono">Transformations Done</p>
          </div>

          <div className="bg-neutral-950/50 p-4 rounded-xl border border-neutral-900 backdrop-blur-xs text-center flex flex-col justify-center items-center">
            <div className="flex items-center gap-2 mb-1">
              <Dumbbell className="w-5 h-5 text-emerald-400" />
              <span className="text-2xl md:text-3.5xl font-display font-bold text-white tracking-tight">20+</span>
            </div>
            <p className="text-[11px] uppercase tracking-widest text-neutral-400 font-mono">Elite Performance Coaches</p>
          </div>

          <div className="bg-neutral-950/50 p-4 rounded-xl border border-neutral-900 backdrop-blur-xs text-center flex flex-col justify-center items-center">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-5 h-5 text-red-500" />
              <span className="text-2xl md:text-3.5xl font-display font-bold text-white tracking-tight">50+</span>
            </div>
            <p className="text-[11px] uppercase tracking-widest text-neutral-400 font-mono">Weekly Dynamic Classes</p>
          </div>

          <div className="bg-neutral-950/50 p-4 rounded-xl border border-neutral-900 backdrop-blur-xs text-center flex flex-col justify-center items-center">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-5 h-5 text-emerald-400" />
              <span className="text-2xl md:text-3.5xl font-display font-bold text-white tracking-tight">35,000</span>
            </div>
            <p className="text-[11px] uppercase tracking-widest text-neutral-400 font-mono">SqFt Ultimate Flagship</p>
          </div>

        </div>

      </div>

      {/* Diagonal Bottom Separator for aesthetic flow */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-neutral-950 to-transparent z-10 pointer-events-none" />
    </section>
  );
}
