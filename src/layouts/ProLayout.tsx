import { Link, Outlet, useLocation } from "react-router-dom";
import { PlusCircle, BookOpen, Building2, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const sidebarItems = [
  { id: "creer", label: "Créer un sanctuaire", icon: PlusCircle, path: "/pro/creer" },
  { id: "registre", label: "Registre des familles", icon: BookOpen, path: "/pro/registre" },
  { id: "agence", label: "Mon Agence", icon: Building2, path: "/pro/agence" },
];

// Mock user data – will be replaced by auth context
const agentUser = {
  name: "Pompes Funèbres Dubois",
  email: "contact@pf-dubois.fr",
  initials: "PD",
};

export default function ProLayout() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#FAFAFA" }}>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-[#2C2C2C]/8 bg-[#F5F5F3] px-4 py-6">
        {/* Logo + Badge */}
        <div className="mb-8 px-1">
          <p className="font-serif text-2xl tracking-wide" style={{ color: "#C5A66B" }}>
            Stela
          </p>
          <span className="text-[11px] tracking-widest uppercase text-[#2C2C2C]/35 font-medium">
            Espace Pro
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 flex-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all text-left ${
                isActive(item.path)
                  ? "bg-[#D4AF37]/10 text-[#D4AF37] font-medium"
                  : "text-[#2C2C2C]/50 hover:text-[#2C2C2C]/80 hover:bg-[#2C2C2C]/[0.03]"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User Profile Zone – pinned to bottom */}
        <div className="border-t border-[#2C2C2C]/8 pt-4 mt-4">
          <div className="flex items-center gap-3 px-1 mb-3">
            <Avatar className="h-8 w-8 text-xs">
              <AvatarFallback className="bg-[#D4AF37]/10 text-[#D4AF37] font-medium text-[11px]">
                {agentUser.initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium text-[#2C2C2C]/80 truncate">
                {agentUser.name}
              </p>
              <p className="text-[11px] text-[#2C2C2C]/35 truncate">
                {agentUser.email}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              // Future: auth.signOut()
              window.location.href = "/pro/login";
            }}
            className="flex items-center gap-2 px-3 py-2 w-full rounded-lg text-[13px] text-[#2C2C2C]/40 hover:text-[#2C2C2C]/65 hover:bg-[#2C2C2C]/[0.03] transition-all"
          >
            <LogOut className="h-3.5 w-3.5" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-[#F5F5F3] border-b border-[#2C2C2C]/8 px-3 py-2">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg" style={{ color: "#C5A66B" }}>Stela</span>
            <span className="text-[9px] tracking-widest uppercase text-[#2C2C2C]/35 font-medium">Pro</span>
          </div>
          <button
            onClick={() => { window.location.href = "/pro/login"; }}
            className="text-[#2C2C2C]/40 hover:text-[#2C2C2C]/65"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center gap-1 overflow-x-auto">
          {sidebarItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs whitespace-nowrap transition-all ${
                isActive(item.path)
                  ? "bg-[#D4AF37]/10 text-[#D4AF37] font-medium"
                  : "text-[#2C2C2C]/50"
              }`}
            >
              <item.icon className="h-3.5 w-3.5" />
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 px-6 md:px-16 py-12 md:py-16 mt-14 md:mt-0">
        <Outlet />
      </main>
    </div>
  );
}
