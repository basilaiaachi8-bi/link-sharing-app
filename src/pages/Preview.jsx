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

export default function Preview({ onBack }) {
  const { links, profile, showToast } = useLinks();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast("The link has been copied to your clipboard!");
  };

  return (
    <div className="min-h-screen bg-light-grey font-sans relative pb-16">
      <div className="hidden sm:block bg-purple h-[357px] rounded-b-[32px] w-full absolute top-0 left-0 z-0" />

      <div className="relative z-10 p-0 sm:p-6 max-w-[1440px] mx-auto">
        <nav className="bg-white sm:rounded-xl px-6 py-4 flex items-center justify-between shadow-sm">
          <button
            onClick={onBack}
            className="border border-purple text-purple hover:bg-light-purple font-semibold px-7 py-3 rounded-lg transition-colors"
          >
            Back to Editor
          </button>

          <button
            onClick={handleCopyLink}
            className="bg-purple hover:bg-purple-hover text-white font-semibold px-7 py-3 rounded-lg transition-colors"
          >
            Share Link
          </button>
        </nav>
      </div>

      <div className="relative z-10 mt-10 sm:mt-16 flex justify-center px-4">
        <div className="bg-white rounded-3xl p-10 sm:shadow-md w-full max-w-[349px] flex flex-col items-center">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-purple mb-6 bg-light-grey flex items-center justify-center">
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

          <h1 className="text-2xl md:text-3xl font-bold text-dark-grey text-center mb-2">
            {profile.firstName || profile.lastName
              ? `${profile.firstName} ${profile.lastName}`
              : "Ben Wright"}
          </h1>

          <p className="text-grey text-base text-center mb-14">
            {profile.email || "ben@example.com"}
          </p>

          <div className="w-full space-y-5">
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
                  className={`w-full p-4 rounded-xl flex items-center justify-between text-white text-base font-medium transition-all ${style.bg}`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={style.icon}
                      alt={item.platform}
                      className="w-5 h-5"
                    />
                    <span>{item.platform}</span>
                  </div>
                  <img
                    src="/assets/images/icon-arrow-right.svg"
                    alt="arrow"
                    className="w-5 h-5"
                  />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
