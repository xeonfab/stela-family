const Footer = () => (
  <footer className="py-12 border-t-[0.5px] border-border/50">
    <div className="container mx-auto px-6 text-center space-y-4">
      <span className="font-serif-display text-lg font-bold text-foreground">Stela</span>
      <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
        <a href="#" className="hover:text-foreground transition-colors">Contact</a>
        <a href="#" className="hover:text-foreground transition-colors">CGV</a>
        <a href="#" className="hover:text-foreground transition-colors">Mentions Légales</a>
      </div>
      <p className="text-sm text-muted-foreground">© Stela 2024. Tous droits réservés.</p>
    </div>
  </footer>
);

export default Footer;
