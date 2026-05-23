const Navbar = () => {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b-[0.5px] border-border/20"
    >
      <div className="container mx-auto flex items-center h-16 px-6">
        <span className="font-serif-display text-2xl font-bold tracking-tight text-foreground">
          Stela
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
