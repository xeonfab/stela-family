import { Link } from "react-router-dom";
import { Menu, X, BookOpen, Users, Shield, User, Plus, ChevronDown, Flower2, HardDrive } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import portraitImg from "@/assets/jean-claude-portrait-new.jpg";

interface AdminSidebarProps {
  variant?: "dark" | "light";
}

const AdminSidebar = ({ variant = "light" }: AdminSidebarProps) => {
  const isDark = variant === "dark";

  return (
    <Sheet>
      <SheetTrigger asChild>
        {isDark ? (
          <button className="w-9 h-9 flex items-center justify-center rounded-full border border-[#FBF9F6]/20 hover:border-[#FBF9F6]/40 transition-colors bg-[#FBF9F6]/10">
            <Menu size={18} className="text-[#FBF9F6]/70" />
          </button>
        ) : (
          <button className="w-9 h-9 flex items-center justify-center rounded-full border border-stone-200/60 hover:border-stone-300 transition-colors bg-white/80">
            <Menu size={18} className="text-stone-500" />
          </button>
        )}
      </SheetTrigger>
      <SheetContent side="left" className="bg-[#FAF9F6] border-r border-stone-200/40 w-80 p-0 flex flex-col [&>button]:hidden">
        <SheetTitle className="sr-only">Menu administrateur</SheetTitle>

        {/* Custom close button */}
        <button
          onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))}
          className="absolute top-5 right-5 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-stone-100/80 hover:bg-stone-200/80 transition-colors"
        >
          <X size={16} className="text-stone-500" />
        </button>

        {/* ─── Memorial Selector ─── */}
        <div className="px-6 pt-8 pb-2">
          <Collapsible>
            <CollapsibleTrigger className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-stone-100/60 hover:bg-stone-100 transition-colors text-left">
              <Avatar className="w-8 h-8 border border-stone-200/60">
                <AvatarImage src={portraitImg} alt="Jean-Claude Dubois" />
                <AvatarFallback className="text-xs bg-stone-200 text-stone-600">JC</AvatarFallback>
              </Avatar>
              <span className="flex-1 font-serif text-sm font-semibold text-stone-800 truncate">Jean-Claude Dubois</span>
              <ChevronDown size={14} className="text-stone-400 shrink-0" />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 rounded-xl bg-stone-100/40 overflow-hidden">
              <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-stone-100 transition-colors text-left">
                <Avatar className="w-7 h-7 border border-stone-200/60">
                  <AvatarFallback className="text-xs bg-stone-200 text-stone-500">MD</AvatarFallback>
                </Avatar>
                <span className="text-sm text-stone-600">Marie Dubois</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-stone-100 transition-colors text-left border-t border-stone-200/40">
                <div className="w-7 h-7 rounded-full border border-dashed border-stone-300 flex items-center justify-center">
                  <Plus size={12} className="text-stone-400" />
                </div>
                <span className="text-sm text-stone-500">Créer un nouveau mémorial</span>
              </button>
            </CollapsibleContent>
          </Collapsible>
        </div>

        <div className="px-6 py-3">
          <Separator className="bg-stone-200/50" />
        </div>

        {/* ─── Navigation Links ─── */}
        <nav className="flex-1 px-6 flex flex-col">
          <div className="space-y-1">
            <Link to="/memorial-admin" className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-stone-700 hover:bg-stone-100/70 hover:text-stone-900 transition-colors group">
              <Flower2 size={18} strokeWidth={1.5} className="text-stone-500 group-hover:text-stone-700 transition-colors" />
              <span className="text-[15px] font-medium">Mémorial</span>
            </Link>
            <Link to="/kit-ceremonie" className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-stone-700 hover:bg-stone-100/70 hover:text-stone-900 transition-colors group">
              <BookOpen size={18} strokeWidth={1.5} className="text-stone-500 group-hover:text-stone-700 transition-colors" />
              <span className="text-[15px] font-medium">Kit de Cérémonie</span>
            </Link>
            <Link to="/acces" className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-stone-700 hover:bg-stone-100/70 hover:text-stone-900 transition-colors group">
              <Users size={18} strokeWidth={1.5} className="text-stone-500 group-hover:text-stone-700 transition-colors" />
              <span className="text-[15px] font-medium">Gestion des Accès</span>
            </Link>
            <Link to="/confidentialite" className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-stone-700 hover:bg-stone-100/70 hover:text-stone-900 transition-colors group">
              <Shield size={18} strokeWidth={1.5} className="text-stone-500 group-hover:text-stone-700 transition-colors" />
              <span className="text-[15px] font-medium">Confidentialité</span>
            </Link>
          </div>

          {/* Spacer + Mon Profil at bottom */}
          <div className="flex-1" />
          <div className="pb-8">
            <Separator className="bg-stone-200/50 mb-4" />
            <Link to="/profil" className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-stone-700 hover:bg-stone-100/70 hover:text-stone-900 transition-colors group">
              <User size={18} strokeWidth={1.5} className="text-stone-500 group-hover:text-stone-700 transition-colors" />
              <span className="text-[15px] font-medium">Mon Profil</span>
            </Link>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default AdminSidebar;
