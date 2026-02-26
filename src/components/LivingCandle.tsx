import { useState } from "react";

const LivingCandle = ({ count, size = 14 }: { count: number; size?: number }) => {
  const [active, setActive] = useState(false);
  const displayCount = active ? count + 1 : count;

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setActive(!active);
      }}
      className={`flex items-center gap-1 transition-colors ${active ? "is-active" : ""}`}
      aria-label="Allumer une flamme"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="living-candle-icon"
      >
        <path
          className="flame-path"
          d="M12 2C12 2 5 9 5 14.5C5 18.6421 8.13401 22 12 22C15.866 22 19 18.6421 19 14.5C19 9 12 2 12 2Z"
          strokeLinejoin="round"
        />
      </svg>
      <span className={`text-xs font-medium transition-colors duration-500 ${active ? "text-[#D4AF37]" : "text-[#2C2C2C]"}`}>
        {displayCount}
      </span>
    </button>
  );
};

export default LivingCandle;
