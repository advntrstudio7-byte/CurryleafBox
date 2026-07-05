import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Users, Utensils, CheckCircle, Info } from 'lucide-react';
import { Reservation } from '../types';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const [step, setStep] = useState<'form' | 'success'>('form');
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('07:30 PM');
  const [guests, setGuests] = useState(2);
  const [experienceType, setExperienceType] = useState<'standard' | 'sadya' | 'courtyard'>('standard');
  const [specialRequests, setSpecialRequests] = useState('');

  const timeSlots = [
    '11:30 AM', '12:30 PM', '01:30 PM', '07:00 PM', '07:30 PM', '08:00 PM', '09:00 PM', '10:00 PM'
  ];

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !date) {
      alert('Please fill in all required fields.');
      return;
    }
    setStep('success');
  };

  const handleReset = () => {
    setStep('form');
    setName('');
    setEmail('');
    setPhone('');
    setDate('');
    setTime('07:30 PM');
    setGuests(2);
    setExperienceType('standard');
    setSpecialRequests('');
    onClose();
  };

  const experiences = [
    {
      id: 'standard',
      name: 'Standard Dining',
      desc: 'Elegant seating in our main modernist dining room with classic menu service.',
    },
    {
      id: 'sadya',
      name: 'Sadya Experience',
      desc: 'Traditional seated banquet eating on fresh banana leaves with personal service of 24+ items.',
    },
    {
      id: 'courtyard',
      name: 'Outdoor Courtyard',
      desc: 'Sip sulaimani tea and dine under our warm lights in the open air traditional courtyard.',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-on-surface/90 z-50 cursor-pointer"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="bg-background w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-deep-earth/10 flex flex-col md:flex-row max-h-[90vh]"
            >
              
              {/* Left Side Imagery / Brand Column */}
              <div className="hidden md:flex md:w-1/3 bg-deep-earth p-6 flex-col justify-between text-surface-white relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
                  style={{
                    backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBJO6520Qvt4wnr-Efigjr5LbuRgRAEQ2vhUwj1GPwNQZ83vLLMgQFGzbuOarx4RHM1EI5cTLw80XV1S0FgeVmyzIMfzTm6HxORs34xb2mWOXa_o_OSk9b6_kHVse1ee68T_Qx07ZNkcne6sCpj7-6PtRKniR9nnZmerqf4RfJdyE3lAjQhCoTk1oC9w17jhNvrTmjEPiglW7zHfav9o5ATjchb4IkKYl80slwfPP7E5D0Q3dSfJCeJaXd7wiHCKnsIR9rwVB2i3zKO")`,
                  }}
                />
                <div className="relative z-10 flex flex-col gap-6">
                  <span className="font-caps text-[10px] tracking-widest text-tertiary-fixed-dim uppercase">
                    Curry Leaf Box
                  </span>
                  <h4 className="font-serif text-2xl font-bold leading-tight">
                    Heritage <br /> Dining Table Reservation
                  </h4>
                </div>

                <div className="relative z-10 text-xs text-surface-container-highest/70 leading-relaxed flex flex-col gap-1.5 border-t border-surface-white/10 pt-4">
                  <span className="font-semibold text-surface-white">Opening Times:</span>
                  <span>Mon - Fri: 10:00 AM - 11:00 PM</span>
                  <span>Sat - Sun: 09:00 AM - Midnight</span>
                </div>
              </div>

              {/* Right Side Form Column */}
              <div className="flex-1 p-6 md:p-8 overflow-y-auto flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-primary">
                    {step === 'form' ? 'Book a Table' : 'Booking Completed'}
                  </h3>
                  <button
                    onClick={onClose}
                    className="p-1 hover:bg-surface-container-high rounded-full transition-colors text-on-surface-variant cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {step === 'form' ? (
                  <form onSubmit={handleBook} className="flex flex-col gap-4">
                    
                    {/* Basic selectors group: Date, Time, Guests */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Date */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-terracotta" />
                          <span>Date <span className="text-red-500">*</span></span>
                        </label>
                        <input
                          type="date"
                          required
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full px-3 py-2 bg-surface-white border border-deep-earth/10 rounded-xl text-xs sm:text-sm font-sans focus:outline-none focus:border-primary-container"
                        />
                      </div>

                      {/* Guests */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-terracotta" />
                          <span>Guests</span>
                        </label>
                        <select
                          value={guests}
                          onChange={(e) => setGuests(Number(e.target.value))}
                          className="w-full px-3 py-2 bg-surface-white border border-deep-earth/10 rounded-xl text-xs sm:text-sm font-sans focus:outline-none focus:border-primary-container"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                            <option key={num} value={num}>
                              {num} {num === 1 ? 'Guest' : 'Guests'}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Time Slots */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-terracotta" />
                        <span>Select Time Slot</span>
                      </label>
                      <div className="grid grid-cols-4 gap-1.5">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setTime(slot)}
                            className={`py-1.5 rounded-lg text-center text-[10px] sm:text-xs font-semibold transition-all cursor-pointer border ${
                              time === slot
                                ? 'bg-primary-container text-on-primary border-primary-container'
                                : 'bg-surface-white border-deep-earth/10 text-on-surface-variant hover:bg-surface-container-low'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Experience Choice */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-1.5">
                        <Utensils className="w-3.5 h-3.5 text-terracotta" />
                        <span>Dining Experience</span>
                      </label>
                      <div className="flex flex-col gap-2">
                        {experiences.map((exp) => (
                          <label
                            key={exp.id}
                            className={`p-3 rounded-xl border transition-colors cursor-pointer flex gap-3 items-start hover:bg-surface-container-low ${
                              experienceType === exp.id
                                ? 'border-primary-container bg-surface-container-low/50'
                                : 'border-deep-earth/10 bg-surface-white'
                            }`}
                          >
                            <input
                              type="radio"
                              name="experience"
                              checked={experienceType === exp.id}
                              onChange={() => setExperienceType(exp.id as any)}
                              className="text-primary focus:ring-primary mt-0.5"
                            />
                            <div className="flex flex-col">
                              <span className="text-xs sm:text-sm font-bold text-primary">{exp.name}</span>
                              <span className="text-[10px] sm:text-xs text-on-surface-variant leading-relaxed mt-0.5">
                                {exp.desc}
                              </span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Personal Information */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1.5">
                      <div className="flex flex-col gap-1">
                        <input
                          type="text"
                          required
                          placeholder="Your Name *"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-3 py-2 bg-surface-white border border-deep-earth/10 rounded-xl text-xs font-sans focus:outline-none focus:border-primary-container"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <input
                          type="email"
                          required
                          placeholder="Your Email *"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-3 py-2 bg-surface-white border border-deep-earth/10 rounded-xl text-xs font-sans focus:outline-none focus:border-primary-container"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <input
                          type="tel"
                          required
                          placeholder="Phone Number *"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-3 py-2 bg-surface-white border border-deep-earth/10 rounded-xl text-xs font-sans focus:outline-none focus:border-primary-container"
                        />
                      </div>
                    </div>

                    {/* Special notes */}
                    <input
                      type="text"
                      placeholder="Special celebration? Food allergies? Write notes here..."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full px-3 py-2 bg-surface-white border border-deep-earth/10 rounded-xl text-xs font-sans focus:outline-none focus:border-primary-container"
                    />

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full py-3 bg-primary-container text-on-primary rounded-full font-caps text-xs tracking-widest uppercase font-bold hover:bg-primary shadow-sm transition-all cursor-pointer mt-2 hover:scale-[1.01] active:scale-[0.99]"
                    >
                      Confirm Reservation
                    </button>
                  </form>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center py-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ duration: 0.5 }}
                      className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-5"
                    >
                      <CheckCircle className="w-8 h-8" />
                    </motion.div>

                    <h4 className="font-serif text-xl font-bold text-primary mb-1">
                      Table Reserved!
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-on-surface-variant mb-6 max-w-sm">
                      We look forward to welcoming you, <span className="font-bold text-primary">{name}</span>. A booking confirmation voucher has been sent to <span className="text-primary font-medium">{email}</span>.
                    </p>

                    {/* Booking metadata */}
                    <div className="w-full bg-surface-container-low border border-deep-earth/10 rounded-xl p-4 text-left flex flex-col gap-2.5 mb-6 text-xs sm:text-sm">
                      <div className="flex justify-between border-b border-deep-earth/5 pb-1.5 text-xs">
                        <span className="text-on-surface-variant">Reservation ID:</span>
                        <span className="font-mono font-bold text-primary">#RES-{Math.floor(2000 + Math.random() * 7000)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-on-surface-variant">Date & Time:</span>
                        <span className="font-bold text-primary">{date} at {time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-on-surface-variant">Guests:</span>
                        <span className="font-bold text-primary">{guests} guests</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-on-surface-variant">Seating Experience:</span>
                        <span className="font-bold text-primary">
                          {experienceType === 'standard'
                            ? 'Standard Table'
                            : experienceType === 'sadya'
                            ? 'Sadya Feast Banquet'
                            : 'Outdoor Courtyard Seating'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-3.5 text-left text-[11px] sm:text-xs leading-relaxed max-w-sm mb-6">
                      <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <span>
                        <strong>Note:</strong> We hold tables for 15 minutes past the reservation time. Please contact us via phone if you are running late.
                      </span>
                    </div>

                    <button
                      onClick={handleReset}
                      className="w-full py-3 bg-primary-container text-on-primary rounded-full font-caps text-xs tracking-widest uppercase font-bold hover:bg-primary shadow-sm transition-all cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
