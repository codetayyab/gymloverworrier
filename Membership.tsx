import { useState } from 'react';
import { Check, Flame, Trophy, Sparkles, Smile, HelpCircle } from 'lucide-react';
import { MEMBERSHIPS } from '../data';
import { MembershipPlan } from '../types';

interface MembershipProps {
  onPlanSelect: (plan: MembershipPlan) => void;
}

export default function Membership({ onPlanSelect }: MembershipProps) {
  const [isAnnual, setIsAnnual] = useState(false);

  // Computes discount rate
  const getDisplayPlanPrice = (basePrice: number) => {
    if (isAnnual) {
      // 20% discount on monthly basis
      return Math.round(basePrice * 0.8);
    }
    return basePrice;
  };

  const getAccentClass = (accent: 'green' | 'red' | 'lime') => {
    switch (accent) {
      case 'green':
        return {
          badge: 'bg-emerald-950 text-emerald-400 border border-emerald-500/20',
          button: 'bg-neutral-850 hover:bg-neutral-800 text-white border border-neutral-700 hover:border-emerald-500',
          glow: 'group-hover:border-emerald-500/30'
        };
      case 'lime':
        return {
          badge: 'bg-emerald-500 text-black font-extrabold',
          button: 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-glow-lime',
          glow: 'border-emerald-400/40 shadow-glow-lime'
        };
      case 'red':
        return {
          badge: 'bg-red-950 text-red-400 border border-red-500/20',
          button: 'bg-red-500 hover:bg-red-400 text-black shadow-glow-red',
          glow: 'group-hover:border-red-500/30'
        };
    }
  };

  return (
    <section id="membership" className="py-24 bg-neutral-950 border-t border-neutral-900 relative">
      
      {/* Decorative Blur Spheres */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs text-red-500 uppercase tracking-widest font-mono font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Transparent Pricing
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black text-white tracking-tight uppercase">
            CHOOSE YOUR PASS TO POWER
          </h2>
          <div className="h-1 w-20 bg-red-500 mx-auto rounded-full mt-2"></div>
          <p className="text-neutral-400 text-sm max-w-lg mx-auto pt-2">
            Flexible memberships for any lifestyle. No hidden cancellation initiation fees. commitment-free cancel at any turn.
          </p>
        </div>

        {/* ANNUAL SWITCHER SLIDER */}
        <div className="flex items-center justify-center gap-4">
          <span className={`text-xs font-mono font-bold uppercase tracking-wider ${!isAnnual ? 'text-white' : 'text-neutral-500'}`}>
            Monthly Billing
          </span>
          
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            id="billing-cycle-toggle"
            className="w-14 h-8 bg-neutral-900 rounded-full p-1 border border-neutral-800 transition-colors duration-300 relative cursor-pointer"
            aria-label="Toggle annual billing discount"
          >
            <div className={`w-6 h-6 rounded-full bg-red-500 shadow-md transform transition-transform duration-300 ${
              isAnnual ? 'translate-x-[22px]' : 'translate-x-0'
            }`} />
          </button>

          <div className="flex items-center gap-2">
            <span className={`text-xs font-mono font-bold uppercase tracking-wider ${isAnnual ? 'text-emerald-400' : 'text-neutral-500'}`}>
              Annual Prepay
            </span>
            <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded-full font-sans font-bold uppercase border border-emerald-500/20">
              Save 20%
            </span>
          </div>
        </div>

        {/* CARDS COMPILATION GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto pr-0.5">
          {MEMBERSHIPS.map((plan) => {
            const displayPrice = getDisplayPlanPrice(plan.price);
            const style = getAccentClass(plan.accent);
            const isPopular = plan.popular;

            return (
              <div 
                key={plan.id}
                className={`bg-neutral-900 rounded-2xl border flex flex-col justify-between transition-all duration-300 relative group overflow-hidden ${
                  isPopular 
                    ? 'border-emerald-500/60 shadow-lg scale-102 z-10' 
                    : 'border-neutral-850 hover:border-neutral-700'
                }`}
              >
                {/* Popular Corner Badge */}
                {isPopular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-emerald-500 to-teal-500 text-black text-[9px] font-mono font-bold uppercase tracking-widest px-4 py-1.5 rounded-bl-xl shadow-md z-1">
                    Most Popular Choice
                  </div>
                )}

                {/* Header detail */}
                <div className="p-6 sm:p-8 space-y-4 text-left border-b border-neutral-950">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-black uppercase tracking-widest text-neutral-400">
                      Tier Pack
                    </span>
                    {isPopular && (
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-mono font-semibold px-2 py-0.5 rounded border border-emerald-500/25">
                        High Value
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-display font-black text-white tracking-tight uppercase">
                    {plan.name}
                  </h3>

                  <p className="text-neutral-450 text-xs leading-relaxed h-12">
                    {plan.description}
                  </p>

                  <div className="pt-2 flex items-baseline">
                    <span className="text-5xl font-display font-black text-white leading-none tracking-tight">
                      ${displayPrice}
                    </span>
                    <span className="text-neutral-400 text-xs ml-1 font-sans font-medium">
                      / month
                    </span>
                  </div>

                  {isAnnual && (
                    <div className="text-[10px] text-emerald-400 font-mono font-bold">
                      * ${displayPrice * 12} billed annually (prepaid)
                    </div>
                  )}
                </div>

                {/* Feature check lists */}
                <div className="p-6 sm:p-8 flex-1 text-left space-y-4">
                  <span className="text-[10px] font-mono font-bold uppercase text-neutral-400 tracking-wider">
                    Whats Included in Tier:
                  </span>
                  
                  <div className="space-y-3.5">
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex gap-3 items-start">
                        <div className="bg-neutral-950 p-1 rounded-md border border-neutral-800 shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        </div>
                        <span className="text-neutral-300 text-xs sm:text-sm leading-tight">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Signup Bottom Trigger Button */}
                <div className="p-6 sm:p-8 bg-neutral-950/40 pt-4 border-t border-neutral-950">
                  <button
                    onClick={() => onPlanSelect(plan)}
                    id={`signup-btn-${plan.id}`}
                    className={`w-full py-4 text-xs font-display font-bold uppercase tracking-wider rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 ${style.button}`}
                  >
                    Select {plan.name}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* TRUST BADGING SECTION */}
        <div className="bg-neutral-900 border border-neutral-850 p-6 rounded-2xl max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-xs divide-y md:divide-y-0 md:divide-x divide-neutral-800">
          <div className="flex flex-col items-center justify-center gap-1.5 py-2 md:py-0">
            <Smile className="w-5 h-5 text-red-500" />
            <h4 className="font-display font-bold text-white uppercase text-[13px]">14-Day Guest Waiver</h4>
            <p className="text-neutral-400 max-w-[200px]">Bring custom workout guests to tryout group coaching.</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-1.5 py-4 md:py-0">
            <Trophy className="w-5 h-5 text-emerald-400" />
            <h4 className="font-display font-bold text-white uppercase text-[13px]">Zero Initiation Cost</h4>
            <p className="text-neutral-400 max-w-[200px]">Absolutely $0 signup keys. Pay only your rate.</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-1.5 py-2 md:py-0">
            <HelpCircle className="w-5 h-5 text-red-500" />
            <h4 className="font-display font-bold text-white uppercase text-[13px]">Flexible Freeze</h4>
            <p className="text-neutral-400 max-w-[200px]">Pause contract anytime for up to 3 months for travels.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
