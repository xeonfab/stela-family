import { useState } from "react";

const LivingHeart = ({ count, size = 14 }: { count: number; size?: number }) => {
  const [active, setActive] = useState(false);
  const displayCount = active ? count + 1 : count;

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setActive(!active);
      }}
      className={`flex items-center gap-1 transition-colors ${active ? "is-active" : ""}`}
      aria-label="Apporter son soutien"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="living-heart-icon"
      >
        <path
          className="heart-path"
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
      <span className={`text-xs font-medium transition-colors duration-500 ${active ? "text-[#D4AF37]" : "text-[#2C2C2C]"}`}>
        {displayCount}
      </span>
    </button>
  );
};

export default LivingHeart;
