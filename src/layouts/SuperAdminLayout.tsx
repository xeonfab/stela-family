import { Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Package,
  Cpu,
  Database,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Vue d'ensemble", path: "/stela-hq", icon: LayoutDashboard },
  { label: "Agences Partenaires", path: "/stela-hq/agences", icon: Building2 },
  { label: "Atelier & Expéditions", path: "/stela-hq/atelier", icon: Package },
  { label: "Appairage NFC", path: "/stela-hq/nfc", icon: Cpu },
  { label: "Sanctuaires & Données", path: "/stela-hq/sanctuaires", icon: Database },
];

export default function SuperAdminLayout() {
  const { pathname } = useLocation();

  const isActive = (path: string) =>
    path === "/stela-hq" ? pathname === path : pathname.startsWith(path);

  return (
    <div className="flex h-screen bg-[#F8F9FA]">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-slate-900 text-slate-300 shrink-0">
        {/* Logo */}
        <div className="h-16 flex items-center gap-2.5 px-5 border-b border-white/5">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="text-white font-semibold tracking-tight">
            Stela HQ
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                isActive(item.path)
                  ? "bg-white/10 text-white font-medium"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-3 pb-4">
          <Link
            to="/stela-hq/login"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-500 hover:text-white hover:bg-white/5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </Link>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 h-14 bg-slate-900 flex items-center justify-between px-4 z-50">
        <span className="text-white font-semibold text-sm">Stela HQ</span>
      </div>

      {/* Content */}
      <main className="flex-1 overflow-y-auto md:p-8 p-4 pt-20 md:pt-8">
        <Outlet />
      </main>
    </div>
  );
}
