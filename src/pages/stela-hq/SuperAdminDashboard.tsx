import { useNavigate } from "react-router-dom";
import { Cpu } from "lucide-react";

export default function SuperAdminDashboard() {
  const navigate = useNavigate();

  return (
    <div>
      {/* NFC CTA */}
      <button
        onClick={() => navigate("/stela-hq/appairage")}
        className="flex items-center justify-center gap-3 bg-slate-900 text-white rounded-full w-full md:w-auto px-8 py-4 mb-8 text-base font-semibold hover:bg-slate-800 transition-colors"
      >
        <Cpu className="w-5 h-5" />
        Appairage NFC
      </button>

      <div className="rounded-xl bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Vue d'ensemble</h1>
        <p className="text-slate-500 mt-2">Tableau de bord principal du back-office Stela.</p>
      </div>
    </div>
  );
}
