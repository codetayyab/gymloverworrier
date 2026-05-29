import { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Award, Plus, Sparkles } from 'lucide-react';
import { TESTIMONIALS } from '../data';
import { Testimonial } from '../types';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const activeTestimonial = TESTIMONIALS[activeIndex];

  // Helper to draw star rating block
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-neutral-700'}`} 
      />
    ));
  };

  return (
    <section id="testimonials" className="py-24 bg-neutral-950 border-t border-neutral-900 relative overflow-hidden">
      
      {/* Absolute Decorative Blur Elements */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-red-600/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs text-red-500 uppercase tracking-widest font-mono font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Success Stories
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black text-white tracking-tight uppercase">
            COMMUNITY RESULTS & TRIUMPHS
          </h2>
          <div className="h-1 w-20 bg-red-500 mx-auto rounded-full mt-2"></div>
          <p className="text-neutral-400 text-sm max-w-lg mx-auto pt-2">
            Real people. Genuine commitment. Spectacular results. Look into real lifestyle changes from members.
          </p>
        </div>

        {/* INTERACTIVE TESTIMONIAL CAROUSEL/GRID DUO */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-neutral-900 border border-neutral-850 p-6 sm:p-10 rounded-3xl relative">
          
          {/* Big Quote absolute mark */}
          <div className="absolute top-6 left-6 text-neutral-800 scale-[2.5] select-none pointer-events-none opacity-20">
            <Quote className="w-10 h-10 fill-neutral-850" />
          </div>

          {/* Left Side: Photo and achievements sticker */}
          <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
            <div className="relative w-36 h-36 rounded-2xl overflow-hidden border-2 border-red-500 shadow-glow-red">
              <img 
                src={activeTestimonial.image} 
                alt={activeTestimonial.name} 
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute bottom-0 inset-x-0 bg-neutral-950/80 py-1 text-[9px] font-mono tracking-widest font-black text-red-400 uppercase">
                Verified Member
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="text-lg font-display font-bold text-white uppercase tracking-tight">
                {activeTestimonial.name}
              </h4>
              <p className="text-xs text-neutral-500">
                {activeTestimonial.role}
              </p>
            </div>

            {/* Achievement Sticker */}
            <div className="bg-red-950/40 border border-red-500/20 px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-mono font-bold text-red-400">
              <Award className="w-3.5 h-3.5" />
              {activeTestimonial.achievement}
            </div>
          </div>

          {/* Right Side: Quote, review, rating, controls */}
          <div className="lg:col-span-8 flex flex-col justify-between h-full space-y-6 text-left relative z-1">
            <div className="space-y-4">
              {/* Stars block */}
              <div className="flex gap-1">
                {renderStars(activeTestimonial.rating)}
              </div>

              {/* Review Quote text */}
              <blockquote className="text-neutral-200 text-sm sm:text-base md:text-lg font-sans font-light leading-relaxed italic">
                "{activeTestimonial.review}"
              </blockquote>
            </div>

            {/* Controls panel */}
            <div className="flex items-center justify-between pt-6 border-t border-neutral-800">
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === activeIndex ? 'w-8 bg-red-500' : 'w-2 bg-neutral-700 hover:bg-neutral-600'
                    }`}
                    aria-label={`Go to slide testimonial ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex gap-1.5">
                <button
                  onClick={prevTestimonial}
                  className="bg-neutral-950 hover:bg-neutral-800 text-neutral-400 hover:text-white p-2.5 rounded-lg border border-neutral-850 cursor-pointer transition-colors"
                  aria-label="Previous story"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="bg-neutral-950 hover:bg-neutral-800 text-neutral-400 hover:text-white p-2.5 rounded-lg border border-neutral-850 cursor-pointer transition-colors"
                  aria-label="Next story"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* RESULTS STATS BANNER */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10">
          <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-900 text-center space-y-2">
            <span className="text-3xl font-display font-black text-white">98.4%</span>
            <p className="text-xs font-mono uppercase text-zinc-500 tracking-wider">Member Retention Rate</p>
          </div>
          <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-900 text-center space-y-2">
            <span className="text-3xl font-display font-black text-emerald-400">12,400+</span>
            <p className="text-xs font-mono uppercase text-zinc-500 tracking-wider">Total Kilograms Shed</p>
          </div>
          <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-900 text-center space-y-2">
            <span className="text-3xl font-display font-black text-white">100%</span>
            <p className="text-xs font-mono uppercase text-zinc-500 tracking-wider">Commitment to Form & Safety</p>
          </div>
        </div>

      </div>
    </section>
  );
}
