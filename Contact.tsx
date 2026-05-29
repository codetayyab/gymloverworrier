import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    phone: '',
    preferredTime: 'Anytime'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in Name, Email, and Message fields.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate API transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        message: '',
        phone: '',
        preferredTime: 'Anytime'
      });
      // Clear success alert automatically after 6 seconds
      setTimeout(() => setSubmitStatus('idle'), 6050);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-neutral-900 border-t border-neutral-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs text-red-500 uppercase tracking-widest font-mono font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Get In Touch
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black text-white tracking-tight uppercase">
            CONNECT WITH POWERFIT
          </h2>
          <div className="h-1 w-20 bg-red-500 mx-auto rounded-full mt-2"></div>
        </div>

        {/* CORE CONTACT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* LEFT COLUMN: CONTACT METADATA, MAP & HOURS */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            
            {/* Direct Coordinates card */}
            <div className="bg-neutral-950 border border-neutral-850 p-6 sm:p-8 rounded-2xl text-left space-y-6">
              <h3 className="text-xl font-display font-bold text-white uppercase tracking-tight">
                HQ CONTACT DESK
              </h3>

              <div className="space-y-4">
                
                {/* Phone */}
                <div className="flex gap-4 items-start">
                  <div className="p-2.5 bg-neutral-900 rounded-lg border border-neutral-800 text-red-500 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-neutral-500 text-[10px] uppercase font-mono tracking-widest font-bold">Call Front Desk</span>
                    <a href="tel:+15551234567" className="text-white hover:text-red-400 font-bold text-sm tracking-tight transition-colors">
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4 items-start">
                  <div className="p-2.5 bg-neutral-900 rounded-lg border border-neutral-800 text-red-500 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-neutral-500 text-[10px] uppercase font-mono tracking-widest font-bold">Email support</span>
                    <a href="mailto:trainers@powerfitgym.com" className="text-white hover:text-red-400 font-bold text-sm tracking-tight transition-colors">
                      trainers@powerfitgym.com
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex gap-4 items-start">
                  <div className="p-2.5 bg-neutral-900 rounded-lg border border-neutral-800 text-red-500 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-neutral-500 text-[10px] uppercase font-mono tracking-widest font-bold">Physical Stadium</span>
                    <p className="text-neutral-300 text-sm leading-tight font-medium">
                      100 Main Gym Way, Fitness Quad Suite B<br />Code Block Arena, CA 90210
                    </p>
                  </div>
                </div>

                {/* Operating timings */}
                <div className="flex gap-4 items-start">
                  <div className="p-2.5 bg-neutral-900 rounded-lg border border-neutral-800 text-red-500 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-neutral-500 text-[10px] uppercase font-mono tracking-widest font-bold">Operating Hours</span>
                    <p className="text-neutral-300 text-xs sm:text-sm leading-tight">
                      Mon – Fri: <span className="text-white font-medium">05:00 AM – 10:00 PM</span><br />
                      Sat – Sun: <span className="text-white font-medium">06:00 AM – 08:00 PM</span>
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Google maps representation panel */}
            <div className="bg-neutral-950 border border-neutral-850 rounded-2xl overflow-hidden h-64 lg:h-56 relative min-h-[220px]">
              <iframe
                title="PowerFit Gym Flagship Location Map"
                src="https://maps.google.com/maps?q=gym%20center&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 grayscale invert opacity-80"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-xs text-white text-[9px] px-2.5 py-1 rounded font-mono font-bold uppercase border border-neutral-850">
                Live Flagship Radar
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: SECURE INTERACTIVE MESSAGE BOX */}
          <div className="lg:col-span-7 bg-neutral-950 border border-neutral-850 p-6 sm:p-8 rounded-2xl text-left relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-display font-bold text-white uppercase tracking-tight">
                  SEND AN INQUIRY
                </h3>
                <p className="text-xs text-neutral-450 leading-relaxed">
                  Have specific queries about coaching credentials, medical holds, or custom programs? Drop code messages below.
                </p>
              </div>

              {submitStatus === 'success' && (
                <div className="bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 p-4 rounded-xl text-xs sm:text-sm flex items-start gap-3.5 animate-fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold">Form Sent Safely!</span>
                    <span className="block text-emerald-400 font-normal mt-0.5">
                      Thank you for contacting us. One of our lead fitness consultants will reach you inside 24 operating hours.
                    </span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="form-name" className="block text-neutral-500 text-[10px] uppercase font-mono tracking-widest font-bold mb-1.5">Your Name *</label>
                    <input
                      id="form-name"
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-neutral-900 text-white placeholder-neutral-650 border border-neutral-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-lg px-4 py-2.5 outline-none transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="form-email" className="block text-neutral-500 text-[10px] uppercase font-mono tracking-widest font-bold mb-1.5">Email Address *</label>
                    <input
                      id="form-email"
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-neutral-900 text-white placeholder-neutral-650 border border-neutral-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-lg px-4 py-2.5 outline-none transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="form-phone" className="block text-neutral-500 text-[10px] uppercase font-mono tracking-widest font-bold mb-1.5">Phone Number</label>
                    <input
                      id="form-phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full bg-neutral-900 text-white placeholder-neutral-650 border border-neutral-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-lg px-4 py-2.5 outline-none transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="form-time" className="block text-neutral-500 text-[10px] uppercase font-mono tracking-widest font-bold mb-1.5">Preferred Callback Time</label>
                    <select
                      id="form-time"
                      value={formData.preferredTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, preferredTime: e.target.value }))}
                      className="w-full bg-neutral-900 text-white border border-neutral-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-lg px-3 py-2.5 outline-none transition-all text-sm"
                    >
                      <option value="Anytime">Anytime during hours</option>
                      <option value="Morning">Morning (08:00 AM - 12:00 PM)</option>
                      <option value="Afternoon">Afternoon (12:00 PM - 04:00 PM)</option>
                      <option value="Evening">Evening (04:00 PM - 08:00 PM)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="form-msg" className="block text-neutral-500 text-[10px] uppercase font-mono tracking-widest font-bold mb-1.5">Message Content *</label>
                  <textarea
                    id="form-msg"
                    rows={4}
                    required
                    placeholder="Tell us about your fitness targets, medical requirements, or scheduling inquiries..."
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full bg-neutral-900 text-white placeholder-neutral-650 border border-neutral-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-lg px-4 py-3 outline-none transition-all text-sm resize-none"
                  />
                </div>

                <button
                  id="form-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-500 hover:bg-red-400 text-black py-4.5 px-4 font-display font-bold uppercase tracking-wider rounded-xl transition-all shadow-glow-red flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-sm"
                >
                  {isSubmitting ? (
                    'Transmitting Message...'
                  ) : (
                    <>
                      Transmit Inquiry
                      <Send className="w-4 h-4 text-black" strokeWidth={2.5} />
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="text-[10px] text-neutral-500 flex gap-1.5 items-center justify-center pt-4">
              <AlertCircle className="w-3.5 h-3.5 text-neutral-600" />
              <span>Your privacy is 100% secure. We do not transmit commercial spam under any condition.</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
