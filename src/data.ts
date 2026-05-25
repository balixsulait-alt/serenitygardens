import { GallerySpot, PricingPlan } from "./types";
import gardensImg from "./assets/images/garden_view_main_1779718409861.png";
import hallImg from "./assets/images/meeting_hall_1779717370068.png";
import partyImg from "./assets/images/chef_gourmet_meals_1779718447976.png";
import roomsImg from "./assets/images/room_cozy_overnight_1779718427823.png";

// Explicit generated images saved on current execution
export const VENUE_IMAGES = {
  gardens: gardensImg,
  hall: hallImg,
  party: partyImg,
  rooms: roomsImg
};

export const GALLERY_SPOTS: GallerySpot[] = [
  {
    id: "g1",
    title: "The Royal Eden Gardens",
    description: "Symphony of botanical bliss, lush green neat lawns, exotic palms, and brick walkways.",
    fullDescription: "Our premier botanical garden featuring manicured green carpets, double royal gazebos, vibrant blossom arches, and dramatic background flora. It offers an incredible majestic aesthetic tailored perfectly for Kwanjula introductions, luxury wedding receptions, and professional photoshoots.",
    imageUrl: VENUE_IMAGES.gardens,
    capacityText: "Up to 800 guests",
    priceNote: "1,500,000 UGX flat rate",
    tag: "gardens"
  },
  {
    id: "g2",
    title: "Supreme Executive Meeting Hall",
    description: "Equipped with state-of-the-art acoustics, high-speed Wi-Fi, air conditioning, and projectors.",
    fullDescription: "A gorgeous, high-ceiling modern conference facility designed for high-profile business meetings, training workshops, and healthcare seminars. Includes soft ergonomic leather seating, smart widescreen projection, crisp audio speakers, and dedicated catering options.",
    imageUrl: VENUE_IMAGES.hall,
    capacityText: "Up to 150 participants",
    priceNote: "500,000 UGX per day",
    tag: "hall"
  },
  {
    id: "g3",
    title: "Gourmet Catering & banquet services",
    description: "Perfect traditional Ugandan meals cooked with care, serving delicious breakfast, lunch, and dinner.",
    fullDescription: "Enjoy authentic corporate dining and local delicacies at our twilight gala lawns. We prepare fresh traditional Ugandan Luwombo, hot rolex, matooke, Katogo breakfast stews, grilled muchomo meat, and delightful multiversal catering for guests.",
    imageUrl: VENUE_IMAGES.party,
    capacityText: "Authentic catering plates starting from 25,000 UGX",
    priceNote: "Custom Event Banquet Rates",
    tag: "party"
  },
  {
    id: "g4",
    title: "Overnight Comfort Stays",
    description: "Relaxing overnight rooms for stay. We proudly serve nutritious breakfast, lunch, and dinner!",
    fullDescription: "Clean, comfortable overnight lodging guest rooms situated inside our highly secure, gate-protected botanical resort. Perfectly tailored for business travellers, honeymooners, or event hosts seeking deep rest. All overnight bookings include access to hot water showers, secure parking, and full-course chef breakfasts, lunches, and dinners.",
    imageUrl: VENUE_IMAGES.rooms,
    capacityText: "Single, Twin & Double lodging - 45,000 UGX / night",
    priceNote: "45,000 UGX / night",
    tag: "rooms"
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "p1",
    title: "Lush Gardens Booking",
    subtitle: "For Weddings, Kwanjulas, Photoshoots",
    priceTag: "1,500,000 UGX",
    capacity: "Up to 800 Guests",
    features: [
      "Access to manicured main lawns & pathways",
      "Use of twin royal white gazebos",
      "Guarded parking for up to 60 cars",
      "Full power-backup generator standby",
      "Professional photo session slots included",
      "Dedicated cleaning and sanitation team"
    ],
    bgColor: "bg-emerald-950/20",
    borderColor: "border-emerald-500/20",
    iconName: "Flower2"
  },
  {
    id: "p2",
    title: "Executive Conference Hall",
    subtitle: "For Board Meetings & Trainings",
    priceTag: "500,000 UGX",
    capacity: "Up to 150 Guests",
    features: [
      "Full-blast Air Conditioning (AC)",
      "Smart Projector & Wide 4K Screen",
      "Wireless handheld and lapel microphones",
      "Flipcharts, write boards, markers & blocks",
      "High-speed fiber optic Wi-Fi",
      "Water station & notepad bundle for invitees"
    ],
    bgColor: "bg-zinc-900/40",
    borderColor: "border-white/5",
    iconName: "Users"
  },
  {
    id: "p3",
    title: "Deluxe Day Delegate (Per Head)",
    subtitle: "Full-Day Meeting + Catering + Room Hire",
    priceTag: "35,000 UGX / user",
    capacity: "Min 15, Max 150 Guests",
    features: [
      "Includes Executive Hall Hire & Setup",
      "Mid-morning Ugandan breakfast buffet",
      "Buffet lunch with soft drink or water",
      "Afternoon tea/coffee with local Rolex bites",
      "Flipcharts and stationery for delegates",
      "No separate hidden room-charge"
    ],
    bgColor: "bg-cyan-950/20",
    borderColor: "border-cyan-500/20",
    iconName: "Coffee"
  },
  {
    id: "p4",
    title: "Overnight Guest Room",
    subtitle: "Comfortable Lodging Sleep for a Night",
    priceTag: "45,000 UGX / night",
    capacity: "Single & Double Tiers",
    features: [
      "Comfort rest mattress & neat mosquito net",
      "Nutritious hot Ugandan breakfast included",
      "Chef-prepared delicious rich lunch served",
      "Delectable dinner served at our dining canopy",
      "Located in CMS along the Jinja-Tororo Highway",
      "Deep peaceful rest in fully guarded perimeter"
    ],
    bgColor: "bg-emerald-900/20", // Accentuate our new green request accent on overnight rooms pricing!
    borderColor: "border-emerald-500/30",
    iconName: "Bed"
  }
];

export const VENUE_FAQS = [
  {
    q: "Where is Serenity Gardens located in Iganga?",
    a: "We are specifically located along the main Jinja-Tororo Highway in CMS, Iganga Town. It is an extremely secure, lush, quiet enclave with spacious parking, making it perfect for convenient travel access."
  },
  {
    q: "Are breakfast, lunch, and dinner served for overnight rooms?",
    a: "Yes, definitely! All overnight let rooms priced at 45,000/= a night include full culinary catering. We proudly serve nutritious breakfast, complete hot lunch with drinks, and gourmet dinner prepared by our chefs."
  },
  {
    q: "How can I pay my booking deposit?",
    a: "We require a 30% deposit to lock in any date. You can safely pay this online through MTN Mobile Money, Airtel Money, or credit cards using our easy reservation portal on this website, or pay in person at our office."
  },
  {
    q: "Do you provide catering and tents for events?",
    a: "Our Garden package includes the venue itself. Event food catering, local tents, and elegant chairs are highly customizable through our in-house world-class chefs starting from 25,000 UGX per plate. You are also welcome to bring outside decorators and providers!"
  }
];
