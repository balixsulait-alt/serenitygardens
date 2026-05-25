import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "../types";
import { Send, Sparkles, MessageSquareCode, Phone, User, Landmark, ShieldCheck } from "lucide-react";

export default function AIConcierge() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: "Webale Nnyo! Welcome to Serenity Gardens Iganga. 🌸 I am your virtual assistance helper.",
      timestamp: new Date().toLocaleTimeString()
    },
    {
      id: "welcome-2",
      sender: "bot",
      text: "I can help you with venue hiring rates (gardens and hall meetings), checking guest let-rooms at 45,000/= a night (including free Breakfast, Lunch, and Dinner!), customizable event catering packages, or how to pay your secure booking deposit. What can I help you clear up today?",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const quickQuestions = [
    "What is the price of the Gardens?",
    "Tell me about overnight rooms & meals",
    "How much does event catering cost?",
    "How can I pay my booking deposit?",
    "Where is Serenity Gardens located?"
  ];

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: "msg-" + Date.now(),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          chatHistory: messages
        })
      });

      const data = await response.json();
      
      const botMsg: ChatMessage = {
        id: "msg-bot-" + Date.now(),
        sender: "bot",
        text: data.reply || "I apologize, I am experiencing a brief communication gap. Please contact us directly at +25651932885.",
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error("AI Concierge error:", err);
      const errorMsg: ChatMessage = {
        id: "msg-err-" + Date.now(),
        sender: "bot",
        text: "Mirembe! My automated server is momentarily preparing a drink. Please feel free to call our direct Ugandan number for booking help: +25651932885.",
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#0b0b0b] rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col md:h-[600px] h-[550px]" id="ai-concierge-widget">
      
      {/* Header Panel */}
      <div className="bg-emerald-950/80 border-b border-emerald-500/20 text-white p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-900/40 flex items-center justify-center border border-emerald-500/30 shadow-inner">
            <MessageSquareCode className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-bold text-sm tracking-wide text-emerald-300">
              <span>Serenity AI Assistant</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-450 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
            </div>
            <p className="text-[10px] text-emerald-400/70 font-mono">Powered by Gemini 3.5 Flash • Open 24/7</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-emerald-900/60 px-2.5 py-1 rounded-md border border-emerald-700/50 text-emerald-300">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
          <span>Local Helper</span>
        </div>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-950/40" id="ai-chat-scroller">
        {messages.map((msg) => (
          <div 
            key={msg.id}
            className={`flex items-start gap-2 max-w-[85%] ${
              msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
            }`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-zinc-950 font-bold shadow-xs ${
              msg.sender === "user" ? "bg-emerald-450 text-zinc-950" : "bg-zinc-900 border border-white/10 text-emerald-400"
            }`}>
              {msg.sender === "user" ? <User className="w-4 h-4 text-zinc-950" /> : <Sparkles className="w-3.5 h-3.5" />}
            </div>

            {/* Bubble contents */}
            <div>
              <div className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                msg.sender === "user" 
                  ? "bg-emerald-400 text-zinc-950 rounded-tr-none font-medium" 
                  : "bg-zinc-900 text-zinc-200 rounded-tl-none border border-white/5"
              }`}>
                {msg.text.split("\n").map((line, idx) => (
                  <p key={idx} className={idx > 0 ? "mt-1.5" : ""}>{line}</p>
                ))}
              </div>
              <span className="text-[9px] font-mono text-zinc-500 block mt-1 px-1">
                {msg.timestamp}
              </span>
            </div>

          </div>
        ))}

        {/* Loading/Typing block */}
        {isLoading && (
          <div className="flex items-start gap-2 max-w-[80%] mr-auto animate-pulse">
            <div className="w-8 h-8 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-emerald-400 shrink-0">
              <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
            </div>
            <div className="bg-zinc-900 border border-white/5 p-3 rounded-2xl rounded-tl-none flex items-center gap-1">
              <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-bounce"></span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggested Quick Asked Pills */}
      <div className="p-2 border-t border-white/5 bg-zinc-950 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none" id="ai-quick-links">
        {quickQuestions.map((q, idx) => (
          <button
            key={idx}
            disabled={isLoading}
            onClick={() => handleSendMessage(q)}
            className="text-[10px] font-medium bg-zinc-900 text-zinc-400 hover:bg-emerald-950 hover:text-emerald-300 border border-white/5 px-3 py-1.5 rounded-full transition-colors shrink-0 cursor-pointer disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Interactive Input Panel */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputText);
        }}
        className="p-3 border-t border-white/5 bg-zinc-950 flex gap-2"
        id="ai-concierge-form"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask Serenity AI about pricing, bookings or meals..."
          disabled={isLoading}
          className="flex-1 px-4 py-2 text-xs sm:text-sm bg-[#0a0a0a] border border-white/10 text-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-[#111111] disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="w-10 h-10 rounded-xl bg-emerald-400 text-zinc-950 flex items-center justify-center transition-all hover:bg-white hover:text-zinc-950 active:scale-95 disabled:opacity-40 shrink-0 cursor-pointer"
        >
          <Send className="w-4 h-4 text-zinc-950" />
        </button>
      </form>

    </div>
  );
}
