import { createContext, useState } from "react";

// 1. Context create karo
export const ThemeContext = createContext();

// 2. ThemeProvider component
const ThemeProvider = ({ children }) => {

  // 3. Theme state
  const [theme, setTheme] = useState("light");

  // 4. Toggle function
  const toggleTheme = () => {
    setTheme((previousTheme) =>
      previousTheme === "light" ? "dark" : "light"
    );
  };

  // 5. Provider
  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;    