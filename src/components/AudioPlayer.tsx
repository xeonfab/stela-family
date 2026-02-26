import { Play, Pause } from "lucide-react";

interface AudioPlayerProps {
  duration?: string;
  current?: string;
  size?: "sm" | "md";
  className?: string;
}

/**
 * "Fil d'Or" — Quiet Luxury audio player.
 * Replaces waveform bars with a minimal gold progress line.
 */
const AudioPlayer = ({ duration = "1:24", current = "0:00", size = "md", className = "" }: AudioPlayerProps) => {
  // Parse times to compute progress percentage
  const parseTime = (t: string) => {
    const [m, s] = t.split(":").map(Number);
    return (m || 0) * 60 + (s || 0);
  };
  const totalSec = parseTime(duration);
  const currentSec = parseTime(current);
  const progress = totalSec > 0 ? (currentSec / totalSec) * 100 : 0;
  const isPlaying = currentSec > 0;

  const btnSize = size === "sm" ? "w-7 h-7" : "w-9 h-9";
  const iconSize = size === "sm" ? 10 : 14;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Play button */}
      <button
        className={`${btnSize} rounded-full bg-[#D4AF37] flex items-center justify-center shrink-0 hover:bg-[#C4A030] transition-all duration-300 focus:outline-none ${
          isPlaying ? "shadow-[0_0_12px_-2px_rgba(212,175,55,0.5)] animate-[audioGlow_2s_ease-in-out_infinite]" : "shadow-sm"
        }`}
        onClick={(e) => e.stopPropagation()}
        aria-label={isPlaying ? "Pause" : "Lecture"}
      >
        {isPlaying ? (
          <Pause size={iconSize} className="text-white" fill="currentColor" />
        ) : (
          <Play size={iconSize} className="text-white ml-0.5" fill="currentColor" />
        )}
      </button>

      {/* Gold thread progress */}
      <div className="flex-1 relative h-5 flex items-center">
        {/* Track */}
        <div className="w-full h-[2px] bg-[#EAEAEA] rounded-full relative">
          {/* Filled */}
          <div
            className="absolute left-0 top-0 h-full bg-[#D4AF37] rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
          {/* Thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#D4AF37] shadow-sm transition-all duration-300"
            style={{ left: `calc(${progress}% - 5px)` }}
          />
        </div>
      </div>

      {/* Duration */}
      <span className="text-xs font-mono shrink-0" style={{ color: "#757575" }}>
        {current !== "0:00" ? `${current} / ` : ""}{duration}
      </span>
    </div>
  );
};

export default AudioPlayer;
