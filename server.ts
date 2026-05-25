import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API Client safely (Lazy check for GEMINI_API_KEY)
let ai: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("⚠️ GEMINI_API_KEY environment variable is not defined. AI Assistant will operate in simulation mode.");
      throw new Error("GEMINI_API_KEY is required");
    }
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return ai;
}

// Uganda In-Memory Live Reservations Database (Initial pre-populated values for realism and proof of concept)
const bookingsDb = [
  {
    id: "BK-9821",
    customerName: "Diana Namubiru",
    phone: "+256 772 104 883",
    eventType: "gardens",
    eventDetails: "Traditional Kwanjula (Introduction) Ceremony",
    date: "2026-06-12",
    durationDays: 1,
    depositPaid: 450000,
    paymentMethod: "MTN Mobile Money",
    status: "Confirmed",
    timestamp: "2026-05-24T10:15:30Z"
  },
  {
    id: "BK-4322",
    customerName: "Dr. Moses Isabirye (Busoga Medical Council)",
    phone: "+256 701 992 511",
    eventType: "hall",
    eventDetails: "Quarterly Healthcare Symposium & Buffet Lunch",
    date: "2026-06-05",
    durationDays: 1,
    depositPaid: 150000,
    paymentMethod: "Airtel Money",
    status: "Confirmed",
    timestamp: "2026-05-25T08:30:11Z"
  },
  {
    id: "BK-8823",
    customerName: "Peter Ssewankambo",
    phone: "+256 788 349 200",
    eventType: "rooms",
    eventDetails: "Serenity Suite Room Booking",
    date: "2026-05-30",
    durationDays: 3,
    depositPaid: 250000,
    paymentMethod: "Visa Card",
    status: "Confirmed",
    timestamp: "2026-05-25T11:42:00Z"
  }
];

// 1. Booking API Routes
app.get("/api/bookings", (req, res) => {
  res.json({ success: true, count: bookingsDb.length, data: bookingsDb });
});

