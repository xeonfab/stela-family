import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Calendar, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import portraitImg from "@/assets/jean-claude-portrait-new.jpg";

const deceased = {
  firstName: "Jean-Claude",
  lastName: "Dubois",
  birth: "12 mars 1954",
  death: "8 novembre 2026",
};

const ceremony = {
  date: "Samedi 15 novembre 2026",
  time: "10h30",
  lieu: "Église Saint-Roch",
  adresse: "296 Rue Saint-Honoré, 75001 Paris",
};

const existingMessages = [
  { author: "Marie-Thérèse Leroy", text: "Jean-Claude était un homme d'une gentillesse rare. Mes pensées les plus sincères accompagnent toute la famille en ces moments difficiles." },
  { author: "Paul & Françoise Martin", text: "Nous garderons toujours le souvenir de sa générosité et de son sourire chaleureux. Toutes nos condoléances." },
  { author: "Dr. Antoine Mercier", text: "Un homme de convictions et de cœur. Il laisse un vide immense autour de lui. Courage à vous tous." },
];

const MemorialPublic = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(existingMessages);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setMessages((prev) => [{ author: name.trim(), text: message.trim() }, ...prev]);
    setName("");
    setMessage("");
    toast({ title: "Message envoyé", description: "Votre mot de soutien a été transmis à la famille." });
  };

  return (
    <div className="min-h-screen bg-[#F0EBE3] relative">
      {/* Grain SVG */}
      <svg className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03]">
        <filter id="grain-pub"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" /></filter>
        <rect width="100%" height="100%" filter="url(#grain-pub)" />
      </svg>

      <div className="relative z-10 max-w-xl mx-auto px-5 py-12 md:py-20">

        {/* ─── Header ─── */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="mx-auto w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border border-foreground/10 shadow-[0_0_30px_-8px_rgba(0,0,0,0.06)] mb-5">
            <img src={portraitImg} alt={`${deceased.firstName} ${deceased.lastName}`} className="w-full h-full object-cover" />
          </div>
          <h1 className="font-serif-display text-3xl md:text-4xl text-[#2C2C2C] tracking-tight">
            {deceased.firstName} {deceased.lastName}
          </h1>
          <p className="mt-2 text-sm tracking-widest uppercase text-[#2C2C2C]/50 font-sans-body">
            {deceased.birth} — {deceased.death}
          </p>
        </motion.header>

        {/* ─── Bloc 1 : Cérémonie ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-12"
        >
          <Card className="bg-[#FAFAF8] border-foreground/5 shadow-[0_2px_20px_-6px_rgba(0,0,0,0.04)]">
            <CardContent className="p-6 md:p-8">
              <h2 className="font-serif-display text-xl md:text-2xl text-[#2C2C2C] mb-5">
                Cérémonie & Obsèques
              </h2>
              <div className="space-y-3 text-sm text-[#2C2C2C]/75 font-sans-body">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-[#2C2C2C]/40 shrink-0" />
                  <span>{ceremony.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#2C2C2C]/40 shrink-0" />
                  <span>{ceremony.time}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#2C2C2C]/40 shrink-0" />
                  <span>{ceremony.lieu}, {ceremony.adresse}</span>
                </div>
              </div>
              <button className="mt-5 text-xs tracking-wide uppercase text-[#2C2C2C]/50 border border-[#2C2C2C]/15 rounded-full px-5 py-2 hover:bg-[#2C2C2C]/5 transition-colors font-sans-body">
                Voir sur le plan
              </button>
            </CardContent>
          </Card>
        </motion.div>

        {/* ─── Bloc 2 : Registre de condoléances ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-14"
        >
          <h2 className="font-serif-display text-xl md:text-2xl text-[#2C2C2C] mb-5">
            Déposer un mot de soutien
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Votre nom"
              className="bg-[#FAFAF8] border-foreground/10 text-[#2C2C2C] placeholder:text-[#2C2C2C]/35 focus-visible:ring-[#2C2C2C]/20"
            />
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Rédigez votre message à l'attention de la famille…"
              rows={5}
              className="bg-[#FAFAF8] border-foreground/10 text-[#2C2C2C] placeholder:text-[#2C2C2C]/35 resize-none focus-visible:ring-[#2C2C2C]/20"
            />
            <Button
              type="submit"
              disabled={!name.trim() || !message.trim()}
              className="w-full bg-[#2C2C2C] text-[#FAFAFA] hover:bg-[#2C2C2C]/90 rounded-lg h-11 text-sm tracking-wide font-sans-body"
            >
              <Send className="w-4 h-4 mr-2" />
              Envoyer le message
            </Button>
          </form>
        </motion.div>

        {/* ─── Bloc 3 : Mur de soutien ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mb-16"
        >
          <h2 className="font-serif-display text-xl md:text-2xl text-[#2C2C2C] mb-6">
            Messages de soutien
          </h2>
          <div className="space-y-0">
            {messages.map((m, i) => (
              <div key={i}>
                {i > 0 && <Separator className="bg-[#2C2C2C]/8 my-6" />}
                <blockquote className="font-sans-body text-sm text-[#2C2C2C]/70 leading-relaxed italic">
                  "{m.text}"
                </blockquote>
                <p className="mt-2 text-xs font-medium text-[#2C2C2C]/50 tracking-wide uppercase font-sans-body">
                  {m.author}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ─── Footer ─── */}
        <footer className="text-center pt-8 border-t border-[#2C2C2C]/8">
          <span className="font-serif-display text-base text-[#2C2C2C]/40">Stela</span>
          <p className="mt-1 text-[11px] text-[#2C2C2C]/30 font-sans-body tracking-wide">
            Espace d'hommage public géré par la famille.
          </p>
        </footer>

      </div>
    </div>
  );
};

export default MemorialPublic;
