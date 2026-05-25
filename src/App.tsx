import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  TreePine, Landmark, GlassWater, Hotel, Phone, Clock, Mail, 
  MapPin, CheckCircle2, Award, Users, ChevronDown, FlameKindling, ShieldCheck, Sparkles 
} from "lucide-react";

import Navbar from "./components/Navbar";
import SpacesTabs from "./components/SpacesTabs";
import BookingPortal from "./components/BookingPortal";
import ActiveFeed from "./components/ActiveFeed";
import AIConcierge from "./components/AIConcierge";

import { PRICING_PLANS, VENUE_FAQS, GALLERY_SPOTS, VENUE_IMAGES } from "./data";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [preselectedCategory, setPreselectedCategory] = useState<"gardens" | "hall" | "party" | "rooms">("gardens");
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [heroImageTab, setHeroImageTab] = useState<"gardens" | "rooms" | "meals">("gardens");

  const handleSpacesReserveTrigger = (tag: "gardens" | "hall" | "party" | "rooms") => {
    setPreselectedCategory(tag);
    setActiveTab("booking");
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Flower2": return <TreePine className="w-5 h-5 text-emerald-400" />;
      case "Users": return <Users className="w-5 h-5 text-emerald-400" />;
      case "Coffee": return <FlameKindling className="w-5 h-5 text-emerald-400" />;
      default: return <Hotel className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#070707] text-zinc-100 flex flex-col font-sans selection:bg-emerald-400 selection:text-zinc-950" id="serenity-gardens-root">
      
      {/* Complete Header Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* --- HERO SPLIT INTERACTIVE SECTION --- */}
      <div className="relative w-full overflow-hidden bg-[#0d0d0d] border-b border-white/5 pt-10 pb-16 lg:py-24" id="app-hero-header">
        
        {/* Soft elegant linear bottom and radial gradient shroud */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#0d0d0d]/90 to-[#070707]"></div>
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-emerald-950/10 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,_rgba(16,185,129,0.06)_0%,_transparent_55%)]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copywrite details block (7 cols) */}
            <div className="lg:col-span-7 space-y-6 lg:text-left text-center">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 text-xs font-mono uppercase tracking-[0.15em] mx-auto lg:mx-0"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>Premium Botanical & Lodging Escape</span>
              </motion.div>

              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="text-4xl sm:text-6xl font-serif tracking-normal text-white leading-tight"
                >
                  SERENITY <br className="hidden sm:inline" />
                  <span className="text-emerald-400 tracking-wide uppercase font-light text-2xl sm:text-4xl block mt-2 animate-pulse">
                    Gardens Iganga
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="max-w-xl mx-auto lg:mx-0 text-sm sm:text-base text-zinc-350 leading-relaxed font-serif italic"
                >
                  "Where Nature Meets Prestige" — Step into an exquisite green sanctuary situated along the **Jinja-Tororo Highway in CMS, Iganga**. Enjoy weed-free immaculate gardens, modern AC boardroom facilities, lovely introduction (Kwanjula) lawn layouts, and private let rooms.
                </motion.p>
              </div>

              {/* Badges showing location, 24/7 hours and cuisine meals */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 text-[10px] font-mono tracking-wider text-zinc-350"
              >
                <span className="bg-zinc-900 border border-white/5 px-3 py-2 rounded-lg flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  CMS, TORORO HIGHWAY, IGANGA
                </span>
                <span className="bg-emerald-950/40 border border-emerald-500/20 px-3 py-2 rounded-lg flex items-center gap-2 text-emerald-400 font-bold">
                  <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0 animate-spin-slow" />
                  OPEN 24/7 HOURS SUPPORT
                </span>
                <span className="bg-zinc-900 border border-white/5 px-3 py-2 rounded-lg flex items-center gap-2">
                  <GlassWater className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  MEALS: BREAKFAST, LUNCH & DINNER SERVED
                </span>
              </motion.div>

              {/* Main Call to Action buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap justify-center lg:justify-start gap-4"
              >
                <button
                  onClick={() => setActiveTab("booking")}
                  className="px-6 py-3 rounded-xl bg-emerald-400 hover:bg-white text-zinc-950 font-bold text-xs uppercase tracking-widest transition-all hover:scale-[1.02] flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/10"
                >
                  <span>Book Let Room / Garden</span>
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                </button>
                <button
                  onClick={() => setActiveTab("spaces")}
                  className="px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-200 hover:text-white font-bold text-xs uppercase tracking-widest transition-all cursor-pointer"
                >
                  Explore Beautiful Spaces
                </button>
              </motion.div>

              {/* Multi-feature statistics block */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex gap-8 justify-center lg:justify-start pt-4 text-zinc-400"
              >
                <div className="flex flex-col">
                  <span className="text-[8.5px] uppercase text-zinc-500 tracking-[0.2em] font-mono">Overnight Stays</span>
                  <span className="text-lg font-serif italic text-emerald-400 mt-1">45,000/= a night</span>
                </div>
                <div className="w-[1px] h-8 bg-white/10 self-center"></div>
                <div className="flex flex-col">
                  <span className="text-[8.5px] uppercase text-zinc-500 tracking-[0.2em] font-mono">Catering Standard</span>
                  <span className="text-lg font-serif italic text-emerald-400 mt-1">Authentic 3-Course Meals</span>
                </div>
                <div className="w-[1px] h-8 bg-white/10 self-center"></div>
                <div className="flex flex-col">
                  <span className="text-[8.5px] uppercase text-zinc-500 tracking-[0.2em] font-mono">Location Enclave</span>
                  <span className="text-lg font-serif italic text-emerald-400 mt-1">Gated & Guarded CMS</span>
                </div>
              </motion.div>
            </div>

            {/* Right Interactive Visual Showcase Panel - Immediate Pictures on First Page (5 cols) */}
            <div className="lg:col-span-5 w-full flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="w-full max-w-sm rounded-3xl bg-[#0a0a0a] border border-white/10 p-4 shadow-2xl relative group"
              >
                {/* Visual state dot */}
                <div className="absolute top-6 left-6 z-10 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] font-mono font-black tracking-widest text-emerald-450 flex items-center gap-1.5 border border-white/5 uppercase">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>
                    {heroImageTab === "gardens" && "Pristine Gardens View"}
                    {heroImageTab === "rooms" && "Overnight Let-Rooms"}
                    {heroImageTab === "meals" && "Chef Culinary Diners"}
                  </span>
                </div>

                {/* Main Large Image Container */}
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-zinc-950 border border-white/5">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={heroImageTab}
                      src={
                        heroImageTab === "gardens"
                          ? VENUE_IMAGES.gardens
                          : heroImageTab === "rooms"
                          ? VENUE_IMAGES.rooms
                          : VENUE_IMAGES.party
                      }
                      alt="Serenity Gardens Showcase"
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </AnimatePresence>
                  
                  {/* Dynamic caption overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black text-white p-4 pt-10">
                    <p className="text-xs font-serif font-bold text-emerald-400">
                      {heroImageTab === "gardens" && "Immaculate green lawns & royal white gazebos"}
                      {heroImageTab === "rooms" && "Clean comfy overnight cabins - 45,000/= per night"}
                      {heroImageTab === "meals" && "Chef buffets serving hot local Luwombo & Rolex breakfast"}
                    </p>
                  </div>
                </div>

                {/* Grid of Switch Thumbnails - Immediate engagement! */}
                <div className="grid grid-cols-3 gap-2 mt-3.5">
                  <button
                    onClick={() => setHeroImageTab("gardens")}
                    className={`p-1.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      heroImageTab === "gardens"
                        ? "bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold"
                        : "bg-zinc-900 border-white/5 text-zinc-400 hover:text-white"
                    }`}
                  >
                    <span className="text-xs">🌸</span>
                    <span className="text-[8px] font-mono tracking-wider uppercase font-bold">The Gardens</span>
                  </button>

                  <button
                    onClick={() => setHeroImageTab("rooms")}
                    className={`p-1.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      heroImageTab === "rooms"
                        ? "bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold"
                        : "bg-zinc-900 border-white/5 text-zinc-400 hover:text-white"
                    }`}
                  >
                    <span className="text-xs">🛏️</span>
                    <span className="text-[8px] font-mono tracking-wider uppercase font-bold text-center">Overnight</span>
                  </button>

                  <button
                    onClick={() => setHeroImageTab("meals")}
                    className={`p-1.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      heroImageTab === "meals"
                        ? "bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold"
                        : "bg-zinc-900 border-white/5 text-zinc-400 hover:text-white"
                    }`}
                  >
                    <span className="text-xs">🍲</span>
                    <span className="text-[8px] font-mono tracking-wider uppercase font-bold">Rich Meals</span>
                  </button>
                </div>

                <div className="mt-3 text-center">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">
                    Tap thumbnails above to view site pictures
                  </span>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </div>

      {/* --- CORE WEB WRAPPER CANVAS --- */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12" id="main-tabbed-container">
        
        {/* Animated Slide Canvas */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.25 }}
            className="space-y-12"
          >
            
            {/* --- TAB 1: HOME PAGE OVERVIEW --- */}
            {activeTab === "home" && (
              <div className="space-y-16" id="home-view-container">
                
                {/* Visual highlights grid cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="home-overview-features">
                  
                  <div className="p-6 bg-zinc-900/30 rounded-2xl border border-white/5 space-y-4 hover:border-amber-200/20 hover:bg-zinc-900/50 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-amber-200/10 text-amber-200 flex items-center justify-center font-bold">
                      <Award className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-serif font-semibold text-zinc-100">Elite Standards</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                      Our botanical layouts feature immaculate, weed-free luxury green grass, beautifully styled royal gazebos, and brick masonry archways.
                    </p>
                  </div>

                  <div className="p-6 bg-zinc-900/30 rounded-2xl border border-white/5 space-y-4 hover:border-amber-200/20 hover:bg-zinc-900/50 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-amber-200/10 text-amber-200 flex items-center justify-center font-bold">
                      <Landmark className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-serif font-semibold text-zinc-100">Connected Logistics</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                      We offer double backup power diesel generators, large fully secure gated parking, physical security guards, and modern CCTV protection.
                    </p>
                  </div>

                  <div className="p-6 bg-zinc-900/30 rounded-2xl border border-white/5 space-y-4 hover:border-amber-200/20 hover:bg-zinc-900/50 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-amber-200/10 text-amber-200 flex items-center justify-center font-bold">
                      <GlassWater className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-serif font-semibold text-zinc-100">Ugandan Flavours</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                      Enjoy hot local plantain breakfasts, traditional Luwombo, and grilled muchomo meat at our built-in bar, alongside ice-cold beverages.
                    </p>
                  </div>

                </div>

                {/* Deluxe package grids */}
                <div className="space-y-8">
                  <div className="text-center">
                    <h3 className="text-2xl font-serif text-white tracking-widest uppercase">
                      Featured Serenity Rates & Plans
                    </h3>
                    <p className="text-xs text-zinc-400 mt-2 max-w-md mx-auto">
                      Choose standard competitive Ugandan packages mapped with clarity. Reserve instantly and pay deposits using MoMo.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="pricing-plans-grid">
                    {PRICING_PLANS.map((plan) => {
                      const isGreen = plan.id === "p1" || plan.id === "p4";
                      return (
                        <div 
                          key={plan.id}
                          className={`p-6 rounded-2xl border border-white/5 bg-zinc-900/40 hover:bg-zinc-900/80 flex flex-col justify-between space-y-6 shadow-md hover:scale-[1.02] transition-all duration-300 ${
                            isGreen ? "hover:border-emerald-500/35" : "hover:border-amber-200/20"
                          }`}
                        >
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="p-2 bg-zinc-800 rounded-lg border border-white/5 shadow-xs">
                                {getIconComponent(plan.iconName)}
                              </span>
                              <span className={`text-[9px] font-mono font-bold tracking-wider text-right uppercase ${
                                isGreen ? "text-emerald-400" : "text-amber-200"
                              }`}>
                                {plan.capacity}
                              </span>
                            </div>

                            <div className="space-y-1">
                              <h4 className="text-sm font-serif font-bold text-zinc-100 leading-tight">{plan.title}</h4>
                              <p className="text-[11px] text-zinc-400 leading-tight">{plan.subtitle}</p>
                            </div>

                            <div className={`text-base font-bold font-mono ${
                              isGreen ? "text-emerald-400" : "text-amber-200"
                            }`}>
                              {plan.priceTag}
                            </div>

                            <ul className="space-y-2 text-xs text-zinc-400 leading-tight border-t border-white/5 pt-4">
                              {plan.features.slice(0, 4).map((f, i) => (
                                <li key={i} className="flex gap-2 items-start text-[11px]">
                                  <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                                    isGreen ? "text-emerald-400" : "text-amber-300"
                                  }`} />
                                  <span className="text-zinc-300">{f}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <button 
                            onClick={() => {
                              if (plan.id === "p1") handleSpacesReserveTrigger("gardens");
                              else if (plan.id === "p2" || plan.id === "p3") handleSpacesReserveTrigger("hall");
                              else handleSpacesReserveTrigger("rooms");
                            }}
                            className={`w-full py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                              isGreen 
                                ? "bg-emerald-450 hover:bg-white text-zinc-950"
                                : "bg-amber-200 hover:bg-white text-zinc-950"
                            }`}
                          >
                            Book Category
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Visual Gourmet Banner */}
                <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-emerald-950/20 via-zinc-900/60 to-zinc-900/20 border border-emerald-500/20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" id="chef-gourmet-showcase">
                  <div className="lg:col-span-7 space-y-6">
                    <span className="px-3 py-1 bg-emerald-900/50 border border-emerald-500/35 text-emerald-400 font-mono text-[10px] tracking-widest uppercase rounded-full inline-block">
                      🍽️ 24/7 GOURMET MEALS & CATERING
                    </span>
                    <h3 className="text-3xl font-serif text-white tracking-wide">
                      Authentic Ugandan Culinary Delights
                    </h3>
                    <p className="text-sm text-zinc-350 leading-relaxed font-sans">
                      Our elite, in-house chefs operate <strong className="text-emerald-400">24/7</strong> to deliver maximum food freshness. All guests booked in our sleep rooms (45,000/= per night) enjoy free chef-prepared nutritious <strong className="text-white">Breakfast, Lunch and Dinner</strong>. 
                    </p>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      For corporate workshops, Kwanjulas, or wedding parties, we serve customizable rich local meals (steaming Luwombo stews, delicious Matooke, roasting Muchomo, and hot Rolex rolls) starting at only <strong className="text-emerald-400">25,000/= per plate</strong>, served under our ambient dining canopy.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-350">
                      <div className="flex gap-2 items-center bg-zinc-950/40 p-2.5 rounded-xl border border-white/5">
                        <span className="text-emerald-400 text-lg">🍳</span>
                        <span><strong>Breakfast Rolex & Tea</strong> inclusive</span>
                      </div>
                      <div className="flex gap-2 items-center bg-zinc-950/40 p-2.5 rounded-xl border border-white/5">
                        <span className="text-emerald-400 text-lg">🍲</span>
                        <span><strong>Hot Luwombo & Matooke</strong> served</span>
                      </div>
                      <div className="flex gap-2 items-center bg-zinc-950/40 p-2.5 rounded-xl border border-white/5">
                        <span className="text-emerald-400 text-lg">🥩</span>
                        <span><strong>Muchomo Meats</strong> custom ordered</span>
                      </div>
                      <div className="flex gap-2 items-center bg-zinc-950/40 p-2.5 rounded-xl border border-white/5">
                        <span className="text-emerald-400 text-lg">⏰</span>
                        <span><strong>24/7 Kitchen Service</strong> support</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <button 
                        onClick={() => setActiveTab("booking")}
                        className="px-5 py-2.5 bg-emerald-400 hover:bg-white text-zinc-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                      >
                        Book Overnight stays with Meals
                      </button>
                      <button 
                        onClick={() => setActiveTab("assistant")}
                        className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                      >
                        Ask AI Concierge about Pricing
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5 relative">
                    <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden border border-white/10 shadow-xl relative group">
                      <img 
                        src={VENUE_IMAGES.party} 
                        alt="Ugandan buffet cuisine" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                        <p className="text-[10px] font-mono tracking-wider text-emerald-400 font-bold uppercase bg-black/60 px-3 py-1 rounded-full border border-white/5">
                          😋 Authentic Ugandan Buffet Cooking
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FAQ section */}
                <div className="max-w-4xl mx-auto space-y-8">
                  <div className="text-center">
                    <h3 className="text-2xl font-serif text-white tracking-widest uppercase">
                      Frequently Asked Questions
                    </h3>
                    <p className="text-xs text-zinc-400 mt-2">
                      Quick answers about booking, locations, services, and hotel policies in Iganga.
                    </p>
                  </div>

                  <div className="bg-zinc-900/30 rounded-2xl border border-white/5 overflow-hidden divide-y divide-white/5" id="faq-accordions">
                    {VENUE_FAQS.map((faq, idx) => (
                      <div key={idx} className="font-sans">
                        <button
                          onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                          className="w-full p-5 flex items-center justify-between text-left hover:bg-zinc-900/50 transition-colors cursor-pointer"
                        >
                          <span className="text-xs sm:text-sm font-semibold text-zinc-100">{faq.q}</span>
                          <ChevronDown className={`w-4 h-4 text-amber-200 transition-transform ${activeFaq === idx ? "rotate-180" : ""}`} />
                        </button>
                        
                        <AnimatePresence>
                          {activeFaq === idx && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <p className="p-5 text-xs sm:text-sm text-zinc-400 bg-zinc-900/25 leading-relaxed border-t border-white/5 font-serif italic">
                                {faq.a}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* --- TAB 2: EXPLORE SPACES LIST --- */}
            {activeTab === "spaces" && (
              <div className="space-y-6">
                <div className="max-w-3xl">
                  <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-wider uppercase">
                    Our Serene Spaces & Cottages
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed font-sans">
                    View high-definition realistic visual representations of our lush tropical gardens, modern air-conditioned executive meeting boardroom, and comfortable local resort suites.
                  </p>
                </div>
                
                <SpacesTabs onReserve={handleSpacesReserveTrigger} />
              </div>
            )}

            {/* --- TAB 3: RESERVATIONS SECTION --- */}
            {activeTab === "booking" && (
              <div className="space-y-6">
                <div className="max-w-3xl">
                  <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-wider uppercase">
                    Secure Slot Booking
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                    Reserve dates for your upcoming ceremonies or sleeping arrangements. Secure deposit is computed automatically at 30% for validation under the MTN and Airtel MoMo gateways.
                  </p>
                </div>

                <BookingPortal 
                  initialCategory={preselectedCategory} 
                  onBookingSuccess={() => setRefreshCounter(prev => prev + 1)} 
                />
              </div>
            )}

            {/* --- TAB 4: LIVE DEPOSIT FEED --- */}
            {activeTab === "feed" && (
              <div className="space-y-6">
                <div className="max-w-3xl">
                  <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-wider uppercase">
                    Reservations Registrar Feed
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed font-sans">
                    Real-time list of slot allocations registered at Serenity Gardens Iganga. Deposits listed are authorized and verified securely.
                  </p>
                </div>

                <ActiveFeed refreshTrigger={refreshCounter} />
              </div>
            )}

            {/* --- TAB 5: AI STEWARD CHATBOT --- */}
            {activeTab === "assistant" && (
              <div className="space-y-6">
                <div className="max-w-3xl">
                  <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-wider uppercase">
                    Speak with Serenity Concierge
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed font-sans">
                    Chat with our smart botanical concierge assistant below. Ask any questions regarding package details, wedding planning support, transport guides to Iganga, or overnight lodging let rooms.
                  </p>
                </div>

                <AIConcierge />
              </div>
            )}

          </motion.div>
        </AnimatePresence>

      </main>

      {/* --- FOOTER SITE SUMMARY --- */}
      <footer className="bg-[#090909] text-zinc-400 py-16 mt-16 border-t border-white/5" id="app-footer-node">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-zinc-900 border border-white/5 rounded-lg">
                <TreePine className="w-5 h-5 text-emerald-400" />
              </span>
              <strong className="text-sm font-serif tracking-[0.2em] text-white uppercase">
                SERENITY
              </strong>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Uganda's premium green sanctuary designed for beautiful wedding receptions, introductions (Kwanjula), corporate workshops, gala party hostings, and cottage guest rooms.
            </p>
          </div>

          <div className="space-y-3.5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-emerald-400">
              Main Offerings
            </h4>
            <ul className="space-y-1.5 text-xs text-zinc-400 font-sans">
              <li>• Pristine Event Gardens</li>
              <li>• AC Conference Boardroom</li>
              <li>• Gala Dinner Party Lawns</li>
              <li>• Overnight Lodging Let Rooms</li>
            </ul>
            <div className="pt-2.5 border-t border-white/5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-450 font-bold block">
                ⏱️ WORKING HOURS
              </span>
              <span className="text-[11px] text-zinc-350 font-sans block mt-0.5">
                Open 24 Hours, 7 Days a week
              </span>
            </div>
          </div>

          <div className="space-y-3.5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-amber-200/75">
              Contact Channels
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400 font-mono">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-300" />
                <span>+256 519 328 85</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-300" />
                <span>info@serenitygardensiganga.ug</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>CMS, along Tororo Highway, Iganga</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3.5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-amber-200/75">
              TikTok Reel Socials
            </h4>
            <a 
              href="https://www.tiktok.com/@serenitygardensiganga" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-zinc-900 border border-white/10 hover:bg-zinc-800 px-4 py-2.5 rounded-xl text-amber-100 font-bold hover:text-white transition-all text-xs tracking-wider"
            >
              🎵 @serenitygardensiganga
            </a>
            <p className="text-[10px] text-zinc-500 mt-1 leading-normal font-sans">
              Follow our account to view reels of beautiful ceremonies, décor ideas, and guest walkthrough stories!
            </p>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-600 font-mono gap-4 uppercase tracking-wider">
          <span>
            © {new Date().getFullYear()} Serenity Gardens Iganga. Managed by Serenity Estates Group
          </span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-amber-300" />
            Verified Uganda MoMo Registrar Secure Node
          </span>
        </div>
      </footer>

      {/* Floating Sparkly AI Help Steward on lower corner when not on Assistant tab */}
      {activeTab !== "assistant" && (
        <button
          onClick={() => setActiveTab("assistant")}
          className="fixed bottom-6 right-6 p-4 rounded-full bg-amber-200 hover:bg-white text-zinc-950 shadow-xl active:scale-95 transition-all animate-bounce z-40 flex items-center gap-2 border border-amber-300/40 shadow-amber-300/10 font-bold text-xs font-mono uppercase tracking-wider"
          id="floating-ai-agent-trigger"
        >
          <Sparkles className="w-4 h-4 animate-pulse text-zinc-950" />
          <span>Ask AI Helper</span>
        </button>
      )}

    </div>
  );
}
