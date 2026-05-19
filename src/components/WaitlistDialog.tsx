import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface WaitlistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WaitlistDialog = ({ open, onOpenChange }: WaitlistDialogProps) => {
  const [email, setEmail] = useState("");
  const [foyers, setFoyers] = useState("");
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Merci d'indiquer une adresse email valide.");
      return;
    }
    if (!foyers) {
      setError("Merci d'indiquer combien de foyers seraient concernés.");
      return;
    }
    setError("");
    toast({
      title: "Vous êtes sur la liste.",
      description: "Nous vous contacterons dès l'ouverture du Sanctuaire.",
    });
    setEmail("");
    setFoyers("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-background border-[0.5px] border-border rounded-2xl p-8">
        <DialogHeader className="space-y-2 text-left">
          <DialogTitle className="font-serif-display text-2xl font-bold text-foreground">
            Votre Sanctuaire vous attend.
          </DialogTitle>
          <DialogDescription className="italic text-muted-foreground text-sm">
            Nous vous contacterons dès l'ouverture.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-2">
          <div className="space-y-2">
            <Label htmlFor="waitlist-email" className="text-xs tracking-[0.2em] uppercase text-foreground/70">
              Votre adresse email
            </Label>
            <Input
              id="waitlist-email"
              type="email"
              required
              maxLength={255}
              placeholder="prenom@exemple.fr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border-[0.5px]"
            />
          </div>

          <div className="space-y-3">
            <p className="text-xs tracking-[0.2em] uppercase text-foreground/70">
              Combien de foyers dans votre famille seraient concernés ?
            </p>
            <RadioGroup value={foyers} onValueChange={setFoyers} className="space-y-2">
              {[
                { v: "1", l: "Juste moi" },
                { v: "2", l: "2 foyers" },
                { v: "3+", l: "3 foyers ou plus" },
              ].map((o) => (
                <div key={o.v} className="flex items-center gap-3">
                  <RadioGroupItem id={`foyer-${o.v}`} value={o.v} />
                  <Label htmlFor={`foyer-${o.v}`} className="text-sm text-foreground cursor-pointer font-normal">
                    {o.l}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {error && <p className="text-xs text-destructive">{error}</p>}

          <div className="space-y-2">
            <Button type="submit" variant="gold" className="w-full py-6">
              Rejoindre la liste d'attente
            </Button>
            <p className="text-[11px] text-muted-foreground text-center">
              Sans engagement · Vos données restent privées
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WaitlistDialog;