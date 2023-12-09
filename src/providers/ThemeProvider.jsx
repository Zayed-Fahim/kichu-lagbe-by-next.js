import ThemeContext from "@/contexts/ThemeContext";
import { useEffect, useState } from "react";

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    let storedTheme = localStorage.getItem("theme");
    if (!storedTheme || !(storedTheme === "dark" || storedTheme === "light")) {
      storedTheme = window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
    }
    setTheme(storedTheme);
  }, []);

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const onChange = (event) => {
      const colorScheme = event.matches ? "light" : "dark";
      setTheme(colorScheme);
    };
    window
      .matchMedia("(prefers-color-scheme: light)")
      .addEventListener("change", onChange);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: light)")
        .removeEventListener("change", onChange);
    };
  }, []);

  const toggleTheme = () => {
    setTheme((previousTheme) => {
      const currentTheme = previousTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", currentTheme);
      return currentTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
