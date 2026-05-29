import { useState } from 'react';
import { Calendar, User, Clock, Flame, ChevronRight, CheckCircle, Sparkles, HelpCircle } from 'lucide-react';
import { SCHEDULE } from '../data';
import { ClassScheduleItem } from '../types';

export default function Schedule() {
  const [selectedDay, setSelectedDay] = useState<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'>('Monday');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Yoga' | 'Gym' | 'Cardio' | 'HIIT' | 'CrossFit'>('All');
  
  // Real-time schedule state to support booking simulation
  const [classes, setClasses] = useState<ClassScheduleItem[]>(SCHEDULE);
  const [bookedClassIds, setBookedClassIds] = useState<string[]>([]);
  const [bookingSuccessMsg, setBookingSuccessMsg] = useState<string>('');

  const days: ('Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday')[] = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  const categories: ('All' | 'Yoga' | 'Gym' | 'Cardio' | 'HIIT' | 'CrossFit')[] = [
    'All', 'Yoga', 'Gym', 'Cardio', 'HIIT', 'CrossFit'
  ];

  // Filter schedules
  const filteredClasses = classes.filter(item => {
    const matchesDay = item.day === selectedDay;
    const matchesCategory = selectedCategory === 'All' ? true : item.category === selectedCategory;
    return matchesDay && matchesCategory;
  });

  const handleBookClass = (classId: string) => {
    const targetClass = classes.find(c => c.id === classId);
    if (!targetClass) return;

    if (bookedClassIds.includes(classId)) {
      // Cancel booking
      setBookedClassIds(prev => prev.filter(id => id !== classId));
      setClasses(prev => prev.map(c => {
        if (c.id === classId) {
          return { ...c, capacityRemaining: c.capacityRemaining + 1 };
        }
        return c;
      }));
      setBookingSuccessMsg(`Cancelled slot for ${targetClass.className}.`);
      setTimeout(() => setBookingSuccessMsg(''), 4000);
      return;
    }

    if (targetClass.capacityRemaining <= 0) {
      alert('This slot is fully packed! Check other times.');
      return;
    }

    // Book slot
    setBookedClassIds(prev => [...prev, classId]);
    setClasses(prev => prev.map(c => {
      if (c.id === classId) {
        return { ...c, capacityRemaining: c.capacityRemaining - 1 };
      }
      return c;
    }));
    setBookingSuccessMsg(`Slot locked! You are booked for ${targetClass.className} at ${targetClass.time}.`);
    setTimeout(() => setBookingSuccessMsg(''), 5000);
  };

  const getIntensityBadge = (lvl: 'Medium' | 'High' | 'Extreme') => {
    switch (lvl) {
      case 'Medium':
        return 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/20';
      case 'High':
        return 'bg-amber-950/40 text-amber-500 border border-amber-500/20';
      case 'Extreme':
        return 'bg-red-950/40 text-red-500 border border-red-500/20';
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Yoga': return 'text-purple-400';
      case 'Gym': return 'text-red-400';
      case 'Cardio': return 'text-amber-400';
      case 'HIIT': return 'text-emerald-400';
      case 'CrossFit': return 'text-rose-450';
      default: return 'text-neutral-300';
    }
  };

  return (
    <section id="schedule" className="py-24 bg-neutral-900 border-t border-neutral-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs text-red-500 uppercase tracking-widest font-mono font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Weekly Timetable
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black text-white tracking-tight uppercase">
            TRAINING TIMETABLE & BOOKING
          </h2>
          <div className="h-1 w-20 bg-red-500 mx-auto rounded-full mt-2"></div>
          <p className="text-neutral-400 text-sm max-w-lg mx-auto pt-2">
            Select a day, filter by exercise style, and reserve structural seats instantly.
          </p>
        </div>

        {/* TIMETABLE DASHBOARD CONTROLS */}
        <div className="space-y-6 max-w-6xl mx-auto bg-neutral-950/80 p-6 rounded-2xl border border-neutral-850">
          
          {/* NOTIFICATION TOAST BAR */}
          {bookingSuccessMsg && (
            <div className="bg-emerald-950/70 border border-emerald-500/45 text-emerald-300 px-4 py-3.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-3.5 animate-pulse text-left shadow-md">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{bookingSuccessMsg}</span>
            </div>
          )}

          {/* DAY BUTTONS */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-neutral-400 text-left block">
              1. Choose Day of week
            </span>
            <div className="flex flex-wrap gap-1.5">
              {days.map((day) => {
                const count = classes.filter(c => c.day === day).length;
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`px-4 py-2 text-xs sm:text-sm font-display font-bold uppercase rounded-lg tracking-wide transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                      selectedDay === day
                        ? 'bg-red-500 text-black shadow-glow-red'
                        : 'bg-neutral-900 hover:bg-neutral-850 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {day}
                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${selectedDay === day ? 'bg-black text-red-400' : 'bg-neutral-950 text-neutral-400'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* TYPE FILTER CHIPS */}
          <div className="space-y-2 pt-2 border-t border-neutral-900">
            <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-neutral-400 text-left block">
              2. Filter Exercise Discipline
            </span>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-[10px] sm:text-xs font-mono font-black uppercase rounded-md tracking-wider transition-all duration-205 cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-white text-black font-extrabold'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-850'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* TIMETABLE DYNAMIC CLASSIFICATIONS GRID */}
        <div className="max-w-6xl mx-auto space-y-4 text-left">
          
          {/* Header Legend labels for wider layouts */}
          <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest border-b border-neutral-850">
            <div className="col-span-2">Timing Block</div>
            <div className="col-span-3">Class Description</div>
            <div className="col-span-2">Coach Leader</div>
            <div className="col-span-2">Intensity Level</div>
            <div className="col-span-2">Available Capacity</div>
            <div className="col-span-1 text-right">Reservation</div>
          </div>

          {/* Iterated schedules cards */}
          {filteredClasses.map((item) => {
            const isBooked = bookedClassIds.includes(item.id);
            const isFull = item.capacityRemaining <= 0;

            return (
              <div 
                key={item.id}
                className={`bg-neutral-950 rounded-xl border p-5 lg:p-6 transition-all duration-200 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center ${
                  isBooked 
                    ? 'border-emerald-500/50 bg-emerald-950/5' 
                    : 'border-neutral-850 hover:border-neutral-750 hover:bg-neutral-950/60'
                }`}
              >
                {/* Timing */}
                <div className="col-span-2 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-red-500" />
                  <span className="text-base font-display font-medium text-white tracking-tight">
                    {item.time}
                  </span>
                  <span className="text-[10px] text-neutral-500 font-mono lg:hidden">
                    ({item.duration})
                  </span>
                </div>

                {/* Class Specs */}
                <div className="col-span-3 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-mono leading-none tracking-widest uppercase font-bold ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                    <span className="hidden lg:inline-block text-[10px] text-neutral-500 font-mono">
                      | {item.duration}
                    </span>
                  </div>
                  <h4 className="text-lg font-display font-black text-white uppercase tracking-tight">
                    {item.className}
                  </h4>
                </div>

                {/* Coach */}
                <div className="col-span-2 flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-neutral-500" />
                  <span className="text-xs sm:text-sm text-neutral-300 font-sans">
                    {item.trainerName}
                  </span>
                </div>

                {/* Intensity Indicator */}
                <div className="col-span-2">
                  <span className={`text-[9px] font-mono uppercase tracking-widest font-bold px-2.0 py-0.5 rounded ${getIntensityBadge(item.intensity)}`}>
                    {item.intensity} Load
                  </span>
                </div>

                {/* Capacities */}
                <div className="col-span-2 flex items-center gap-2">
                  <div className="flex-1 max-w-[80px] bg-neutral-900 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${isFull ? 'bg-neutral-700' : 'bg-emerald-500'}`}
                      style={{ width: `${(item.capacityRemaining / item.capacity) * 100}%` }}
                    />
                  </div>
                  <span className={`text-xs font-mono font-medium ${isFull ? 'text-red-500' : 'text-neutral-400'}`}>
                    {isFull ? 'fully packed' : `${item.capacityRemaining} / ${item.capacity} left`}
                  </span>
                </div>

                {/* Reservation Action Button */}
                <div className="col-span-1 text-right flex justify-start lg:justify-end">
                  <button
                    onClick={() => handleBookClass(item.id)}
                    id={`book-class-btn-${item.id}`}
                    disabled={isFull && !isBooked}
                    className={`w-full lg:w-auto px-4 py-2 rounded-lg text-xs font-display font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer text-center ${
                      isBooked
                        ? 'bg-emerald-500 text-black shadow-glow-green'
                        : isFull
                          ? 'bg-neutral-900 text-neutral-600 cursor-not-allowed border border-neutral-850'
                          : 'bg-red-500 hover:bg-red-400 text-black shadow-sm'
                    }`}
                  >
                    {isBooked ? 'Reserved ✓' : isFull ? 'No Seats' : 'Book Slot'}
                  </button>
                </div>

              </div>
            );
          })}

          {filteredClasses.length === 0 && (
            <div className="bg-neutral-950 border border-neutral-850 rounded-xl p-10 text-center text-neutral-500 text-xs font-mono">
              Theres no schedule configured under the `{selectedCategory}` category for {selectedDay}. Look into alternative filter settings above.
            </div>
          )}

        </div>

        {/* TIMETABLE BRIEF LEGAL CLAIMS */}
        <p className="text-center text-neutral-500 text-[11px] max-w-lg mx-auto leading-relaxed">
          * Bookings hold active validity up to 10 minutes prior to physical schedule launch, after which remaining reserves revert to waitlists.
        </p>

      </div>
    </section>
  );
}