app.post("/api/bookings", (req, res) => {
  try {
    const { customerName, phone, eventType, eventDetails, date, durationDays, depositPaid, paymentMethod } = req.body;

    if (!customerName || !phone || !eventType || !date) {
      return res.status(400).json({ success: false, error: "Missing required fields: customerName, phone, eventType, date" });
    }

    const newBooking = {
      id: "BK-" + Math.floor(1000 + Math.random() * 9000),
      customerName,
      phone,
      eventType,
      eventDetails: eventDetails || `${eventType.toUpperCase()} Booking`,
      date,
      durationDays: parseInt(durationDays) || 1,
      depositPaid: parseInt(depositPaid) || 0,
      paymentMethod: paymentMethod || "MTN Mobile Money",
      status: "Confirmed",
      timestamp: new Date().toISOString()
    };

    bookingsDb.unshift(newBooking);
    res.status(201).json({ success: true, message: "Booking reserved successfully", data: newBooking });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2. AI Concierge / Assistant endpoint using Gemini 3.5 Flash
app.post("/api/chat", async (req, res) => {
  try {
    const { message, chatHistory } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, error: "Message is required." });
    }

    // System instruction defining everything about Serenity Gardens Iganga
    const systemInstruction = `
You are the official Virtual Assistant for "Serenity Gardens Iganga" (located in Iganga Town, Busoga Sub-region, Eastern Uganda).
Your goal is to friendly, warmly, and professionally answer visitor questions about the venue, prices, amenities, policies, and booking arrangements. Do not make up facts not listed here.

Core Details of Serenity Gardens Iganga:
- Location: Iganga, along the main Jinja-Iganga-Tororo highway. It features beautifully decorated lawns, safe gated parking with security guards, and modern resort style amenities.
- Main Contact: +25651932885 (Call & WhatsApp)
- TikTok Handle: @serenitygardensiganga
- Deposit Policy: A security deposit of at least 30% of the total cost is required via mobile money (MTN Mobile Money or Airtel Money) or Credit / Debit Card to secure and lock any booking. The remaining 70% is cleared upon check-in/arrival.

Venue Offerings & Pricing:
1. Lush Gardens (For Weddings, Kwanjula/Introductions, Graduations, Corporate Cocktails, and Professional Video/Photoshoots):
   - Capacity: Up to 800 guests.
   - Elegant manicured green lawns, botanical pathways, brick archways, majestic palm trees, and two premium white royal gazebos.
   - Price: 1,500,000 UGX flat rate per day (Includes gardens only; tents and chairs are available at extra custom rates).

2. Modern Conference & Hall Meetings (For Corporate board meetings, international symposiums, training sessions):
   - Capacity: Fits up to 150 guests.
   - Amenities: Air conditioning (AC), modern projector & wide projection screens, active PA sound system, executive high-back office chairs, whiteboards, high-speed Wi-Fi.
   - Price: 500,000 UGX per day flat conference room hire, or complete group packages starting at 35,000 UGX per-person (includes room hire, notepad, pen, buffet lunch with bottled water, and 2 premium coffee/tea breaks featuring Ugandan Rolex, samosas, and snacks).

3. Party Hostings Venue (Semi-indoor and outdoor banquet areas for Birthdays, bridal showers, baby showers, social mixers):
   - Capacity: Up to 300 guests.
   - Includes state of the art lighting, audio-system, custom sitting arrangements and private bar access.
   - Price: 800,000 UGX per day flat rate.

4. Guest Rooms (Let Rooms - Comfortable Resort style accommodation):
   - Comfortable Guest Rooms: 45,000 UGX per night.
   - We offer single, twin, and double lodging options.
   - All rooms include: Premium comfy bed with mattress, full-size mosquito net, modern hot-water ensuite/accessible showers, high-speed Wi-Fi, and a complimentary full 3-course catering list: chef-prepared delicious hot local breakfast (such as tea and Rolex), complete chef lunch with soft drinks, and a delightful dinner prepared by our chefs directly at our cozy dining canopy.
   - Located inside a highly secure gated and 24/7 guarded garden perimeter.

Ugandan Local Services & Hospitality:
- In-house bar and dining facility serving delicious Ugandan meals (Luwombo, Matooke, Grilled Goat/Beef Muchomo, Katogo, Rolex) prepared fresh.
- Highly secure with CCTV cameras, robust gating, and physical security guards 24/7.
- Open 24/7 hours for support, arrivals, stays, and meal reservations.
- Dedicated staff of local hostesses, event coordinators, and executive chefs always in service.

Conversation Instructions:
- Adopt a warm, polite, hospitable Ugandan conversational style (e.g. use "You are most welcome!", "webale nnyo!", "Thank you for choosing us!").
- Keep replies helpful, clean, structured, and informative.
- Quote prices clearly in Ugandan Shillings (UGX).
- Recommend visitors to proceed to the "Reservations" tab on the page if they would like to lock in their bookings instantly.
- Keep your answers concise, engaging, and professional. Use formatting like bullet points when listing details.
`;

    // Attempt actual Gemini Call
    try {
      const client = getGeminiClient();
      
      // Let's bundle previous history to provide a persistent context
      const formattedContents: any[] = [];
      
      if (chatHistory && Array.isArray(chatHistory)) {
        chatHistory.slice(-6).forEach((turn: any) => {
          formattedContents.push({
            role: turn.sender === "user" ? "user" : "model",
            parts: [{ text: turn.text }]
          });
        });
      }
      
      formattedContents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      const assistantReply = response.text || "I apologize, I am experiencing a brief communication gap. Please contact us directly at +25651932885.";
      return res.json({ success: true, reply: assistantReply });

    } catch (sdkError: any) {
      console.warn("Gemini API actual key failed or is missing. Using simulated smart booking agent answers.", sdkError);
      
      // Smart Fallback Simulator based on keywords if GEMINI key is not working
      const lowerHex = message.toLowerCase();
      let reply = "";

      if (lowerHex.includes("price") || lowerHex.includes("cost") || lowerHex.includes("how much")) {
        if (lowerHex.includes("garden")) {
          reply = "Our lush, tropical event gardens cost **1,500,000 UGX** per day, hosting up to 800 guests. This provides a stunning botanical setting for weddings, introductions, and photoshoots!";
        } else if (lowerHex.includes("hall") || lowerHex.includes("meeting") || lowerHex.includes("conference")) {
          reply = "The conference hall costs **500,000 UGX** flat per day. Alternatively, our deluxe catering packages are **35,000 UGX** per person, which includes the hall hire, a Ugandan buffet lunch with juice/water, and morning/evening coffee breaks with snacks.";
        } else if (lowerHex.includes("room") || lowerHex.includes("sleep") || lowerHex.includes("reserve bed") || lowerHex.includes("apartment") || lowerHex.includes("lodging")) {
          reply = "We offer extremely comfortable overnight guest lodging let-rooms at only **45,000 UGX** per night. All booking tiers have security and include a complete chef-prepared complimentary package with breakfast, fresh hot lunch with juice/soda, and a premium dinner under our garden dining canopy!";
        } else if (lowerHex.includes("party")) {
          reply = "Our customized party hostings venue is available at a flat rate of **800,000 UGX** per day, while our gourmet event catering plates start at **25,000 UGX** per head. This includes festive lighting, private lounge access, and customized dining setups.";
        } else {
          reply = "Welcome to Serenity Gardens Iganga! Our rates are:\n- **Lush Gardens**: 1,500,000 UGX / day\n- **Conference Hall**: 500,000 UGX / day\n- **Gourmet Catering**: Starting from 25,000 UGX / plate\n- **Comfort Overnight Rooms**: 45,000 UGX / night (Includes full-board Breakfast, Lunch & Dinner!)\n\nYou can book any of these directly using our online reservation tool on this page!";
        }
      } else if (lowerHex.includes("contact") || lowerHex.includes("phone") || lowerHex.includes("call") || lowerHex.includes("whatsapp")) {
        reply = "You can contact Serenity Gardens Iganga directly on **+25651932885** (Phone/WhatsApp) for bookings. We are open 24/7! You can also follow us on TikTok at **@serenitygardensiganga**.";
      } else if (lowerHex.includes("location") || lowerHex.includes("where") || lowerHex.includes("find")) {
        reply = "We are located along the main **Jinja-Tororo Highway in CMS, Iganga Town**. We offer highly secure premises with spacious, physical guard parking spaces. We are open 24 HOURS, 7 DAYS A WEEK!";
      } else if (lowerHex.includes("food") || lowerHex.includes("buffet") || lowerHex.includes("lunch") || lowerHex.includes("eat") || lowerHex.includes("beverage") || lowerHex.includes("dinner") || lowerHex.includes("meals")) {
        reply = "Our in-house gourmet kitchen operates 24/7! We serve steaming authentic Ugandan Luwombo, hot Katogo and Rolex breakfast stews, grilled Muchomo meats, matooke, and tropical fruits. Daily rooms (45,000/=) include breakfast, lunch, and dinner, while event catering plates start at 25,000/=.";
      } else if (lowerHex.includes("deposit") || lowerHex.includes("pay") || lowerHex.includes("mobile money") || lowerHex.includes("airtel") || lowerHex.includes("mtn")) {
        reply = "To secure and lock in your reservation space at Serenity Gardens, we require a **30% deposit**. You can securely make your booking deposit online using Ugandan Mobile Money (MTN MoMo, Airtel Money) or Credit / Debit Cards. The 70% balance is payable on arrival!";
      } else {
        reply = "Webale Nnyo! Welcome to **Serenity Gardens Iganga**. We are Uganda's premium leafy spot for weddings, conferences, parties, and comfortable lodging let rooms. You are highly welcome! Ask me anything about our prices, packages, location, or amenities, or jump directly into booking!";
      }

      return res.json({ success: true, reply, simulated: true });
    }

  } catch (error: any) {
    console.error("Server API Error in Chat:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Serve frontend assets in Dev or Production Mode
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development mode with Vite hmr middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production mode - server statics
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Serenity Gardens Iganga server running at http://localhost:${PORT}`);
  });
}

startServer();
