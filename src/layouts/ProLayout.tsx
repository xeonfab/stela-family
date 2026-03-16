import { Link, Outlet, useLocation } from "react-router-dom";
import { PlusCircle, BookOpen, Building2, ChevronLeft } from "lucide-react";

const sidebarItems = [
  { id: "creer", label: "Créer un sanctuaire", icon: PlusCircle, path: "/pro/creer" },
  { id: "registre", label: "Registre des familles", icon: BookOpen, path: "/pro/registre" },
  { id: "agence", label: "Mon Agence", icon: Building2, path: "/pro/agence" },
];

export default function ProLayout() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#FAFAFA" }}>
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-[#2C2C2C]/8 bg-[#F5F5F3] px-4 py-8">
        <p className="font-serif text-lg text-[#2C2C2C] mb-8">Espace Pro</p>
        <nav className="flex flex-col gap-1">
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
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-[#F5F5F3] border-b border-[#2C2C2C]/8 flex items-center gap-1 px-3 py-2 overflow-x-auto">
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

      {/* Content */}
      <main className="flex-1 px-6 md:px-16 py-12 md:py-16 mt-12 md:mt-0">
        <Outlet />
      </main>
    </div>
  );
}
