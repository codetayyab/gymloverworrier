/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Membership from './components/Membership';
import Schedule from './components/Schedule';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import JoinModal from './components/JoinModal';
import { MEMBERSHIPS } from './data';
import { MembershipPlan } from './types';
import { Dumbbell, Instagram, Twitter, Facebook, ArrowUp, Send, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [activeSelectedPlan, setActiveSelectedPlan] = useState<MembershipPlan | null>(null);
  
  // Newsletter signup state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleOpenJoinModal = (plan: MembershipPlan | null = null) => {
    setActiveSelectedPlan(plan);
    setIsJoinModalOpen(true);
  };

  const handleOpenDefaultJoinModal = () => {
    // Default pre-selects the Standard Popular plan (id: 'p2')
    const popularPlan = MEMBERSHIPS.find(p => p.popular) || MEMBERSHIPS[0];
    handleOpenJoinModal(popularPlan);
  };

  const handleScrollToSection = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // Navbar offset height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    
    setNewsletterSuccess(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSuccess(false), 5000);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-neutral-950 text-neutral-200 antialiased selection:bg-red-550 selection:text-black">
      
      {/* Premium Sticky Navigation bar */}
      <Navbar onJoinClick={handleOpenDefaultJoinModal} />

      {/* Hero Presentation Page layout */}
      <Hero 
        onJoinClick={handleOpenDefaultJoinModal} 
        onViewPlansClick={() => handleScrollToSection('membership')} 
      />

      {/* Main container with structured segments */}
      <main>
        
        {/* About segment including mission statements and trainer catalog */}
        <About />

        {/* Services segment detailing fitness classes */}
        <Services />

        {/* Membership segment containing prices and active toggler */}
        <Membership onPlanSelect={(plan) => handleOpenJoinModal(plan)} />

        {/* Schedule segment listing interactive class timetables */}
        <Schedule />

        {/* Testimonials customer ratings element */}
        <Testimonials />

        {/* Contact information details & interactive maps/forms */}
        <Contact />

      </main>

      {/* MASTER HIGH-CONTRAST FOOTER */}
      <footer className="bg-neutral-950 border-t border-neutral-900 pt-16 pb-8 text-left relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Branding Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-red-500 rounded-lg">
                  <Dumbbell className="w-5 h-5 text-black" strokeWidth={3} />
                </div>
                <span className="text-xl font-display font-black text-white tracking-tighter uppercase leading-none">
                  POWER<span className="text-red-500">FIT</span>
                </span>
              </div>
              <p className="text-neutral-500 text-xs leading-relaxed">
                Transform your body, transform your life. Experience elite coaching and modern diagnostic-led fitness workouts at our 35,000 sq ft ultimate training yard.
              </p>
              <div className="flex gap-3">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 bg-neutral-900 hover:bg-red-500 rounded text-neutral-400 hover:text-black transition-colors"
                  aria-label="Instagram handle"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 bg-neutral-900 hover:bg-red-500 rounded text-neutral-400 hover:text-black transition-colors"
                  aria-label="Twitter handle"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 bg-neutral-900 hover:bg-red-500 rounded text-neutral-400 hover:text-black transition-colors"
                  aria-label="Facebook handle"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Sitemap Navigation Column */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                EXPLORE STADIUM
              </h4>
              <ul className="space-y-2 text-xs">
                {['home', 'about', 'services', 'membership', 'schedule', 'testimonials', 'contact'].map((sect) => (
                  <li key={sect}>
                    <button 
                      onClick={() => handleScrollToSection(sect)}
                      className="text-neutral-400 hover:text-white capitalize transition-colors duration-150 cursor-pointer"
                    >
                      {sect} section
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Address Coordinates Column */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                FLAGSHIP STATION
              </h4>
              <p className="text-neutral-400 text-xs leading-relaxed">
                100 Main Gym Way, Suite B<br />
                Fitness Quad Arena<br />
                California, CA 90210
              </p>
              <div className="text-xs text-neutral-500 space-y-1">
                <span>Front Desk: +1 (555) 123-4567</span>
                <span className="block">Email: trainers@powerfitgym.com</span>
              </div>
            </div>

            {/* Newsletter Input Box Column */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                NEWSLETTER BROADCASTS
              </h4>
              <p className="text-neutral-500 text-xs leading-relaxed">
                Subscribe to get periodic fat loss strategies, athletic blueprints, and priority schedule notifications.
              </p>

              {newsletterSuccess ? (
                <div className="bg-emerald-950/40 p-3 rounded-lg border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2 animate-pulse">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Subscribed! Check code "POWERFIT10"</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2 bg-neutral-900 border border-neutral-800 p-1.5 rounded-lg">
                  <input
                    type="email"
                    required
                    placeholder="Your email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 bg-transparent px-2 py-1 outline-none text-xs text-white"
                  />
                  <button
                    type="submit"
                    className="bg-red-500 hover:bg-red-400 text-black p-1.5 rounded-md transition-all shrink-0 cursor-pointer"
                    aria-label="Submit email address"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* LOWER FOOTER */}
          <div className="border-t border-neutral-900 pt-8 mt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-neutral-500 gap-4">
            <div>
              <span>© {new Date().getFullYear()} PowerFit Gym. All Rights Committed. Built by Gemini Code Wizards.</span>
            </div>
            
            <div className="flex gap-4">
              <a href="#privacy" className="hover:text-neutral-400 transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-neutral-400 transition-colors">Terms of Service</a>
              <a href="#medical" className="hover:text-neutral-400 transition-colors">Medical Waiver</a>
            </div>

            <button
              onClick={handleScrollToTop}
              className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 p-2.5 rounded-lg text-neutral-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
              aria-label="Scroll back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </footer>

      {/* DYNAMIC JOIN CHOSEN PLANS MODAL (Pre-configured structure logic) */}
      <JoinModal 
        isOpen={isJoinModalOpen} 
        onClose={() => setIsJoinModalOpen(false)}
        selectedPlan={activeSelectedPlan}
        allPlans={MEMBERSHIPS}
      />

    </div>
  );
}
