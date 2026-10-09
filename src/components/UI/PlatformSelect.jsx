import { useState, useRef, useEffect } from "react";

export const PLATFORMS_DATA = [
  {
    name: "GitHub",
    icon: "/assets/images/icon-github.svg",
    bg: "bg-[#1A1A1A]",
  },
  {
    name: "FrontendMentor",
    icon: "/assets/images/icon-frontend-mentor.svg",
    bg: "bg-[#FFFFFF] text-[#333333] border border-borders",
  },
  {
    name: "Twitter",
    icon: "/assets/images/icon-twitter.svg",
    bg: "bg-[#43B7E9]",
  },
  {
    name: "LinkedIn",
    icon: "/assets/images/icon-linkedin.svg",
    bg: "bg-[#2D68C4]",
  },
  {
    name: "YouTube",
    icon: "/assets/images/icon-youtube.svg",
    bg: "bg-[#EE3939]",
  },
  {
    name: "Facebook",
    icon: "/assets/images/icon-facebook.svg",
    bg: "bg-[#2442AC]",
  },
  {
    name: "Twitch",
    icon: "/assets/images/icon-twitch.svg",
    bg: "bg-[#EE3939]",
  },
  { name: "DevTo", icon: "/assets/images/icon-devto.svg", bg: "bg-[#333333]" },
  {
    name: "CodeWars",
    icon: "/assets/images/icon-codewars.svg",
    bg: "bg-[#8A1A50]",
  },
  {
    name: "CodePen",
    icon: "/assets/images/icon-codepen.svg",
    bg: "bg-[#333333]",
  },
  {
    name: "freeCodeCamp",
    icon: "/assets/images/icon-freecodecamp.svg",
    bg: "bg-[#302267]",
  },
  {
    name: "GitLab",
    icon: "/assets/images/icon-gitlab.svg",
    bg: "bg-[#EB4924]",
  },
  {
    name: "Hashnode",
    icon: "/assets/images/icon-hashnode.svg",
    bg: "bg-[#0330D1]",
  },
];

export default function PlatformSelect({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedPlatform =
    PLATFORMS_DATA.find((p) => p.name === value) || PLATFORMS_DATA[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-3 px-4 rounded-lg border border-borders bg-white text-dark-grey flex items-center justify-between focus:border-purple focus:shadow-[0_0_32px_0_rgba(99,60,255,0.25)] transition-all"
      >
        <div className="flex items-center gap-3">
          <img
            src={selectedPlatform.icon}
            alt={selectedPlatform.name}
            className="w-4 h-4"
          />
          <span className="text-base">{selectedPlatform.name}</span>
        </div>
        <img
          src="/assets/images/icon-chevron-down.svg"
          alt="chevron"
          className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white border border-borders rounded-lg shadow-lg z-30 max-h-60 overflow-y-auto divide-y divide-borders">
          {PLATFORMS_DATA.map((plat) => (
            <button
              key={plat.name}
              type="button"
              onClick={() => {
                onChange(plat.name);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-light-grey text-base transition-colors ${
                value === plat.name
                  ? "text-purple font-semibold"
                  : "text-dark-grey"
              }`}
            >
              <img src={plat.icon} alt={plat.name} className="w-4 h-4" />
              <span>{plat.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
