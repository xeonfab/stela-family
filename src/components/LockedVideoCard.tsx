import { Lock, Film } from "lucide-react";

export interface LockedVideo {
  thumbnail: string;
  title: string;
  duration: string;
  author: string;
}

interface LockedVideoCardProps {
  video: LockedVideo;
  onClick: () => void;
}

const LockedVideoCard = ({ video, onClick }: LockedVideoCardProps) => {
  return (
    <div
      onClick={onClick}
      className="break-inside-avoid bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 cursor-pointer group hover:shadow-md transition-shadow"
    >
      {/* Blurred thumbnail with lock overlay */}
      <div className="relative">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-48 object-cover blur-md scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-2.5">
          <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center">
            <Lock size={20} className="text-white/90" />
          </div>
          <span className="text-white/80 text-xs tracking-wide">
            Souvenir en attente
          </span>
        </div>
      </div>

      {/* Metadata */}
      <div className="p-5 space-y-1.5">
        <div className="flex items-center gap-2 text-stone-400 text-xs">
          <Film size={12} />
          <span>{video.duration}</span>
        </div>
        <p className="font-serif text-sm text-stone-800">{video.title}</p>
        <span className="text-xs text-stone-400">— {video.author}</span>
      </div>
    </div>
  );
};

export default LockedVideoCard;
