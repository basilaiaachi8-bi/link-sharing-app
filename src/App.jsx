import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import PhoneMockup from "./components/PhoneMockup";
import Links from "./pages/Links";
import Profile from "./pages/Profile";
import Preview from "./pages/Preview";
import { useLinks } from "./context/LinkContext";

export default function App() {
  const [currentPage, setCurrentPage] = useState("links");
  const { toastMessage } = useLinks();

  if (currentPage === "login") {
    return <Login onNavigate={(page) => setCurrentPage(page)} />;
  }

  if (currentPage === "register") {
    return <Register onNavigate={(page) => setCurrentPage(page)} />;
  }

  if (currentPage === "preview") {
    return <Preview onBack={() => setCurrentPage("links")} />;
  }

  return (
    <div className="min-h-screen bg-light-grey flex flex-col font-sans relative pb-10">
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-dark-grey text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 z-50 animate-bounce">
          <img
            src="/assets/images/icon-changes-saved.svg"
            alt="saved"
            className="w-5 h-5"
          />
          <span className="text-sm md:text-base font-semibold">
            {toastMessage}
          </span>
        </div>
      )}

      <Header
        activeTab={currentPage}
        setActiveTab={(tab) => setCurrentPage(tab)}
        onPreview={() => setCurrentPage("preview")}
      />

      <main className="p-4 md:p-6 flex-1 flex gap-6 max-w-[1440px] w-full mx-auto">
        <PhoneMockup />

        {currentPage === "links" && <Links />}
        {currentPage === "profile" && <Profile />}
      </main>
    </div>
  );
}
