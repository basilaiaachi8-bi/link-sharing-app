import { useLinks } from "../context/LinkContext";

export default function Header({ activeTab, setActiveTab, onPreview }) {
  return (
    <header className="p-4 md:p-6 bg-light-grey">
      <nav className="bg-white rounded-xl px-4 py-3 md:px-6 md:py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <img
            src="/assets/images/icon-link.svg"
            alt="logo"
            className="w-8 h-8"
          />
          <span className="hidden md:inline font-bold text-2xl text-dark-grey">
            devlinks
          </span>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={() => setActiveTab("links")}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === "links"
                ? "bg-light-purple text-purple"
                : "text-grey hover:text-purple"
            }`}
          >
            <img
              src="/assets/images/icon-links-header.svg"
              alt="links"
              className="w-5 h-5"
            />
            <span className="hidden md:inline">Links</span>
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === "profile"
                ? "bg-light-purple text-purple"
                : "text-grey hover:text-purple"
            }`}
          >
            <img
              src="/assets/images/icon-profile-details-header.svg"
              alt="profile"
              className="w-5 h-5"
            />
            <span className="hidden md:inline">Profile Details</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onPreview}
            className="px-4 py-2 md:px-7 md:py-3 border border-purple text-purple hover:bg-light-purple font-semibold rounded-lg transition-colors"
          >
            <span className="hidden md:inline">Preview</span>
            <img
              src="/assets/images/icon-preview-header.svg"
              alt="preview"
              className="md:hidden w-5 h-5"
            />
          </button>

          <button
            onClick={() => setActiveTab("login")}
            className="text-purple hover:underline font-semibold text-sm px-2"
          >
            Login
          </button>
        </div>
      </nav>
    </header>
  );
}
