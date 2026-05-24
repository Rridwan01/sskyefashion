"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MapPin, Check, ArrowRight, ArrowLeft } from "lucide-react";
import { submitContactInquiry, bookShowroomAppointment } from "@/app/actions/contact";

interface Showroom {
  id: string;
  name: string;
  location: string;
  timezone: string;
  hours: string;
  image: string;
}

const showrooms: Showroom[] = [
  {
    id: "ibadan",
    name: "Ibadan Atelier",
    location: "22 Ring Road, Ibadan, Nigeria",
    timezone: "WAT (West Africa Time)",
    hours: "10:00 AM - 6:00 PM WAT",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: "nyc",
    name: "NYC SoHo Atelier",
    location: "120 Greene St, SoHo, New York, NY",
    timezone: "EST (Eastern Standard Time)",
    hours: "10:00 AM - 6:00 PM EST",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: "paris",
    name: "Paris Showroom",
    location: "320 Rue Saint-Honoré, Paris, France",
    timezone: "CET (Central European Time)",
    hours: "10:00 AM - 6:00 PM CET",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1470&auto=format&fit=crop"
  }
];

const timeSlots = [
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 1:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
  "4:00 PM - 5:00 PM",
  "5:00 PM - 6:00 PM"
];

// Helper to generate the next 7 business days (skipping Sundays)
function getAvailableDates() {
  const dates = [];
  let current = new Date();
  
  while (dates.length < 7) {
    current.setDate(current.getDate() + 1);
    // 0 = Sunday
    if (current.getDay() !== 0) {
      dates.push(new Date(current));
    }
  }
  return dates;
}

