import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Unlock, Loader2 } from "lucide-react";

const VALID_PIN = "1948";
const PIN_LENGTH = 4;

const Acces = () => {
  const [digits, setDigits] = useState<string[]>(Array(PIN_LENGTH).fill(""));
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    setError(false);

    const next = [...digits];
    next[index] = value;
    setDigits(next);

    if (value && index < PIN_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    // Auto-submit on last digit
    if (value && index === PIN_LENGTH - 1) {
      const pin = next.join("");
      if (pin.length === PIN_LENGTH) {
        validatePin(pin);
      }
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, PIN_LENGTH);
    if (!pasted) return;
    const next = Array(PIN_LENGTH).fill("");
    pasted.split("").forEach((ch, i) => { next[i] = ch; });
    setDigits(next);
    setError(false);
    const focusIdx = Math.min(pasted.length, PIN_LENGTH - 1);
    inputsRef.current[focusIdx]?.focus();
    if (pasted.length === PIN_LENGTH) validatePin(pasted);
  };

  const validatePin = (pin: string) => {
    if (pin === VALID_PIN) {
      setSuccess(true);
      setTimeout(() => navigate("/memorial"), 1200);
    } else {
      triggerError();
    }
  };

  const triggerError = () => {
    setShake(true);
    setError(true);
    setTimeout(() => setShake(false), 600);
    setDigits(Array(PIN_LENGTH).fill(""));
    setTimeout(() => inputsRef.current[0]?.focus(), 650);
  };

  const handleSubmit = () => {
    const pin = digits.join("");
    if (pin.length < PIN_LENGTH) return;
    validatePin(pin);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ backgroundColor: "#FAFAFA" }}>
      {/* Header */}
      <div className="flex flex-col items-center gap-4 mb-12">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-700 ${
          success
            ? "bg-emerald-50 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
            : "bg-amber-50/80 shadow-[0_0_30px_rgba(212,175,55,0.15)]"
        }`}>
          {success ? (
            <Unlock className="w-6 h-6 text-emerald-500 transition-all duration-500" />
          ) : (
            <Lock className="w-6 h-6 transition-all duration-500" style={{ color: "#D4AF37" }} />
          )}
        </div>
        <div className="text-center">
          <h1 className="font-serif-display text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
            Sanctuaire de Jean-Claude Dubois
          </h1>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
            Veuillez saisir le code d'accès à 4 chiffres inscrit sur le chevalet.
          </p>
        </div>
      </div>

      {/* PIN Inputs */}
      <div
        className={`flex gap-3 mb-8 ${shake ? "animate-shake" : ""}`}
        onPaste={handlePaste}
      >
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => { inputsRef.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            disabled={success}
            className={`
              w-14 h-16 text-center text-2xl font-serif-display font-semibold rounded-xl
              bg-white border-2 outline-none transition-all duration-300
              shadow-[0_2px_8px_rgba(0,0,0,0.04)]
              ${error
                ? "border-red-300 text-red-500"
                : digit
                  ? "border-[#D4AF37]/60 shadow-[0_0_12px_rgba(212,175,55,0.1)]"
                  : "border-stone-200 focus:border-[#D4AF37] focus:shadow-[0_0_16px_rgba(212,175,55,0.15)]"
              }
              ${success ? "border-emerald-300 text-emerald-600" : "text-foreground"}
              disabled:opacity-70
            `}
            aria-label={`Chiffre ${i + 1}`}
          />
        ))}
      </div>

      {/* Error message */}
      <div className="h-5 mb-6">
        {error && (
          <p className="text-xs text-red-400 text-center animate-fade-in-up">
            Code incorrect. Veuillez vérifier le chevalet de cérémonie.
          </p>
        )}
      </div>

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={digits.join("").length < PIN_LENGTH || success}
        className={`
          px-8 py-3 rounded-full text-sm font-medium tracking-wide
          transition-all duration-500 disabled:opacity-40 disabled:cursor-not-allowed
          ${success
            ? "bg-emerald-500 text-white shadow-[0_4px_20px_rgba(16,185,129,0.3)]"
            : "text-white hover:shadow-[0_4px_24px_rgba(212,175,55,0.35)] hover:scale-[1.02] active:scale-[0.98]"
          }
        `}
        style={success ? {} : { backgroundColor: "#D4AF37" }}
      >
        {success ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Ouverture…
          </span>
        ) : (
          "Entrer dans le sanctuaire"
        )}
      </button>

      {/* Footer */}
      <p className="absolute bottom-8 text-[11px] text-stone-400 tracking-wide text-center">
        Cet espace est privé et sécurisé par la famille.
      </p>
    </div>
  );
};

export default Acces;
