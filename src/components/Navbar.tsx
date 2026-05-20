import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const p = pathname.toLowerCase();
  const transparentMode = p === "/memoriallp" || p === "/";

  useEffect(() => {
    if (!transparentMode) return;
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparentMode]);

  const isTransparent = transparentMode && !scrolled;

  return (
    <nav
      className={
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-500 " +
        (isTransparent
          ? "bg-transparent border-b-[0.5px] border-transparent"
          : "backdrop-blur-xl bg-background/80 border-b-[0.5px] border-border/20")
      }
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <span
          className={
            "font-serif-display text-2xl font-bold tracking-tight transition-colors duration-500 " +
            (isTransparent ? "text-white" : "text-foreground")
          }
        >
          Stela
        </span>

        {/* Desktop */}
        <Button
          variant="gold"
          className="hidden md:inline-flex px-6"
        >
          Créer un sanctuaire
        </Button>

        {/* Mobile toggle */}
        <button
          className={"md:hidden " + (isTransparent ? "text-white" : "text-foreground")}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden px-6 pb-4">
          <Button variant="gold" className="w-full">
            Créer un sanctuaire
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
