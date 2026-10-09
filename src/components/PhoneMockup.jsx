import { useLinks } from "../context/LinkContext";

const PLATFORM_STYLES = {
  GitHub: { bg: "bg-[#1A1A1A]", icon: "/assets/images/icon-github.svg" },
  YouTube: { bg: "bg-[#EE3939]", icon: "/assets/images/icon-youtube.svg" },
  LinkedIn: { bg: "bg-[#2D68C4]", icon: "/assets/images/icon-linkedin.svg" },
  Facebook: { bg: "bg-[#2442AC]", icon: "/assets/images/icon-facebook.svg" },
  FrontendMentor: {
    bg: "bg-[#FFFFFF] text-[#333333] border border-borders",
    icon: "/assets/images/icon-frontend-mentor.svg",
  },
  CodeWars: { bg: "bg-[#8A1A50]", icon: "/assets/images/icon-codewars.svg" },
  DevTo: { bg: "bg-[#333333]", icon: "/assets/images/icon-devto.svg" },
  freeCodeCamp: {
    bg: "bg-[#302267]",
    icon: "/assets/images/icon-freecodecamp.svg",
  },
};

export default function PhoneMockup() {
  const { links, profile } = useLinks();

  return (
    <div className="hidden lg:flex items-center justify-center bg-white rounded-xl p-10 min-w-[560px]">
      <div className="relative w-[307px] h-[631px] bg-[url('/assets/images/illustration-phone-mockup.svg')] bg-no-repeat bg-center bg-contain p-8 flex flex-col items-center">
        <div className="mt-8 w-24 h-24 rounded-full overflow-hidden bg-[#EEEEEE] flex items-center justify-center border-4 border-purple">
          {profile.image ? (
            <img
              src={profile.image}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-[#EEEEEE]" />
          )}
        </div>

        {profile.firstName || profile.lastName ? (
          <h3 className="mt-6 text-dark-grey font-semibold text-lg max-w-[220px] truncate text-center">
            {profile.firstName} {profile.lastName}
          </h3>
        ) : (
          <div className="mt-6 w-40 h-4 bg-[#EEEEEE] rounded-full" />
        )}

        {profile.email ? (
          <p className="mt-2 text-grey text-sm max-w-[200px] truncate text-center">
            {profile.email}
          </p>
        ) : (
          <div className="mt-3 w-28 h-2 bg-[#EEEEEE] rounded-full" />
        )}

        <div className="mt-12 w-full space-y-5 max-h-[300px] overflow-y-auto pr-1">
          {links.map((item, index) => {
            const style = PLATFORM_STYLES[item.platform] || {
              bg: "bg-[#333333]",
              icon: "/assets/images/icon-link.svg",
            };

            return (
              <a
                key={index}
                href={item.url || "#"}
                target="_blank"
                rel="noreferrer"
                className={`w-full p-4 rounded-lg flex items-center justify-between text-white text-xs font-medium transition-all ${style.bg}`}
              >
                <div className="flex items-center gap-2">
                  <img
                    src={style.icon}
                    alt={item.platform}
                    className="w-4 h-4"
                  />
                  <span>{item.platform || "Platform"}</span>
                </div>
                <img
                  src="/assets/images/icon-arrow-right.svg"
                  alt="arrow"
                  className="w-4 h-4"
                />
              </a>
            );
          })}

          {Array.from({ length: Math.max(0, 5 - links.length) }).map((_, i) => (
            <div key={i} className="w-full h-11 bg-[#EEEEEE] rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
