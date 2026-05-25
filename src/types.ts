// TypeScript Shared Types for Serenity Gardens Iganga

export interface Booking {
  id?: string;
  customerName: string;
  phone: string;
  eventType: "gardens" | "hall" | "party" | "rooms";
  eventDetails?: string;
  date: string;
  durationDays: number;
  depositPaid: number;
  paymentMethod: string;
  status?: string;
  timestamp?: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

export interface PricingPlan {
  id: string;
  title: string;
  subtitle: string;
  priceTag: string;
  features: string[];
  capacity: string;
  bgColor: string;
  borderColor: string;
  iconName: string;
}

export interface GallerySpot {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  imageUrl: string;
  capacityText: string;
  priceNote: string;
  tag: "gardens" | "hall" | "party" | "rooms";
}
