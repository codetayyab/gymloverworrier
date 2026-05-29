import { useState, useEffect } from 'react';
import { Dumbbell, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onJoinClick: () => void;
}

export default function Navbar({ onJoinClick }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Detect active navigation item
      const sections = ['home', 'about', 'services', 'membership', 'schedule', 'testimonials', 'contact'];
      for (const sect of sections) {
        const el = document.getElementById(sect);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(sect);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', targetId: 'home' },
    { label: 'About', targetId: 'about' },
    { label: 'Services', targetId: 'services' },
    { label: 'Membership', targetId: 'membership' },
    { label: 'Schedule', targetId: 'schedule' },
    { label: 'Testimonials', targetId: 'testimonials' },
    { label: 'Contact', targetId: 'contact' },
  ];

  const handleNavClick = (targetId: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // height of the header
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

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/90 border-b border-neutral-800 backdrop-blur-md py-4' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand/Logo */}
          <button 
            id="navbar-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="p-1.5 bg-gradient-to-br from-red-600 to-red-500 rounded-lg shadow-glow-red transition-all duration-300 group-hover:scale-110">
              <Dumbbell className="w-5.5 h-5.5 text-black" strokeWidth={3} />
            </div>
            <div className="text-left font-display">
              <span className="text-xl font-black text-white tracking-tighter block leading-none">
                POWER<span className="text-red-500">FIT</span>
              </span>
              <span className="text-[10px] text-neutral-400 font-sans tracking-widest font-bold block leading-none mt-1">
                GYM & COACHING
              </span>
            </div>
          </button>

          {/* Desktop Navigation Link Deck */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.targetId}
                id={`navlink-${item.targetId}`}
                onClick={() => handleNavClick(item.targetId)}
                className={`px-4 py-2 rounded-lg text-sm font-medium tracking-tight transition-all duration-200 cursor-pointer ${
                  activeSection === item.targetId
                    ? 'text-red-500 font-bold bg-neutral-900 border-b-2 border-red-500'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900/40'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Action CTA Button */}
          <div className="hidden lg:block">
            <button
              onClick={onJoinClick}
              id="nav-join-cta"
              className="bg-red-500 hover:bg-red-400 text-black px-5 py-2 rounded-lg text-sm font-display font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 flex items-center gap-1.5 cursor-pointer shadow-glow-red"
            >
              Join Now
              <ArrowUpRight className="w-4 h-4 text-black" strokeWidth={2.5} />
            </button>
          </div>

          {/* Hamburger Menu Toggler */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              id="mobile-menu-toggle"
              className="text-neutral-400 hover:text-white p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-700 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-neutral-950 border-b border-neutral-900 absolute top-full left-0 right-0 py-4 px-4 shadow-xl flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.targetId}
              id={`mobile-navlink-${item.targetId}`}
              onClick={() => handleNavClick(item.targetId)}
              className={`w-full text-left py-3 px-4 rounded-xl text-base font-medium transition-colors ${
                activeSection === item.targetId
                  ? 'bg-red-950/20 text-red-400 border-l-4 border-red-500 pl-3 font-semibold'
                  : 'text-neutral-300 hover:bg-neutral-900 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-neutral-900 mt-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onJoinClick();
              }}
              id="mobile-nav-join-cta"
              className="w-full bg-red-500 hover:bg-red-450 text-black py-3 rounded-xl font-display font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              Join Now
              <ArrowUpRight className="w-5 h-5 text-black" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
