import { Download, Pencil } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

const billingHistory = [
  { month: "Novembre 2026", sanctuaries: 5, ht: "545,00 €", ttc: "654,00 €", status: "Payée" as const },
  { month: "Octobre 2026", sanctuaries: 3, ht: "357,00 €", ttc: "428,40 €", status: "Payée" as const },
  { month: "Septembre 2026", sanctuaries: 4, ht: "476,00 €", ttc: "571,20 €", status: "En attente" as const },
];

const invoices = [
  { month: "Février 2026", amount: "418,00 € HT", status: "Payée" },
  { month: "Janvier 2026", amount: "297,00 € HT", status: "Payée" },
  { month: "Décembre 2025", amount: "363,00 € HT", status: "Payée" },
];

const tarifs = [
  { label: "Offre Essentiel (Numérique)", price: "39 € HT" },
  { label: "Édition Frêne", price: "119 € HT" },
  { label: "Édition Signature (Noyer)", price: "149 € HT" },
];

export default function ProAgence() {
  const { toast } = useToast();
  return (
    <div className="max-w-5xl">
      <h1 className="font-serif text-3xl md:text-4xl text-[#2C2C2C] mb-2">
        Paramètres de l'agence
      </h1>
      <p className="text-[#2C2C2C]/50 mb-12">
        Gérez vos informations de facturation, votre logistique et vos accès.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── Left Column ── */}
        <div className="flex flex-col gap-6">
          {/* Encours */}
          <Card className="border-[#2C2C2C]/[0.06] shadow-sm">
            <CardContent className="p-8">
              <p className="text-xs uppercase tracking-widest text-[#2C2C2C]/40 mb-6">
                Encours du mois (Mars 2026)
              </p>
              <p className="font-serif text-5xl text-[#C5A66B] leading-none mb-2">
                347,00&nbsp;€
                <span className="text-lg text-[#2C2C2C]/35 ml-1 font-sans">HT</span>
              </p>
              <p className="text-[#2C2C2C]/40 text-sm mb-6">
                Prochain prélèvement automatique le 05 Avril.
              </p>
              <button className="text-[#C5A66B] text-sm hover:underline underline-offset-4 transition-all">
                Voir le détail des sanctuaires générés ce mois-ci
              </button>
            </CardContent>
          </Card>

          {/* Historique */}
          <Card className="border-[#2C2C2C]/[0.06] shadow-sm">
            <CardContent className="p-8">
              <p className="text-xs uppercase tracking-widest text-[#2C2C2C]/40 mb-6">
                Dernières factures
              </p>
              <div className="flex flex-col divide-y divide-[#2C2C2C]/[0.06]">
                {invoices.map((inv) => (
                  <div
                    key={inv.month}
                    className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
                  >
                    <span className="text-sm text-[#2C2C2C]/70">{inv.month}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-[#2C2C2C]/80">
                        {inv.amount}
                      </span>
                      <Badge
                        variant="secondary"
                        className="bg-emerald-50 text-emerald-600 border-0 text-[11px] font-medium px-2 py-0.5"
                      >
                        {inv.status}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-[#2C2C2C]/60 hover:bg-[#2C2C2C] hover:text-white transition-colors"
                        title="Télécharger la facture"
                        onClick={() => toast({ title: "Téléchargement en cours" })}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Right Column ── */}
        <div className="flex flex-col gap-6">
          {/* Établissement & Logistique */}
          <Card className="border-[#2C2C2C]/[0.06] shadow-sm">
            <CardContent className="p-8">
              <p className="text-xs uppercase tracking-widest text-[#2C2C2C]/40 mb-6">
                Établissement & Logistique
              </p>

              <div className="space-y-5">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-[#2C2C2C]/30 mb-1">
                    Adresse de livraison des stèles
                  </p>
                  <p className="text-sm text-[#2C2C2C]/80 leading-relaxed">
                    Pompes Funèbres Dubois
                    <br />
                    12 rue de la Paix, 75002 Paris
                  </p>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-wider text-[#2C2C2C]/30 mb-1">
                    Moyen de paiement
                  </p>
                  <p className="text-sm text-[#2C2C2C]/80">
                    Prélèvement SEPA (IBAN terminant par ...3456)
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                className="mt-8 rounded-xl border-[#2C2C2C]/10 text-[#2C2C2C]/50 hover:text-[#2C2C2C]/80 hover:border-[#2C2C2C]/20 text-sm gap-2"
              >
                <Pencil className="h-3.5 w-3.5" />
                Modifier mes informations
              </Button>
            </CardContent>
          </Card>

          {/* Tarifs Partenaires */}
          <Card className="border-[#2C2C2C]/[0.06] shadow-sm">
            <CardContent className="p-8">
              <p className="text-xs uppercase tracking-widest text-[#2C2C2C]/40 mb-6">
                Vos Tarifs Partenaires (HT)
              </p>
              <div className="flex flex-col divide-y divide-[#2C2C2C]/[0.06]">
                {tarifs.map((t) => (
                  <div
                    key={t.label}
                    className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
                  >
                    <span className="text-sm text-[#2C2C2C]/70">{t.label}</span>
                    <span className="text-sm font-medium text-[#2C2C2C]/80 font-serif">
                      {t.price}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ── Historique de facturation ── */}
      <Card className="border-[#2C2C2C]/[0.06] shadow-sm mt-8">
        <CardContent className="p-8">
          <h2 className="font-serif text-xl text-[#2C2C2C] mb-6">
            Historique des factures
          </h2>
          <Table>
            <TableHeader>
              <TableRow className="border-[#2C2C2C]/[0.06] hover:bg-transparent">
                <TableHead className="text-[11px] uppercase tracking-wider text-[#2C2C2C]/40 font-medium">Mois facturé</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider text-[#2C2C2C]/40 font-medium text-center">Sanctuaires créés</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider text-[#2C2C2C]/40 font-medium text-right">Montant HT</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider text-[#2C2C2C]/40 font-medium text-right">Montant TTC</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider text-[#2C2C2C]/40 font-medium text-center">Statut</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider text-[#2C2C2C]/40 font-medium text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billingHistory.map((row) => (
                <TableRow key={row.month} className="border-[#2C2C2C]/[0.06]">
                  <TableCell className="text-sm text-[#2C2C2C]/80 font-medium">{row.month}</TableCell>
                  <TableCell className="text-sm text-[#2C2C2C]/60 text-center">{row.sanctuaries}</TableCell>
                  <TableCell className="text-sm text-[#2C2C2C]/80 text-right font-serif">{row.ht}</TableCell>
                  <TableCell className="text-sm text-[#2C2C2C]/80 text-right font-serif">{row.ttc}</TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant="secondary"
                      className={
                        row.status === "Payée"
                          ? "bg-emerald-50 text-emerald-600 border-0 text-[11px] font-medium px-2 py-0.5"
                          : "bg-amber-50 text-amber-600 border-0 text-[11px] font-medium px-2 py-0.5"
                      }
                    >
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-[#2C2C2C]/60 hover:bg-[#2C2C2C] hover:text-white transition-colors"
                      title="Télécharger la facture"
                      onClick={() => toast({ title: "Téléchargement en cours" })}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
