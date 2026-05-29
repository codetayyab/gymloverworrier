import React, { useState } from 'react';
import { X, Check, Dumbbell, Sparkles, Smile, ShieldCheck } from 'lucide-react';
import { MembershipPlan } from '../types';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: MembershipPlan | null;
  allPlans: MembershipPlan[];
}

export default function JoinModal({ isOpen, onClose, selectedPlan, allPlans }: JoinModalProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    chosenPlanId: selectedPlan?.id || allPlans[1]?.id || '',
    billingCycle: 'monthly', // monthly | yearly (20% discount)
    primaryGoal: 'Strength Building',
    couponCode: '',
    agreeToTerms: false
  });
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const handlePlanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, chosenPlanId: e.target.value }));
  };

  const selectedPlanDetails = allPlans.find(p => p.id === formData.chosenPlanId);

  // Compute pricing
  const basePrice = selectedPlanDetails?.price || 0;
  const rawPrice = formData.billingCycle === 'yearly' ? Math.round(basePrice * 0.8 * 12) : basePrice;
  const finalPrice = couponApplied ? Math.round(rawPrice * 0.9) : rawPrice; // 10% coupon discount

  const applyCoupon = () => {
    if (formData.couponCode.trim().toUpperCase() === 'POWERFIT10') {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try "POWERFIT10"');
      setCouponApplied(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert('Please fill out all contact fields.');
      return;
    }
    if (!formData.agreeToTerms) {
      alert('Please agree to the membership terms to proceed.');
      return;
    }
    setCurrentStep(2);
  };

  const handleCloseAndReset = () => {
    setCurrentStep(1);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      chosenPlanId: selectedPlan?.id || allPlans[1]?.id || '',
      billingCycle: 'monthly',
      primaryGoal: 'Strength Building',
      couponCode: '',
      agreeToTerms: false
    });
    setCouponApplied(false);
    setCouponError('');
    onClose();
  };

  return (
    <div id="join-modal-wrapper" className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity duration-300">
      <div 
        id="join-modal-container" 
        className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl shadow-glow-green max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner */}
        <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 p-5 relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
          <button 
            id="close-modal-btn"
            onClick={handleCloseAndReset}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 p-1.5 rounded-full transition-colors duration-200"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="p-2 bg-black/20 rounded-lg">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-display font-bold text-white tracking-tight">POWERFIT MEMBERSHIP</h3>
              <p className="text-xs text-emerald-100 mt-0.5">Start your premium transformation journey today</p>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Content Container */}
        <div className="overflow-y-auto p-6 md:p-8 flex-1">
          {currentStep === 1 ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="modal-name" className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">Full Name</label>
                  <input
                    id="modal-name"
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    className="w-full bg-neutral-800 text-white placeholder-neutral-500 border border-neutral-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg px-4 py-2.5 outline-none transition-all text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="modal-email" className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">Email Address</label>
                  <input
                    id="modal-email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-neutral-800 text-white placeholder-neutral-500 border border-neutral-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg px-4 py-2.5 outline-none transition-all text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="modal-phone" className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">Phone Number</label>
                  <input
                    id="modal-phone"
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full bg-neutral-800 text-white placeholder-neutral-500 border border-neutral-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg px-4 py-2.5 outline-none transition-all text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="modal-goal" className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">Primary Fitness Goal</label>
                  <select
                    id="modal-goal"
                    value={formData.primaryGoal}
                    onChange={(e) => setFormData(prev => ({ ...prev, primaryGoal: e.target.value }))}
                    className="w-full bg-neutral-800 text-white border border-neutral-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg px-3 py-2.5 outline-none transition-all text-sm"
                  >
                    <option value="Strength Building">Strength Guild & Power</option>
                    <option value="Fat Loss & Tone">Fat Loss & Conditioning</option>
                    <option value="Athletic Performance">Athletic/Functional Mastery</option>
                    <option value="Flexibility & Health">Flexibility, Mind & Alignment</option>
                  </select>
                </div>
              </div>

              {/* Package customization */}
              <div className="border-t border-neutral-800 pt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="modal-plan" className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5 font-display">Select Gym Plan</label>
                    <select
                      id="modal-plan"
                      value={formData.chosenPlanId}
                      onChange={handlePlanChange}
                      className="w-full bg-neutral-800 text-white border border-neutral-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg px-3 py-2.5 outline-none transition-all text-sm"
                    >
                      {allPlans.map(p => (
                        <option key={p.id} value={p.id}>{p.name} — ${p.price}/mo</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <span className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5 font-display">Billing Frequency</span>
                    <div className="flex gap-2 bg-neutral-800 p-1 rounded-lg border border-neutral-700">
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, billingCycle: 'monthly' }))}
                        className={`flex-1 text-center py-1.5 text-xs font-medium rounded-md transition-all ${
                          formData.billingCycle === 'monthly'
                            ? 'bg-emerald-500 text-black'
                            : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        Monthly
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, billingCycle: 'yearly' }))}
                        className={`flex-1 text-center py-1.5 text-xs font-medium rounded-md transition-all flex items-center justify-center gap-1 ${
                          formData.billingCycle === 'yearly'
                            ? 'bg-emerald-500 text-black'
                            : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        Yearly <span className="text-[9px] bg-red-500 text-white px-1 py-0.2 rounded font-bold">20% OFF</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Promo Code Input */}
                <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 flex items-center justify-between gap-2">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Promo Code (Try: POWERFIT10)"
                      value={formData.couponCode}
                      onChange={(e) => setFormData(prev => ({ ...prev, couponCode: e.target.value }))}
                      className="w-full bg-neutral-900 text-xs border border-neutral-700 rounded-md px-3 py-2 outline-none focus:border-emerald-500 text-white uppercase"
                    />
                    {couponError && <p className="text-[10px] text-red-500 mt-1">{couponError}</p>}
                    {couponApplied && <p className="text-[10px] text-emerald-400 mt-1">✓ 10% Extra Discount Applied</p>}
                  </div>
                  <button
                    type="button"
                    onClick={applyCoupon}
                    className="bg-neutral-800 hover:bg-neutral-750 text-white hover:text-emerald-400 text-xs font-bold px-4 py-2 rounded-md transition-colors shrink-0"
                  >
                    Apply
                  </button>
                </div>

                {/* Order Summary Recap Area */}
                <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 text-sm space-y-2">
                  <div className="flex justify-between text-xs text-neutral-400">
                    <span>Selected Option:</span>
                    <span className="text-white font-medium">{selectedPlanDetails?.name}</span>
                  </div>
                  <div className="flex justify-between text-xs text-neutral-400">
                    <span>Base rate:</span>
                    <span className="text-white">${basePrice}/month</span>
                  </div>
                  <div className="flex justify-between text-xs text-neutral-400">
                    <span>Billing method:</span>
                    <span className="text-white uppercase font-semibold">{formData.billingCycle === 'yearly' ? 'Yearly Prepay' : 'Monthly Card Billing'}</span>
                  </div>
                  <div className="border-t border-neutral-800 my-2 pt-2 flex justify-between items-center">
                    <span className="text-xs font-bold tracking-wider text-neutral-300">ESTIMATED TOTAL DUE:</span>
                    <span className="text-lg font-display font-bold text-emerald-400">
                      ${finalPrice} 
                      <span className="text-xs text-neutral-400 font-normal"> / {formData.billingCycle === 'yearly' ? 'year' : 'month'}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Consent check */}
              <div className="flex items-start gap-2.5">
                <input
                  id="modal-terms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) => setFormData(prev => ({ ...prev, agreeToTerms: e.target.checked }))}
                  className="w-4 h-4 rounded mt-0.5 bg-neutral-800 border-neutral-700 text-emerald-500 focus:ring-emerald-500"
                />
                <label htmlFor="modal-terms" className="text-xs text-neutral-400 leading-tight">
                  I agree to the PowerFit Gym terms of service, medical disclaimer, waiver release policy, and authorize automated recurring billing of my chosen rate.
                </label>
              </div>

              {/* Core interactive Submit */}
              <button
                id="modal-submit-btn"
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black py-3 px-4 font-display font-bold rounded-xl transition-all shadow-glow-green flex items-center justify-center gap-2 cursor-pointer mt-2 text-sm"
              >
                Complete Membership Signup
              </button>
            </form>
          ) : (
            // Success step 
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 bg-emerald-500/10 border-2 border-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-glow-green">
                <ShieldCheck className="w-8 h-8 text-emerald-400" />
              </div>
              
              <div className="space-y-2">
                <h4 className="text-2xl font-display font-bold text-white tracking-tight">YOU ARE LIFTING READY!</h4>
                <p className="text-sm text-neutral-400 max-w-sm mx-auto">
                  Welcome to PowerFit, <span className="text-emerald-400 font-semibold">{formData.fullName}</span>! Your customized training key card is ready for collection at the reception desk.
                </p>
              </div>

              <div id="receipt-details" className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 text-left text-xs space-y-3 max-w-md mx-auto">
                <div className="flex items-center gap-2 text-neutral-400 font-semibold uppercase tracking-wider text-[10px] pb-2 border-b border-neutral-900">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  Membership Manifest
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Owner Key:</span>
                  <span className="text-white font-mono uppercase tracking-wider">PF-{Math.floor(Math.random() * 900000 + 100000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Committed Tier:</span>
                  <span className="text-emerald-400 font-semibold uppercase">{selectedPlanDetails?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Primary Ambition:</span>
                  <span className="text-white font-medium">{formData.primaryGoal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Billing Action:</span>
                  <span className="text-white">${finalPrice}/{formData.billingCycle === 'yearly' ? 'year' : 'month'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Account Status:</span>
                  <span className="text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full font-bold uppercase text-[9px]">ACTIVE ● APPROVED</span>
                </div>
              </div>

              <div className="text-neutral-500 text-[11px] flex gap-2 items-center justify-center">
                <Smile className="w-4 h-4 text-emerald-500 shrink-0" />
                A secure receipt and confirmation email was dispatched to {formData.email}
              </div>

              <button
                id="modal-finished-btn"
                onClick={handleCloseAndReset}
                className="w-full bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-3 rounded-xl transition-colors cursor-pointer text-sm"
              >
                Go To Training Board
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
