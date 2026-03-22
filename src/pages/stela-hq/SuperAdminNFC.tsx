import { useState, useRef, useEffect } from "react";
import { Cpu, QrCode, CheckCircle2, ChevronLeft, Search, ChevronDown, Check } from "lucide-react";
import { Link } from "react-router-dom";

const MOCK_SANCTUARIES = [
  { id: "s1", name: "Jean-Claude Dubois" },
  { id: "s2", name: "Marie Lefèvre" },
  { id: "s3", name: "Henri Martin" },
];

export default function SuperAdminNFC() {
  const [selectedSanctuary, setSelectedSanctuary] = useState("");
  const [nfcId, setNfcId] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [nfcScanning, setNfcScanning] = useState(false);
  const [qrScanning, setQrScanning] = useState(false);
  const [sanctuaryOpen, setSanctuaryOpen] = useState(false);
  const [sanctuarySearch, setSanctuarySearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredSanctuaries = MOCK_SANCTUARIES.filter((s) =>
    s.name.toLowerCase().includes(sanctuarySearch.toLowerCase())
  );

  const selectedName = MOCK_SANCTUARIES.find((s) => s.id === selectedSanctuary)?.name;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setSanctuaryOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleScanNFC = () => {
    setNfcScanning(true);
    setTimeout(() => {
      setNfcId("NFC-04:F2:1A:9B:3C:7E");
      setNfcScanning(false);
    }, 1500);
  };

  const handleScanQR = () => {
    setQrScanning(true);
    setTimeout(() => {
      setQrCode("STL-2026-JCD-0042");
      setQrScanning(false);
    }, 1500);
  };

  const canConfirm = selectedSanctuary && nfcId && qrCode;

  return (
    <div className="flex flex-col items-center">
      {/* Back link */}
      <div className="w-full max-w-md mb-6">
        <Link
          to="/stela-hq"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Retour au tableau de bord
        </Link>
      </div>

      <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
        {/* Title */}
        <div className="text-center mb-2">
          <h1 className="text-2xl font-semibold text-slate-900">Appairage NFC</h1>
          <p className="text-slate-500 mt-1 text-sm">Associez une puce NFC et un QR code à un sanctuaire.</p>
        </div>

        {/* Step 0 — Select with search */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100" ref={dropdownRef}>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Sélectionner le mémorial
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => { setSanctuaryOpen(!sanctuaryOpen); setSanctuarySearch(""); }}
              className="w-full flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-left focus:outline-none focus:ring-2 focus:ring-slate-300"
            >
              <span className={selectedName ? "text-slate-800" : "text-slate-400"}>
                {selectedName || "— Choisir un sanctuaire —"}
              </span>
              <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
            </button>

            {sanctuaryOpen && (
              <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden">
                <div className="p-2 border-b border-slate-100">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      autoFocus
                      value={sanctuarySearch}
                      onChange={(e) => setSanctuarySearch(e.target.value)}
                      placeholder="Rechercher un sanctuaire…"
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-md border border-slate-100 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-slate-300"
                    />
                  </div>
                </div>
                <div className="max-h-48 overflow-y-auto py-1">
                  {filteredSanctuaries.length === 0 ? (
                    <p className="px-4 py-3 text-sm text-slate-400 text-center">Aucun résultat</p>
                  ) : (
                    filteredSanctuaries.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => { setSelectedSanctuary(s.id); setSanctuaryOpen(false); }}
                        className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors text-left"
                      >
                        {s.name}
                        {selectedSanctuary === s.id && <Check className="w-4 h-4 text-slate-600" />}
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Step 1 — NFC */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">1</div>
            <span className="text-sm font-medium text-slate-700">Scan NFC</span>
          </div>
          <button
            onClick={handleScanNFC}
            disabled={!selectedSanctuary || nfcScanning}
            className="w-full flex items-center justify-center gap-2 bg-slate-800 text-white rounded-lg px-4 py-3 text-sm font-medium hover:bg-slate-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Cpu className="w-4 h-4" />
            {nfcScanning ? "Scan en cours…" : "Lancer le scan NFC"}
          </button>
          <input
            type="text"
            disabled
            value={nfcId || "ID Puce : [En attente de scan]"}
            className="mt-3 w-full rounded-lg border border-slate-100 bg-slate-50 px-4 py-2.5 text-sm text-slate-500 font-mono"
          />
        </div>

        {/* Step 2 — QR */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">2</div>
            <span className="text-sm font-medium text-slate-700">Scan QR Code</span>
          </div>
          <button
            onClick={handleScanQR}
            disabled={!selectedSanctuary || qrScanning}
            className="w-full flex items-center justify-center gap-2 bg-slate-800 text-white rounded-lg px-4 py-3 text-sm font-medium hover:bg-slate-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <QrCode className="w-4 h-4" />
            {qrScanning ? "Scan en cours…" : "Lancer le scan QR code"}
          </button>
          <input
            type="text"
            disabled
            value={qrCode || "Code QR : [En attente de scan]"}
            className="mt-3 w-full rounded-lg border border-slate-100 bg-slate-50 px-4 py-2.5 text-sm text-slate-500 font-mono"
          />
        </div>

        {/* Step 3 — Confirm */}
        <button
          disabled={!canConfirm}
          className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white rounded-full px-6 py-4 text-base font-semibold hover:bg-slate-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed mt-2"
        >
          <CheckCircle2 className="w-5 h-5" />
          Confirmer l'appairage
        </button>
      </div>
    </div>
  );
}
