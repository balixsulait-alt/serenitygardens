import { useState } from "react";
import { GALLERY_SPOTS } from "../data";
import { GallerySpot } from "../types";
import { Sparkles, Users, Calendar, ArrowRight, TreePine, Hotel, GlassWater, Landmark } from "lucide-react";

interface SpacesTabsProps {
  onReserve: (tag: "gardens" | "hall" | "party" | "rooms") => void;
}

export default function SpacesTabs({ onReserve }: SpacesTabsProps) {
  const [filter, setFilter] = useState<"all" | "gardens" | "hall" | "party" | "rooms">("all");
  const [selectedSpot, setSelectedSpot] = useState<GallerySpot | null>(null);

  const categories = [
    { id: "all", label: "All Venues", icon: Sparkles },
    { id: "gardens", label: "Lush Gardens", icon: TreePine },
    { id: "hall", label: "Meeting Hall", icon: Landmark },
    { id: "party", label: "Party Hostings", icon: GlassWater },
    { id: "rooms", label: "Let Rooms", icon: Hotel }
  ];

  const filteredSpots = filter === "all" 
    ? GALLERY_SPOTS 
    : GALLERY_SPOTS.filter(s => s.tag === filter);

  return (
    <div className="space-y-8" id="spaces-exploration-root">
      
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-white/5 pb-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              id={`space-filter-${cat.id}`}
              onClick={() => {
                setFilter(cat.id as any);
                setSelectedSpot(null);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer ${
                filter === cat.id
                  ? cat.id === "gardens" || cat.id === "rooms"
                    ? "bg-emerald-400 text-zinc-950 shadow-md shadow-emerald-500/20"
                    : "bg-amber-200 text-zinc-950 shadow-md shadow-amber-200/20"
                  : "bg-zinc-900 text-zinc-400 border border-white/5 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Main Spaces Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="spaces-grid-section">
        {filteredSpots.map((spot) => (
          <div 
            key={spot.id} 
            className="flex flex-col bg-zinc-900/20 rounded-2xl overflow-hidden border border-white/5 hover:border-amber-200/20 transition-all duration-300 group"
          >
            {/* Image Header with Badge */}
            <div className="relative h-64 overflow-hidden bg-zinc-950">
              <img
                src={spot.imageUrl}
                alt={spot.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className={`absolute top-4 left-4 bg-[#0a0a0a]/90 backdrop-blur-xs px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase border border-white/10 tracking-widest ${
                spot.tag === "gardens" || spot.tag === "rooms" ? "text-emerald-400" : "text-amber-200"
              }`}>
                {spot.tag} Venue
              </div>
              <div className={`absolute bottom-4 right-4 px-3 py-1 text-xs font-bold rounded-lg font-mono ${
                spot.tag === "gardens" || spot.tag === "rooms" ? "bg-emerald-400 text-zinc-950" : "bg-amber-200 text-zinc-950"
              }`}>
                {spot.priceNote}
              </div>
            </div>

            {/* Space Description */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-serif text-white mb-2 leading-tight">
                  {spot.title}
                </h3>
                <p className="text-xs text-zinc-400 mb-4 leading-relaxed font-sans">
                  {spot.description}
                </p>

                <div className="flex items-center gap-2 text-xs font-medium text-zinc-300 bg-zinc-900/50 border border-white/5 px-3 py-2 rounded-lg mb-4">
                  <Users className={`w-4 h-4 ${spot.tag === "gardens" || spot.tag === "rooms" ? "text-emerald-300" : "text-amber-300"}`} />
                  <span>Capacity: <strong className="text-white">{spot.capacityText}</strong></span>
                </div>
              </div>

              {/* Action Rows */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-2 mt-auto">
                <button
                  onClick={() => setSelectedSpot(spot)}
                  className={`text-xs font-semibold underline underline-offset-4 cursor-pointer ${
                    spot.tag === "gardens" || spot.tag === "rooms" ? "text-emerald-300 hover:text-white" : "text-amber-200 hover:text-white"
                  }`}
                >
                  View Details
                </button>

                <button
                  onClick={() => onReserve(spot.tag)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold text-xs hover:gap-2 transition-all cursor-pointer ${
                    spot.tag === "gardens" || spot.tag === "rooms" 
                      ? "bg-emerald-400 hover:bg-white text-zinc-950" 
                      : "bg-amber-200 hover:bg-white text-zinc-950"
                  }`}
                >
                  Book Securely
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Expanded Modal Layer */}
      {selectedSpot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs transition-opacity">
          <div className="relative w-full max-w-3xl bg-[#0d0d0d] rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col max-h-[90vh]">
            
            {/* Header image with close */}
            <div className="relative h-64 sm:h-80 bg-zinc-950">
              <img
                src={selectedSpot.imageUrl}
                alt={selectedSpot.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-80"
              />
              <button
                onClick={() => setSelectedSpot(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-black/80 flex items-center justify-center font-bold text-xl transition-all cursor-pointer"
              >
                &times;
              </button>
              <div className="absolute bottom-4 left-4 bg-zinc-900 px-3 py-1 text-xs font-mono font-bold text-amber-200 uppercase rounded-full border border-white/5">
                {selectedSpot.tag} Spaces
              </div>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto space-y-4 max-h-[calc(90vh-20rem)]">
              <h2 className="text-2xl font-serif text-white">
                {selectedSpot.title}
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                <span className="bg-zinc-900 text-amber-200 px-2.5 py-1 rounded-sm font-semibold border border-white/5">
                  Fee: {selectedSpot.priceNote}
                </span>
                <span className="bg-zinc-900 text-zinc-300 px-2.5 py-1 rounded-sm font-semibold border border-white/5">
                  Accommodates: {selectedSpot.capacityText}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                {selectedSpot.fullDescription}
              </p>

              <div className="p-4 bg-zinc-900/30 rounded-xl border border-white/5">
                <h4 className="text-xs font-mono font-bold text-amber-200 uppercase tracking-wider mb-2">
                  What we serve at Serenity Gardens:
                </h4>
                <ul className="text-xs text-zinc-300 space-y-1.5 list-disc pl-5">
                  <li>Pristine secured surroundings with high boundary fences.</li>
                  <li>In-house gourmet catering starting from 25,000 UGX.</li>
                  <li>Heavy-duty standby generators to prevent power dropouts.</li>
                  <li>Experienced event coordinators and hospitable hostesses.</li>
                </ul>
              </div>
            </div>

            {/* Footer triggers */}
            <div className="bg-zinc-900/80 p-4 flex gap-3 justify-end border-t border-white/5">
              <button
                onClick={() => setSelectedSpot(null)}
                className="px-4 py-2 rounded-lg text-xs font-bold uppercase font-mono tracking-widest text-zinc-400 hover:text-white transition-all cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onReserve(selectedSpot.tag);
                  setSelectedSpot(null);
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-200 text-zinc-950 font-bold text-xs uppercase tracking-wider font-mono hover:bg-white transition-all shadow-sm cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                Reserve Space Instantly
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
