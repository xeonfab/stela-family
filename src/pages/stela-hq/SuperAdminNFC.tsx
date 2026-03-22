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

        {/* Step 0 — Select */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Sélectionner le mémorial
          </label>
          <select
            value={selectedSanctuary}
            onChange={(e) => setSelectedSanctuary(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300"
          >
            <option value="">— Choisir un sanctuaire —</option>
            {MOCK_SANCTUARIES.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
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
