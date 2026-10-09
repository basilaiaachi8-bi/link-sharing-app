import { createContext, useContext, useState, useEffect } from "react";

const LinkContext = createContext();

export const LinkProvider = ({ children }) => {
  const [links, setLinks] = useState(() => {
    const saved = localStorage.getItem("devlinks_links");
    return saved ? JSON.parse(saved) : [];
  });

  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("devlinks_profile");
    return saved
      ? JSON.parse(saved)
      : { firstName: "", lastName: "", email: "", image: "" };
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const saved = localStorage.getItem("devlinks_auth");
    return saved !== null ? saved === "true" : true;
  });

  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("devlinks_links", JSON.stringify(links));
  }, [links]);

  useEffect(() => {
    localStorage.setItem("devlinks_profile", JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem("devlinks_auth", isAuthenticated ? "true" : "false");
  }, [isAuthenticated]);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  return (
    <LinkContext.Provider
      value={{
        links,
        setLinks,
        profile,
        setProfile,
        isAuthenticated,
        login,
        logout,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </LinkContext.Provider>
  );
};

export const useLinks = () => useContext(LinkContext);
