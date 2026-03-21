import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Download, MoreHorizontal, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockFamilies = [
  { id: 1, name: "Jean-Claude Dubois", created: "15 Fév 2026", emails: ["marie.dubois@email.com", "lucas.dubois@email.com"], status: "Actif" },
  { id: 2, name: "Marguerite Lefèvre", created: "10 Fév 2026", emails: ["paul.lefevre@email.com"], status: "Actif" },
  { id: 3, name: "Henri Martin", created: "02 Fév 2026", emails: ["sophie.martin@email.com", "jean.martin@email.com", "anne.martin@email.com"], status: "Suspendu" },
  { id: 4, name: "Colette Bernard", created: "28 Jan 2026", emails: ["lucas.bernard@email.com"], status: "Actif" },
];

export default function ProRegistre() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="font-serif text-3xl md:text-4xl text-[#2C2C2C] mb-2">Registre des Sanctuaires</h1>
      <p className="text-[#2C2C2C]/60 mb-8">L'ensemble des espaces générés pour vos familles.</p>

      <div className="border border-[#2C2C2C]/8 rounded-xl overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[#2C2C2C]/8 hover:bg-transparent">
              <TableHead className="text-[#2C2C2C]/50 text-xs uppercase tracking-wider font-normal">Défunt</TableHead>
              <TableHead className="text-[#2C2C2C]/50 text-xs uppercase tracking-wider font-normal">Créé le</TableHead>
              <TableHead className="text-[#2C2C2C]/50 text-xs uppercase tracking-wider font-normal">Garant</TableHead>
              <TableHead className="text-[#2C2C2C]/50 text-xs uppercase tracking-wider font-normal">Statut</TableHead>
              <TableHead className="text-[#2C2C2C]/50 text-xs uppercase tracking-wider font-normal text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockFamilies.map((f) => (
              <TableRow
                key={f.id}
                className="border-b border-[#2C2C2C]/5 hover:bg-[#D4AF37]/[0.03] cursor-pointer"
                onClick={() => navigate(`/pro/sanctuaire/${f.id}`)}
              >
                <TableCell className="font-medium text-[#2C2C2C]">{f.name}</TableCell>
                <TableCell className="text-[#2C2C2C]/60">{f.created}</TableCell>
                <TableCell className="text-[#2C2C2C]/60">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="truncate max-w-[180px]">{f.emails[0]}</span>
                    {f.emails.length > 1 && (
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-[#2C2C2C]/[0.06] text-[#2C2C2C]/40 text-[11px] font-medium shrink-0">
                        +{f.emails.length - 1}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    f.status === "Actif" ? "bg-[#D4AF37]/10 text-[#D4AF37]" : "bg-[#2C2C2C]/5 text-[#2C2C2C]/40"
                  }`}>
                    {f.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                   <div className="flex items-center justify-end" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#2C2C2C]/40 hover:text-[#2C2C2C]">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white border-[#2C2C2C]/10">
                        <DropdownMenuItem className="text-[#2C2C2C]/70 cursor-pointer">Suspendre le lien</DropdownMenuItem>
                        <DropdownMenuItem className="text-[#2C2C2C]/70 cursor-pointer">Modifier l'email</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
