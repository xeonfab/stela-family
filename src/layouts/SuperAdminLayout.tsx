import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Handshake,
  ShoppingCart,
  Database,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Vue d'ensemble", path: "/stela-hq", icon: LayoutDashboard },
  { label: "Partenaires", path: "/stela-hq/partenaires", icon: Handshake },
  { label: "Commandes", path: "/stela-hq/commandes", icon: ShoppingCart },
  { label: "Sanctuaires & Données", path: "/stela-hq/sanctuaires", icon: Database },
];

export default function SuperAdminLayout() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) =>
    path === "/stela-hq" ? pathname === path : pathname.startsWith(path);

  return (
    <div className="flex h-screen bg-[#F8F9FA]">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-slate-900 text-slate-300 shrink-0">
        <div className="h-16 flex items-center gap-2.5 px-5 border-b border-white/5">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="text-white font-semibold tracking-tight">Stela HQ</span>
        </div>

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

      {/* Mobile TopBar */}
      <div className="md:hidden fixed top-0 inset-x-0 h-14 bg-slate-900 flex items-center justify-between px-4 z-50">
        <span className="text-white font-semibold text-sm">Stela HQ</span>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 top-14 bg-black/40 z-40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="md:hidden fixed top-14 inset-x-0 bg-slate-900 border-t border-white/5 z-50 shadow-xl">
            <nav className="py-2 px-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors",
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
            <div className="px-3 pb-3 border-t border-white/5 pt-2">
              <Link
                to="/stela-hq/login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-slate-500 hover:text-white hover:bg-white/5 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Déconnexion
              </Link>
            </div>
          </div>
        </>
      )}

      {/* Content */}
      <main className="flex-1 overflow-y-auto md:p-8 p-4 pt-20 md:pt-8">
        <Outlet />
      </main>
    </div>
  );
}
