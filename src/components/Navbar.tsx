import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b-[0.5px] border-border/20">
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <span className="font-serif-display text-2xl font-bold tracking-tight text-foreground">
          Stela
        </span>

        {/* Desktop */}
        <Button
          variant="gold"
          className="hidden md:inline-flex px-6"
        >
          Créer un Mémorial
        </Button>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden px-6 pb-4">
          <Button variant="gold" className="w-full">
            Créer un Mémorial
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