export function ContactClient() {
  const [activeTab, setActiveTab] = useState<"showroom" | "inquiry">("showroom");
  
  // Scheduler state
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Location, 2: Date/Time, 3: Form Info
  const [selectedShowroom, setSelectedShowroom] = useState<Showroom>(showrooms[0]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [bookingStatus, setBookingStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Inquiry form state
  const [inquiryStatus, setInquiryStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [inquiryError, setInquiryError] = useState("");

  const dates = getAvailableDates();

  const handleShowroomChange = (showroom: Showroom) => {
    setSelectedShowroom(showroom);
    setSelectedDate(null);
    setSelectedTimeSlot("");
  };

  const handleInquirySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInquiryStatus("submitting");
    setInquiryError("");

    const formData = new FormData(e.currentTarget);
    const res = await submitContactInquiry(formData);

    if (res.success) {
      setInquiryStatus("success");
    } else {
      setInquiryStatus("error");
      setInquiryError(res.error || "An error occurred. Please try again.");
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedDate || !selectedTimeSlot) {
      setErrorMessage("Please select a date and time slot.");
      return;
    }

    setBookingStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    formData.append("showroom", selectedShowroom.name);
    formData.append("date", selectedDate.toISOString());
    formData.append("timeSlot", selectedTimeSlot);

    const res = await bookShowroomAppointment(formData);

    if (res.success) {
      setBookingStatus("success");
    } else {
      setBookingStatus("error");
      setErrorMessage(res.error || "An error occurred. Please try again.");
    }
  };

  const resetBooking = () => {
    setStep(1);
    setSelectedDate(null);
    setSelectedTimeSlot("");
    setBookingStatus("idle");
    setErrorMessage("");
  };

  const formattedSelectedDate = selectedDate
    ? selectedDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
    : "";

  return (
    <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-stretch min-h-[70vh]">
      
      {/* Left Column: Visual Showroom Cards & Details */}
      <div className="relative min-h-[400px] lg:min-h-full rounded-2xl overflow-hidden bg-black flex flex-col justify-end p-8 md:p-16 group">
        
        {/* Dynamic Background Image based on active tab / selection */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab === "showroom" ? selectedShowroom.id : "inquiry-bg"}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.6, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={
                activeTab === "showroom"
                  ? selectedShowroom.image
                  : "https://images.unsplash.com/photo-1542272201-b1ca555f8505?q=80&w=1974&auto=format&fit=crop"
              }
              alt="Showroom view"
              className="w-full h-full object-cover grayscale contrast-125"
            />
          </motion.div>
        </AnimatePresence>

        {/* Ambient Dark Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

        <div className="relative z-20 space-y-6">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/50 block font-sans">
            SKYE Studio Locations
          </span>
          
          <AnimatePresence mode="wait">
            {activeTab === "showroom" ? (
              <motion.div
                key={selectedShowroom.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <h3 className="font-serif text-3xl md:text-5xl font-light uppercase tracking-widest text-white">
                  {selectedShowroom.name}
                </h3>
                <div className="space-y-2 font-sans text-xs md:text-sm text-white/70 tracking-wider">
                  <p className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 shrink-0 text-white/50" />
                    {selectedShowroom.location}
                  </p>
                  <p className="flex items-center gap-3">
                    <Clock className="w-4 h-4 shrink-0 text-white/50" />
                    {selectedShowroom.hours}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="inquiry-info"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <h3 className="font-serif text-3xl md:text-5xl font-light uppercase tracking-widest text-white">
                  Digital Atelier
                </h3>
                <p className="font-sans text-xs md:text-sm text-white/70 tracking-wider leading-relaxed max-w-md">
                  For press kits, editorial requests, collaborations, or global custom couture order inquiries, please use our secure digital form.
                </p>
                <div className="pt-6 mt-4 border-t border-white/10 flex flex-col gap-3 font-sans text-[10px] uppercase tracking-widest text-white/60">
                  <span className="text-[9px] text-white/30 tracking-[0.2em]">Direct Channels</span>
                  <div className="flex flex-col gap-2">
                    <a href="https://wa.me/2348100887247" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                      <span>WhatsApp:</span> <span className="text-white">+234 810 088 7247</span>
                    </a>
                    <a href="https://www.instagram.com/sskye_fashion?igsh=MWQzdmlka212MTZ1bQ==" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                      <span>Instagram:</span> <span className="text-white">@sskye_fashion</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Column: Interaction Form panel */}
      <div className="flex flex-col justify-start py-8">
        
        {/* Navigation Tabs */}
        <div className="flex gap-8 border-b border-foreground/10 pb-8 mb-12">
          <button
            onClick={() => setActiveTab("showroom")}
            className={`font-sans text-xs uppercase tracking-[0.2em] pb-3 relative transition-colors ${
              activeTab === "showroom" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Showroom Appointment
            {activeTab === "showroom" && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute bottom-0 inset-x-0 h-[2px] bg-foreground"
              />
            )}
          </button>
          
          <button
            onClick={() => setActiveTab("inquiry")}
            className={`font-sans text-xs uppercase tracking-[0.2em] pb-3 relative transition-colors ${
              activeTab === "inquiry" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            General & Press Inquiry
            {activeTab === "inquiry" && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute bottom-0 inset-x-0 h-[2px] bg-foreground"
              />
            )}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "showroom" ? (
            <motion.div
              key="showroom-scheduler"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {bookingStatus === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center space-y-6 border border-foreground/10 p-8 rounded-lg bg-foreground/[0.02]"
                >
                  <div className="w-16 h-16 rounded-full border border-foreground/20 flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8 text-foreground" />
                  </div>
                  <h3 className="font-serif text-2xl uppercase tracking-widest">Booking Requested</h3>
                  <p className="font-sans text-xs md:text-sm text-muted-foreground tracking-wide leading-relaxed max-w-sm mx-auto">
                    Your appointment at **{selectedShowroom.name}** for **{formattedSelectedDate}** at **{selectedTimeSlot}** has been recorded. We will send a confirmation and calendar invite shortly.
                  </p>
                  <button
                    onClick={resetBooking}
                    className="font-sans text-[10px] uppercase tracking-widest underline underline-offset-4 hover:text-muted-foreground transition-colors pt-4"
                  >
                    Schedule Another Appointment
                  </button>
                </motion.div>
              ) : (
                <div className="space-y-8">
                  {/* STEP 1: SHOWROOM SELECTION */}
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-8"
                    >
                      <div className="space-y-4">
                        <h4 className="font-sans text-xs uppercase tracking-widest text-muted-foreground">
                          Step 1: Select Showroom Location
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {showrooms.map((showroom) => (
                            <button
                              key={showroom.id}
                              onClick={() => handleShowroomChange(showroom)}
                              className={`p-6 border text-left flex flex-col justify-between aspect-square transition-all duration-300 ${
                                selectedShowroom.id === showroom.id
                                  ? "border-foreground bg-foreground/5"
                                  : "border-foreground/10 hover:border-foreground/30"
                              }`}
                            >
                              <span className="font-serif text-lg tracking-wider uppercase block text-foreground">
                                {showroom.name.split(" ")[0]}
                              </span>
                              <span className="font-sans text-[10px] tracking-widest text-muted-foreground uppercase mt-auto">
                                {showroom.timezone.split(" ")[0]}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => setStep(2)}
                        className="flex items-center gap-3 font-sans text-xs uppercase tracking-[0.2em] bg-foreground text-background px-8 py-4 hover:bg-foreground/90 transition-colors w-fit"
                      >
                        Next: Choose Date & Time
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}

                  {/* STEP 2: DATE & TIME SELECTION */}
                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-8"
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="font-sans text-xs uppercase tracking-widest text-muted-foreground">
                          Step 2: Select Date & Time slot
                        </h4>
                        <button
                          onClick={() => setStep(1)}
                          className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <ArrowLeft className="w-3. h-3." /> Back
                        </button>
                      </div>

                      {/* Date Grid */}
                      <div className="space-y-4">
                        <span className="font-sans text-[10px] tracking-widest text-muted-foreground uppercase block">
                          Select Date
                        </span>
                        <div className="grid grid-cols-3 md:grid-cols-7 gap-3">
                          {dates.map((date, idx) => {
                            const isSelected = selectedDate?.toDateString() === date.toDateString();
                            return (
                              <button
                                key={idx}
                                onClick={() => setSelectedDate(date)}
                                className={`py-4 border text-center flex flex-col gap-1 transition-all duration-300 ${
                                  isSelected
                                    ? "border-foreground bg-foreground/5"
                                    : "border-foreground/10 hover:border-foreground/30"
                                }`}
                              >
                                <span className="font-sans text-[9px] uppercase tracking-widest text-muted-foreground block">
                                  {date.toLocaleDateString("en-US", { weekday: "short" })}
                                </span>
                                <span className="font-serif text-lg font-light block">
                                  {date.getDate()}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Time Slots Grid */}
                      {selectedDate && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-4 pt-4 border-t border-foreground/10"
                        >
                          <span className="font-sans text-[10px] tracking-widest text-muted-foreground uppercase block">
                            Select Time Slot ({selectedShowroom.timezone})
                          </span>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {timeSlots.map((slot) => (
                              <button
                                key={slot}
                                onClick={() => setSelectedTimeSlot(slot)}
                                className={`py-3 border text-center font-sans text-xs tracking-wider transition-all duration-300 ${
                                  selectedTimeSlot === slot
                                    ? "border-foreground bg-foreground/5 text-foreground"
                                    : "border-foreground/10 hover:border-foreground/30 text-muted-foreground hover:text-foreground"
                                }`}
                              >
                                {slot}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {selectedDate && selectedTimeSlot && (
                        <button
                          onClick={() => setStep(3)}
                          className="flex items-center gap-3 font-sans text-xs uppercase tracking-[0.2em] bg-foreground text-background px-8 py-4 hover:bg-foreground/90 transition-colors w-fit mt-8"
                        >
                          Next: Client Details
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </motion.div>
                  )}

                  {/* STEP 3: CLIENT DETAILS FORM */}
                  {step === 3 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-8"
                    >
                      <div className="flex justify-between items-center border-b border-foreground/10 pb-4">
                        <div>
                          <h4 className="font-sans text-xs uppercase tracking-widest text-muted-foreground">
                            Step 3: Client Information
                          </h4>
                          <p className="font-sans text-[10px] text-muted-foreground uppercase tracking-wider mt-1">
                            {selectedShowroom.name} • {formattedSelectedDate} @ {selectedTimeSlot}
                          </p>
                        </div>
                        <button
                          onClick={() => setStep(2)}
                          className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <ArrowLeft className="w-3. h-3." /> Back
                        </button>
                      </div>

                      <form onSubmit={handleBookingSubmit} className="space-y-6">
                        <div className="space-y-2">
                          <label className="font-sans text-[10px] uppercase tracking-widest text-muted-foreground block">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            className="w-full bg-transparent border-b border-foreground/20 py-3 text-sm focus:border-foreground outline-none font-sans transition-colors placeholder:text-foreground/20"
                            placeholder="Alex Morgan"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="font-sans text-[10px] uppercase tracking-widest text-muted-foreground block">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            className="w-full bg-transparent border-b border-foreground/20 py-3 text-sm focus:border-foreground outline-none font-sans transition-colors placeholder:text-foreground/20"
                            placeholder="alex@example.com"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="font-sans text-[10px] uppercase tracking-widest text-muted-foreground block">
                            Styling Notes (Optional)
                          </label>
                          <textarea
                            name="notes"
                            rows={3}
                            className="w-full bg-transparent border border-foreground/20 p-4 text-sm focus:border-foreground outline-none font-sans transition-colors placeholder:text-foreground/20 resize-none"
                            placeholder="Specify preferred sizes, specific collections or Runway pieces you'd like previewed during your session..."
                          />
                        </div>

                        {errorMessage && (
                          <p className="font-sans text-xs text-red-500 tracking-wider uppercase">
                            {errorMessage}
                          </p>
                        )}

                        <button
                          type="submit"
                          disabled={bookingStatus === "submitting"}
                          className="w-full py-4 bg-foreground text-background font-sans text-xs uppercase tracking-[0.2em] hover:bg-foreground/90 transition-colors disabled:opacity-50"
                        >
                          {bookingStatus === "submitting" ? "Requesting..." : "Confirm Booking"}
                        </button>
                      </form>
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="inquiry-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              {inquiryStatus === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center space-y-6 border border-foreground/10 p-8 rounded-lg bg-foreground/[0.02]"
                >
                  <div className="w-16 h-16 rounded-full border border-foreground/20 flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8 text-foreground" />
                  </div>
                  <h3 className="font-serif text-2xl uppercase tracking-widest">Message Sent</h3>
                  <p className="font-sans text-xs md:text-sm text-muted-foreground tracking-wide leading-relaxed max-w-sm mx-auto">
                    Your inquiry has been successfully transmitted to the SKYE team. We will review your message and reply via email within 24 business hours.
                  </p>
                  <button
                    onClick={() => setInquiryStatus("idle")}
                    className="font-sans text-[10px] uppercase tracking-widest underline underline-offset-4 hover:text-muted-foreground transition-colors pt-4"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="font-sans text-[10px] uppercase tracking-widest text-muted-foreground block">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full bg-transparent border-b border-foreground/20 py-3 text-sm focus:border-foreground outline-none font-sans transition-colors placeholder:text-foreground/20"
                      placeholder="Jane Doe"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-sans text-[10px] uppercase tracking-widest text-muted-foreground block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full bg-transparent border-b border-foreground/20 py-3 text-sm focus:border-foreground outline-none font-sans transition-colors placeholder:text-foreground/20"
                      placeholder="jane@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-sans text-[10px] uppercase tracking-widest text-muted-foreground block">
                      Inquiry Type *
                    </label>
                    <select
                      name="subject"
                      required
                      className="w-full bg-background border-b border-foreground/20 py-3 text-sm focus:border-foreground outline-none font-sans transition-colors text-foreground"
                    >
                      <option value="General Inquiry" className="bg-background text-foreground">General Inquiry</option>
                      <option value="Press / Media" className="bg-background text-foreground">Press / Media</option>
                      <option value="Collaborations" className="bg-background text-foreground">Collaborations</option>
                      <option value="Custom Order" className="bg-background text-foreground">Custom Order / Commission</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="font-sans text-[10px] uppercase tracking-widest text-muted-foreground block">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      className="w-full bg-transparent border border-foreground/20 p-4 text-sm focus:border-foreground outline-none font-sans transition-colors placeholder:text-foreground/20 resize-none"
                      placeholder="Enter the details of your inquiry here..."
                    />
                  </div>

                  {inquiryError && (
                    <p className="font-sans text-xs text-red-500 tracking-wider uppercase">
                      {inquiryError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={inquiryStatus === "submitting"}
                    className="w-full py-4 bg-foreground text-background font-sans text-xs uppercase tracking-[0.2em] hover:bg-foreground/90 transition-colors disabled:opacity-50"
                  >
                    {inquiryStatus === "submitting" ? "Transmitting..." : "Send Message"}
                  </button>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
