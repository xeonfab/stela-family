import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Download, MoreHorizontal, Search, CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { format, parse } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const mockFamilies = [
  { id: 1, name: "Jean-Claude Dubois", created: "15 Fév 2026", createdDate: new Date(2026, 1, 15), emails: ["marie.dubois@email.com", "lucas.dubois@email.com"], status: "Actif" },
  { id: 2, name: "Marguerite Lefèvre", created: "10 Fév 2026", createdDate: new Date(2026, 1, 10), emails: ["paul.lefevre@email.com"], status: "Actif" },
  { id: 3, name: "Henri Martin", created: "02 Fév 2026", createdDate: new Date(2026, 1, 2), emails: ["sophie.martin@email.com", "jean.martin@email.com", "anne.martin@email.com"], status: "Suspendu" },
  { id: 4, name: "Colette Bernard", created: "28 Jan 2026", createdDate: new Date(2026, 0, 28), emails: ["lucas.bernard@email.com"], status: "Actif" },
];

export default function ProRegistre() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();
  const [page, setPage] = useState(1);
  const perPage = 50;

  const filtered = mockFamilies.filter((f) => {
    if (!f.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (dateFrom && f.createdDate < dateFrom) return false;
    if (dateTo) {
      const endOfDay = new Date(dateTo);
      endOfDay.setHours(23, 59, 59, 999);
      if (f.createdDate > endOfDay) return false;
    }
    return true;
  });

  return (
    <div>
      <h1 className="font-serif text-3xl md:text-4xl text-[#2C2C2C] mb-2">Registre des Sanctuaires</h1>
      <p className="text-[#2C2C2C]/60 mb-6">L'ensemble des espaces générés pour vos familles.</p>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#2C2C2C]/30" />
          <input
            type="text"
            placeholder="Rechercher un défunt…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-72 h-10 pl-10 pr-4 rounded-full border border-[#2C2C2C]/[0.1] bg-white text-sm text-[#2C2C2C] placeholder:text-[#2C2C2C]/30 focus:outline-none focus:border-[#2C2C2C]/20 transition-colors"
          />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <button className="h-10 px-4 rounded-full border border-[#2C2C2C]/[0.1] bg-white text-sm text-[#2C2C2C]/60 hover:border-[#2C2C2C]/20 transition-colors flex items-center gap-2">
              <CalendarIcon className="h-3.5 w-3.5 text-[#2C2C2C]/30" />
              {dateFrom ? format(dateFrom, "dd/MM/yyyy") : "Du"}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dateFrom}
              onSelect={setDateFrom}
              locale={fr}
              captionLayout="dropdown-buttons"
              fromYear={2024}
              toYear={2027}
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <button className="h-10 px-4 rounded-full border border-[#2C2C2C]/[0.1] bg-white text-sm text-[#2C2C2C]/60 hover:border-[#2C2C2C]/20 transition-colors flex items-center gap-2">
              <CalendarIcon className="h-3.5 w-3.5 text-[#2C2C2C]/30" />
              {dateTo ? format(dateTo, "dd/MM/yyyy") : "Au"}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dateTo}
              onSelect={setDateTo}
              locale={fr}
              captionLayout="dropdown-buttons"
              fromYear={2024}
              toYear={2027}
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>

        {(dateFrom || dateTo) && (
          <button
            onClick={() => { setDateFrom(undefined); setDateTo(undefined); }}
            className="text-xs text-[#2C2C2C]/40 hover:text-[#2C2C2C]/70 transition-colors"
          >
            Réinitialiser
          </button>
        )}
      </div>

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
            {filtered.slice((page - 1) * perPage, page * perPage).map((f) => (
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
        <div className="flex items-center justify-between px-4 py-3 border-t border-[#2C2C2C]/[0.06]">
          <span className="text-xs text-[#2C2C2C]/40">
            {filtered.length === 0
              ? "Aucun résultat"
              : `${(page - 1) * perPage + 1}–${Math.min(page * perPage, filtered.length)} sur ${filtered.length}`}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-8 h-8 flex items-center justify-center rounded-full text-[#2C2C2C]/40 hover:text-[#2C2C2C]/70 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page * perPage >= filtered.length}
              className="w-8 h-8 flex items-center justify-center rounded-full text-[#2C2C2C]/40 hover:text-[#2C2C2C]/70 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
