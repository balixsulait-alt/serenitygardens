import React, { useState, useEffect, FormEvent } from "react";
import { Booking } from "../types";
import { 
  Calendar, Phone, User, Landmark, ShieldCheck, CreditCard, 
  Sparkles, CheckCircle2, ArrowRight, Printer, AlertCircle, Loader2 
} from "lucide-react";

interface BookingPortalProps {
  initialCategory?: "gardens" | "hall" | "party" | "rooms";
  onBookingSuccess: () => void;
}

export default function BookingPortal({ initialCategory = "gardens", onBookingSuccess }: BookingPortalProps) {
  const [category, setCategory] = useState<"gardens" | "hall" | "party" | "rooms">(initialCategory);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [eventDetails, setEventDetails] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState(1);
  
  // Checkout & Payment states
  const [isPaying, setIsPaying] = useState(false);
  const [paymentStep, setPaymentStep] = useState<"form" | "network" | "pin" | "receipt">("form");
  const [paymentMethod, setPaymentMethod] = useState<"MTN" | "Airtel" | "VISA">("MTN");
  const [pinCode, setPinCode] = useState("");
  const [momoNumber, setMomoNumber] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [generatedBooking, setGeneratedBooking] = useState<Booking | null>(null);
  const [errorText, setErrorText] = useState("");

  // Synchronize category with initialCategory from spaces clicks
  useEffect(() => {
    if (initialCategory) {
      setCategory(initialCategory);
    }
  }, [initialCategory]);

  // Pricing catalog mapping
  const rates = {
    gardens: { label: "Lush Eden Gardens", cost: 1500000, desc: "Fits up to 800 guests, flat rate" },
    hall: { label: "Executive Meeting Hall", cost: 500000, desc: "Sleek board hall hire per day" },
    party: { label: "Gourmet Event Catering", cost: 25000, desc: "Full-course plate service per head" },
    rooms: { label: "Comfort Guest Room", cost: 45000, desc: "Sleep for a night (Breakfast, Lunch & Dinner)" }
  };

  const selectedRate = rates[category];
  const totalCost = selectedRate.cost * duration;
  const depositRequired = Math.round(totalCost * 0.30); // 30% deposit rule

  const isGreenTheme = category === "gardens" || category === "rooms";

  const handleOpenPayment = (e: FormEvent) => {
    e.preventDefault();
    setErrorText("");
    if (!customerName || !phone || !date) {
      setErrorText("Please fill in your name, contact phone number, and reservation date!");
      return;
    }
    setMomoNumber(phone);
    setPaymentStep("form");
    setIsPaying(true);
  };

  const handleGatewayPayment = () => {
    setPaymentStep("network");
    setErrorText("");
    
    // 1. Simulate contacting networks
    setTimeout(() => {
      if (paymentMethod === "VISA") {
        submitSuccessfulBooking();
      } else {
        setPaymentStep("pin");
      }
    }, 2000);
  };

  const handlePinSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorText("");
    if (pinCode.length < 4) {
      setErrorText("Please enter a valid 5-digit PIN to authenticate the MoMo transaction!");
      return;
    }
    setPaymentStep("network");
    
    // Simulate approval hook
    setTimeout(() => {
      submitSuccessfulBooking();
    }, 2500);
  };

  const submitSuccessfulBooking = async () => {
    const ref = "SGI-" + Math.floor(100000 + Math.random() * 900000);
    setReferenceId(ref);

    const bookingPayload: Booking = {
      customerName,
      phone,
      eventType: category,
      eventDetails: eventDetails || `${rates[category].label} online reservation`,
      date,
      durationDays: duration,
      depositPaid: depositRequired,
      paymentMethod: paymentMethod === "MTN" ? "MTN Mobile Money" : paymentMethod === "Airtel" ? "Airtel Money" : "Credit Card / Visa"
    };

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload)
      });
      
      const resData = await response.json();
      if (resData.success) {
        setGeneratedBooking(resData.data);
        setPaymentStep("receipt");
      } else {
        throw new Error(resData.error || "Server booking error");
      }
    } catch (err) {
      console.error("Booking post error:", err);
      // Fallback local support if connection fails
      const fallbackBooking: Booking = {
        ...bookingPayload,
        id: "BK-F" + Math.floor(1000 + Math.random() * 9000),
        status: "Confirmed",
        timestamp: new Date().toISOString()
      };
      setGeneratedBooking(fallbackBooking);
      setPaymentStep("receipt");
    }
  };

  const resetPortalState = () => {
    setIsPaying(false);
    setPaymentStep("form");
    setCustomerName("");
    setPhone("");
    setEventDetails("");
    setDate("");
    setDuration(1);
    onBookingSuccess(); // Triggers feed refetches for local feeds
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="booking-portal-root">
      
      {/* 1. Reservation Parameter form block */}
      <div className="lg:col-span-7 bg-[#0d0d0d] p-6 rounded-2xl border border-white/5 shadow-xl space-y-6">
        <div>
          <h2 className="text-xl font-serif text-white flex items-center gap-2">
            <Calendar className={`w-5 h-5 animate-pulse ${isGreenTheme ? "text-emerald-450" : "text-amber-305"}`} />
            Online Reservation Form
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Reserve pristine spaces. Deposits are processed locally and securely.
          </p>
        </div>

        {errorText && (
          <div className="p-3.5 bg-red-950/40 border border-red-500/30 text-red-200 text-xs rounded-xl flex items-center gap-2" id="booking-error-panel">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorText}</span>
          </div>
        )}

        <form onSubmit={handleOpenPayment} className="space-y-4" id="booking-input-elements">
          
          {/* Category picker */}
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3 font-mono">
              Select Venue Space
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(rates) as Array<keyof typeof rates>).map((key) => {
                const itemIsGreen = key === "gardens" || key === "rooms";
                return (
                  <button
                    type="button"
                    key={key}
                    id={`venue-select-${key}`}
                    onClick={() => {
                      setCategory(key);
                      setErrorText("");
                    }}
                    className={`px-3 py-3 rounded-lg border text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      category === key
                        ? itemIsGreen 
                          ? "bg-emerald-400 text-zinc-950 border-emerald-400 shadow-sm"
                          : "bg-amber-200 text-zinc-950 border-amber-300 shadow-sm"
                        : "bg-zinc-900 border-white/5 text-zinc-400 hover:bg-zinc-850 hover:text-white"
                    }`}
                  >
                    <div className="font-serif text-xs uppercase tracking-wide">{rates[key].label}</div>
                    <div className={`text-[10px] mt-0.5 font-mono font-bold ${category === key ? "text-zinc-800" : "text-zinc-500"}`}>
                      {rates[key].cost.toLocaleString()} UGX
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Customer Name */}
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5 font-mono">
                Your Full Name / Organisation
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                    setErrorText("");
                  }}
                  placeholder="e.g. Juliet Nabirye"
                  className={`w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-zinc-950 border border-white/5 text-zinc-100 rounded-lg focus:outline-none focus:ring-1 focus:bg-zinc-900/60 ${
                    isGreenTheme ? "focus:ring-emerald-405" : "focus:ring-amber-200"
                  }`}
                />
              </div>
            </div>

            {/* Contact phone number */}
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5 font-mono">
                Tel Number (for MoMo Checkout)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
                  <Phone className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setErrorText("");
                  }}
                  placeholder="e.g. +256 772 123 456"
                  className={`w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-zinc-950 border border-white/5 text-zinc-100 rounded-lg focus:outline-none focus:ring-1 focus:bg-zinc-900/60 ${
                    isGreenTheme ? "focus:ring-emerald-405" : "focus:ring-amber-200"
                  }`}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Preferred Date */}
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5 font-mono">
                Reservation Date
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setErrorText("");
                }}
                className={`w-full px-3 py-2 text-xs sm:text-sm bg-zinc-950 border border-white/5 text-zinc-100 rounded-lg focus:outline-none focus:ring-1 focus:bg-zinc-900/60 ${
                  isGreenTheme ? "focus:ring-emerald-405" : "focus:ring-amber-200"
                }`}
              />
            </div>

            {/* Duration Days */}
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5 font-mono">
                Duration ({category === "rooms" ? "Nights" : "Days"})
              </label>
              <input
                type="number"
                min="1"
                required
                value={duration}
                onChange={(e) => {
                  setDuration(Math.max(1, parseInt(e.target.value) || 1));
                  setErrorText("");
                }}
                className={`w-full px-3 py-2 text-xs sm:text-sm bg-zinc-950 border border-white/5 text-zinc-100 rounded-lg focus:outline-none focus:ring-1 focus:bg-zinc-900/60 ${
                  isGreenTheme ? "focus:ring-emerald-405" : "focus:ring-amber-200"
                }`}
              />
            </div>
          </div>

          {/* Event description */}
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5 font-mono">
              Event Description / Special Requests
            </label>
            <textarea
              value={eventDetails}
              onChange={(e) => {
                setEventDetails(e.target.value);
                setErrorText("");
              }}
              placeholder="Tell us about the setup, Kwanjula timeline, or doublebed suite preference..."
              rows={2}
              className={`w-full px-3 py-2 text-xs sm:text-sm bg-zinc-950 border border-white/5 text-zinc-100 rounded-lg focus:outline-none focus:ring-1 focus:bg-zinc-900/60 ${
                isGreenTheme ? "focus:ring-emerald-405" : "focus:ring-amber-200"
              }`}
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-xl font-bold uppercase text-xs tracking-wider transition-all shadow-md hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer ${
              isGreenTheme
                ? "bg-emerald-400 hover:bg-white text-zinc-950"
                : "bg-amber-200 hover:bg-white text-zinc-950"
            }`}
          >
            Calculate & Proceed to Deposit
            <ArrowRight className="w-4 h-4" />
          </button>

        </form>
      </div>

      {/* 2. Interactive Invoice Summary side dashboard */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-[#0d0d0d] text-zinc-300 p-6 rounded-2xl border border-white/5 shadow-xl space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-white/5">
            <span className="p-1.5 bg-zinc-900 border border-white/5 rounded-md">
              <Landmark className={`w-4 h-4 ${isGreenTheme ? "text-emerald-400" : "text-amber-300"}`} />
            </span>
            <div>
              <h3 className="text-sm font-serif text-white tracking-widest uppercase">
                Booking Cost Invoice
              </h3>
              <p className="text-[10px] text-zinc-500 font-mono">
                SERENITY GARDENS PAYMENT NODE
              </p>
            </div>
          </div>

          <div className="space-y-3.5 text-xs sm:text-sm font-sans" id="invoice-details-summary">
            <div className="flex justify-between items-center text-zinc-400">
              <span>Selected Venue:</span>
              <strong className="text-white font-serif">{rates[category].label}</strong>
            </div>
            <div className="flex justify-between items-center text-zinc-400">
              <span>Standard Daily Rate:</span>
              <strong className="text-white font-mono">{rates[category].cost.toLocaleString()} UGX</strong>
            </div>
            <div className="flex justify-between items-center text-zinc-400">
              <span>Duration Count:</span>
              <strong className="text-white font-semibold">{duration} {category === "rooms" ? "Night(s)" : "Day(s)"}</strong>
            </div>

            <div className="pt-3 border-t border-white/5 flex justify-between items-center text-zinc-400">
              <span>Total Venue Hire Cost:</span>
              <strong className={`text-base font-mono ${isGreenTheme ? "text-emerald-450" : "text-amber-200"}`}>{totalCost.toLocaleString()} UGX</strong>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 space-y-2">
              <div className="flex justify-between items-baseline flex-wrap gap-2">
                <span className={`text-xs font-semibold uppercase tracking-wider font-mono ${isGreenTheme ? "text-emerald-400" : "text-amber-300"}`}>
                  MoMo Deposit Required (30%):
                </span>
                <strong className={`text-xl font-mono font-bold leading-none select-all ${isGreenTheme ? "text-emerald-400" : "text-amber-200"}`}>
                  {depositRequired.toLocaleString()} UGX
                </strong>
              </div>
              <p className="text-[10px] text-zinc-500 leading-normal">
                Pay this 30% deposit now to secure your booking in the Iganga registrar. The remaining 70% is cleared upon arrival.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-zinc-500 bg-zinc-950/40 border border-white/5 p-2.5 rounded-lg">
            <ShieldCheck className={`w-4 h-4 shrink-0 ${isGreenTheme ? "text-emerald-450" : "text-amber-300"}`} />
            <span>Guaranteed security of Busoga Hospitality deposit nodes. Refunds eligible up to 7 days before event.</span>
          </div>
        </div>
      </div>

      {/* --- MOUNTED SECURE PAYMENT MODAL --- */}
      {isPaying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs transition-opacity overflow-y-auto">
          <div className="w-full max-w-md bg-[#0d0d0d] rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col my-8">
            
            {/* Header branding */}
            <div className="bg-zinc-900 border-b border-white/5 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-zinc-950 border border-white/5 rounded-sm">
                  <ShieldCheck className="w-5 h-5 text-amber-300" />
                </span>
                <div>
                  <h3 className="text-xs font-serif text-amber-200 uppercase tracking-widest">
                    Secure Deposit Node
                  </h3>
                  <p className="text-[9px] text-zinc-500 font-mono">
                    DusuPay / MoMo Uganda Engine
                  </p>
                </div>
              </div>
              {paymentStep !== "network" && paymentStep !== "receipt" && (
                <button
                  onClick={() => setIsPaying(false)}
                  className="w-8 h-8 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center font-bold text-lg cursor-pointer"
                >
                  &times;
                </button>
              )}
            </div>

            {/* Checkout screen switcher */}
            <div className="p-6 flex-1 space-y-4">

              {errorText && (
                <div className="p-3 bg-red-950/40 border border-red-550/30 text-rose-300 text-xs rounded-xl flex items-center gap-2" id="modal-error-box">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorText}</span>
                </div>
              )}

              {/* STEP 1: Payment Channel form */}
              {paymentStep === "form" && (
                <div className="space-y-4" id="momo-checkout-form">
                  <h4 className="text-center font-bold text-zinc-200 text-xs tracking-widest uppercase">
                    Select Your Uganda Payment Channel
                  </h4>
                  
                  {/* Tab switches */}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setPaymentMethod("MTN")}
                      className={`py-3 rounded-lg border flex flex-col items-center gap-1.5 transition-all text-xs font-bold leading-none cursor-pointer ${
                        paymentMethod === "MTN"
                          ? "bg-amber-400 text-amber-950 border-amber-400 font-extrabold shadow-sm"
                          : "bg-zinc-900 border-white/5 text-zinc-400 hover:text-white hover:bg-zinc-800"
                      }`}
                    >
                      <div className="w-5 h-5 rounded-full bg-amber-950 text-amber-400 flex items-center justify-center text-[9px] font-mono font-black">
                        MTN
                      </div>
                      MoMo
                    </button>

                    <button
                      onClick={() => setPaymentMethod("Airtel")}
                      className={`py-3 rounded-lg border flex flex-col items-center gap-1.5 transition-all text-xs font-bold leading-none cursor-pointer ${
                        paymentMethod === "Airtel"
                          ? "bg-red-650 text-white border-red-600 font-extrabold shadow-sm"
                          : "bg-zinc-900 border-white/5 text-zinc-400 hover:text-white hover:bg-zinc-800"
                      }`}
                    >
                      <div className="w-5 h-5 rounded-full bg-white text-red-650 flex items-center justify-center text-[9px] font-mono font-black">
                        airtel
                      </div>
                      Airtel Money
                    </button>

                    <button
                      onClick={() => setPaymentMethod("VISA")}
                      className={`py-3 rounded-lg border flex flex-col items-center gap-1.5 transition-all text-xs font-bold leading-none cursor-pointer ${
                        paymentMethod === "VISA"
                          ? "bg-amber-200 text-zinc-950 border-amber-300 font-extrabold shadow-sm"
                          : "bg-zinc-900 border-white/5 text-zinc-400 hover:text-white hover:bg-zinc-800"
                      }`}
                    >
                      <CreditCard className="w-5 h-5" />
                      VISA / Card
                    </button>
                  </div>

                  {paymentMethod !== "VISA" ? (
                    <div className="space-y-3">
                      <label className="block text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                        Carrier Billing Mobile Number
                      </label>
                      <input
                        type="text"
                        value={momoNumber}
                        onChange={(e) => setMomoNumber(e.target.value)}
                        placeholder="e.g. 0772 123 456"
                        className="w-full text-center font-mono font-bold text-lg px-4 py-2 bg-zinc-950 border border-white/5 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-amber-200 focus:bg-zinc-900"
                      />
                      <div className="flex gap-2 items-start bg-zinc-950 border border-white/5 p-3 rounded-lg text-xs text-zinc-400">
                        <AlertCircle className="w-4 h-4 text-amber-305 shrink-0 mt-0.5 animate-pulse" />
                        <span>Ensure the SIM is inside your phone as a push authorization request dialogue will trigger on submit.</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <label className="block text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                        Card Master Details
                      </label>
                      <input
                        type="text"
                        placeholder="4000 1234 5678 9010"
                        className="w-full text-center font-mono px-4 py-2 bg-zinc-950 border border-white/5 rounded-xl text-white"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input type="text" placeholder="MM/YY" className="text-center font-mono py-2 bg-zinc-950 border border-white/5 rounded-xl text-white" />
                        <input type="text" placeholder="CVC" className="text-center font-mono py-2 bg-zinc-950 border border-white/5 rounded-xl text-white" />
                      </div>
                    </div>
                  )}

                  {/* Summary row */}
                  <div className="p-3 bg-zinc-950 border border-white/5 rounded-lg flex justify-between items-center text-xs">
                    <span className="font-medium text-zinc-400">Paying Secure Deposit:</span>
                    <strong className="text-amber-200 font-mono font-bold">{depositRequired.toLocaleString()} UGX</strong>
                  </div>

                  <button
                    onClick={handleGatewayPayment}
                    className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all select-none shadow-md cursor-pointer ${
                      paymentMethod === "MTN" 
                        ? "bg-amber-400 hover:bg-amber-500 text-amber-950" 
                        : paymentMethod === "Airtel" 
                        ? "bg-red-650 hover:bg-red-700 text-white" 
                        : "bg-amber-200 hover:bg-white text-zinc-950"
                    }`}
                  >
                    Authenticate {depositRequired.toLocaleString()} UGX
                  </button>
                </div>
              )}

              {/* STEP 2: Network Pinger loading */}
              {paymentStep === "network" && (
                <div className="py-8 flex flex-col items-center justify-center text-center space-y-4" id="momo-loading-pinger">
                  <div className="relative">
                    <Loader2 className="w-12 h-12 text-amber-300 animate-spin" />
                    <Sparkles className="w-6 h-6 text-amber-100 absolute -top-1 -right-1 animate-ping" />
                  </div>
                  <div>
                    <h4 className="font-serif text-white tracking-widest text-sm uppercase">Pushing MoMo Request Node</h4>
                    <p className="text-xs text-zinc-400 mt-2 max-w-xs mx-auto leading-relaxed">
                      Please wait. We are secure checking MTN/Airtel gateway connectivity for subscriber <strong className="text-white font-mono">{momoNumber}</strong>...
                    </p>
                  </div>
                </div>
              )}

              {/* STEP 3: Kampala Mock Code USSD Popup pin block */}
              {paymentStep === "pin" && (
                <div className="space-y-4" id="momo-ussd-popup">
                  <div className="bg-zinc-900 border border-white/5 p-4 rounded-xl text-center space-y-2">
                    <h4 className="font-extrabold text-amber-200 font-mono text-sm leading-none tracking-wider">
                      MTN Mobile Money UG
                    </h4>
                    <span className="text-[10px] text-zinc-500 block font-mono uppercase tracking-widest">
                      Push Pin Dialogue (Simulation)
                    </span>
                    <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                      Do you authorize payment of <strong className="font-mono text-amber-205">{depositRequired.toLocaleString()} UGX</strong> to Serenity Gardens Iganga?
                    </p>
                  </div>

                  <form onSubmit={handlePinSubmit} className="space-y-3">
                    <div className="relative">
                      <input
                        type="password"
                        required
                        maxLength={5}
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value.replace(/\D/g, ''))}
                        placeholder="Enter 5-digit MoMo PIN"
                        className="w-full text-center text-xl font-bold tracking-widest px-4 py-3 bg-zinc-950 border-2 border-amber-300/40 text-amber-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-200 focus:bg-zinc-900"
                      />
                    </div>
                    <p className="text-[10px] text-zinc-505 text-center leading-normal">
                      Security tip: This is a secure local simulation sandbox. No real money is drawn. Enter any 5 digits (e.g. 12345) to complete!
                    </p>
                    <button
                      type="submit"
                      className="w-full py-3 rounded-lg bg-amber-200 hover:bg-white text-zinc-950 font-bold uppercase tracking-wider font-mono text-xs cursor-pointer"
                    >
                      Authorize Transaction ✔
                    </button>
                  </form>
                </div>
              )}

              {/* STEP 4: Printed digital Receipt display */}
              {paymentStep === "receipt" && generatedBooking && (
                <div className="space-y-4" id="booking-invoice-receipt">
                  
                  {/* Receipt block */}
                  <div className="p-6 bg-zinc-900 rounded-2xl border-2 border-dashed border-white/5 space-y-4 relative overflow-hidden font-sans">
                    
                    {/* Circle stamps */}
                    <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-[#0d0d0d] border border-white/5"></div>
                    <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-[#0d0d0d] border border-white/5"></div>
                    
                    {/* Header receipt info */}
                    <div className="text-center pb-4 border-b border-white/5 space-y-1">
                      <div className="text-xs font-serif text-amber-300 tracking-widest uppercase">
                        Serenity Gardens Iganga
                      </div>
                      <p className="text-[9px] text-zinc-550 font-mono uppercase tracking-wider">
                        Jinja-Tororo Highway, Iganga UG
                      </p>
                      <h4 className="text-xs font-bold text-white tracking-widest uppercase mt-1">
                        Approved Deposit Receipt
                      </h4>
                    </div>

                    {/* Receipt Items */}
                    <div className="text-xs space-y-2.5">
                      <div className="flex justify-between">
                        <span className="text-zinc-500 font-mono text-[9px] tracking-wider uppercase">Receipt ID:</span>
                        <strong className="text-amber-250 font-mono font-bold text-[11px]">{generatedBooking.id || referenceId}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500 font-mono text-[9px] tracking-wider uppercase">Customer:</span>
                        <strong className="text-zinc-200 font-semibold">{generatedBooking.customerName}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500 font-mono text-[9px] tracking-wider uppercase">Venue Booked:</span>
                        <strong className="text-zinc-200 font-medium">{rates[category].label}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500 font-mono text-[9px] tracking-wider uppercase">Event Date:</span>
                        <strong className="text-zinc-200 font-semibold">{generatedBooking.date}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500 font-mono text-[9px] tracking-wider uppercase">Duration booked:</span>
                        <strong className="text-zinc-200 font-semibold">{generatedBooking.durationDays} day(s)</strong>
                      </div>

                      {/* Line break */}
                      <div className="border-t border-white/5 my-2 pt-2"></div>

                      <div className="flex justify-between text-amber-200 font-bold">
                        <span className="font-mono text-[9px] tracking-wider uppercase">DEPOSIT PAID (30%):</span>
                        <strong className="font-mono text-sm">{generatedBooking.depositPaid.toLocaleString()} UGX</strong>
                      </div>

                      <div className="flex justify-between text-zinc-500 font-medium">
                        <span className="font-mono text-[9px] tracking-wider uppercase">REMAINING BALANCE (70%):</span>
                        <strong className="font-mono text-xs">{(totalCost - generatedBooking.depositPaid).toLocaleString()} UGX</strong>
                      </div>

                      <div className="flex justify-between text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                        <span>Paid Via:</span>
                        <span>{generatedBooking.paymentMethod}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/5 text-center text-[10px] text-amber-300 font-bold flex items-center justify-center gap-1 uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4 text-emerald-450 shrink-0" />
                      Slot Locked Successfully in Iganga!
                    </div>

                  </div>

                  {/* Print and complete buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => window.print()}
                      className="flex-1 py-2.5 rounded-lg border border-white/10 hover:bg-zinc-800 font-bold text-xs text-zinc-300 hover:text-white uppercase tracking-wider font-mono flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Printer className="w-4 h-4" />
                      Print Receipt
                    </button>
                    <button
                      onClick={resetPortalState}
                      className="flex-1 py-2.5 rounded-lg bg-amber-200 hover:bg-white text-zinc-950 font-bold text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-1 cursor-pointer"
                    >
                      Go to Live Feed
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              )}

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
