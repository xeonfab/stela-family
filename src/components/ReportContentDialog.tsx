import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const REPORT_REASONS = [
  "Contenu haineux ou violent",
  "Harcèlement ou intimidation",
  "Contenu sexuel ou pornographique",
  "Spam ou contenu indésirable",
  "Diffamation ou atteinte à la vie privée",
  "Contrefaçon ou atteinte aux droits d'auteur",
  "Autre raison",
];

interface ReportContentDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

const ReportContentDialog = ({ open, onOpenChange }: ReportContentDialogProps) => {
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = () => {
    onOpenChange(false);
    setReason("");
    setDetails("");
    toast("Merci pour votre signalement. Nos équipes vont l'examiner.");
  };

  const handleCancel = () => {
    onOpenChange(false);
    setReason("");
    setDetails("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-[#FAF9F6] border-stone-200 rounded-2xl">
        <DialogTitle className="font-serif text-xl text-stone-900">
          Signaler un contenu
        </DialogTitle>

        <p className="text-sm text-stone-500 leading-relaxed">
          Veuillez sélectionner la raison de votre signalement pour nous aider à modérer le contenu de manière appropriée.
        </p>

        <RadioGroup value={reason} onValueChange={setReason} className="space-y-2 mt-2">
          {REPORT_REASONS.map((r) => (
            <div key={r} className="flex items-center gap-3">
              <RadioGroupItem value={r} id={r} />
              <Label htmlFor={r} className="text-sm text-stone-700 cursor-pointer font-normal">
                {r}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <div className="mt-3 space-y-1.5">
          <Label className="text-sm text-stone-600">Détails supplémentaires (optionnel)</Label>
          <Textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Précisez votre signalement si nécessaire…"
            className="min-h-[80px] bg-white border-stone-200 text-sm resize-none"
          />
        </div>

        <div className="flex items-center justify-end gap-3 mt-4">
          <Button variant="outline" onClick={handleCancel} className="rounded-full border-stone-300 text-stone-600">
            Annuler
          </Button>
          <Button
            disabled={!reason}
            onClick={handleSubmit}
            className="btn-gold-jewel rounded-full text-white font-semibold tracking-[0.05em] disabled:opacity-40"
          >
            Envoyer le signalement
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportContentDialog;
