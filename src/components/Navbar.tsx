import { useState, useEffect } from "react";
import { Phone, Compass, MessageSquareCode, Calendar, Clock, Sparkles } from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const [ugandanTime, setUgandanTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      // Uganda/Kampala is East Africa Time (EAT), which is UTC + 3
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const eatOffset = 3; 
      const eatDate = new Date(utc + 3600000 * eatOffset);
      
      const timeStr = eatDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      });
      setUgandanTime(timeStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: "home", label: "Overview", icon: Compass },
    { id: "spaces", label: "Explore Spaces", icon: Sparkles },
    { id: "booking", label: "Reserve & Pay", icon: Calendar },
    { id: "feed", label: "Live Reservations", icon: Clock },
    { id: "assistant", label: "AI Concierge", icon: MessageSquareCode },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <div 
            onClick={() => setActiveTab("home")} 
            className="flex flex-col cursor-pointer group"
            id="nav-logo-group"
          >
            <span className="text-xl font-serif tracking-[0.25em] uppercase text-white leading-none group-hover:text-emerald-400 transition-colors">
              Serenity
            </span>
            <span className="text-[9px] tracking-[0.35em] uppercase text-zinc-500 mt-1 ml-0.5 font-bold font-mono">
              GARDENS IGANGA
            </span>
          </div>

          {/* Nav Links Desktop */}
          <nav className="hidden lg:flex items-center gap-1.5" id="nav-desktop-links">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider font-mono transition-all ${
                    activeTab === item.id
                      ? "bg-emerald-950/40 text-emerald-400 border border-emerald-500/20"
                      : "text-zinc-400 hover:text-emerald-400 hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Live Clock & Contact Action */}
          <div className="flex items-center gap-4" id="nav-timer-contact">
            {/* Live EAT Clock */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-white/5 rounded-lg">
              <Clock className="w-4 h-4 text-emerald-400 mr-0.5 animate-spin-slow" style={{ animationDuration: '6s' }} />
              <div className="text-right">
                <span className="text-[8px] block text-zinc-500 uppercase tracking-widest font-mono font-bold leading-none">
                  IGANGA TIME
                </span>
                <span className="text-xs font-mono font-bold text-zinc-200 leading-none">
                  {ugandanTime || "Loading..."}
                </span>
              </div>
            </div>

            {/* Quick Contact Ring */}
            <a
              href="tel:+25651932885"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-450 hover:bg-white text-zinc-950 font-bold uppercase tracking-widest text-xs transition-all shadow-sm cursor-pointer"
              id="nav-contact-button"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Call Reception</span>
              <span className="md:hidden">+256 519 328 85</span>
            </a>
          </div>

        </div>
      </div>
    </header>
  );
}
