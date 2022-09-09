import React, { createContext, useState } from "react";
import { themeColors } from "../config";

const initials = {
  theme: { ...themeColors },
};
const ThemeContext = createContext(initials);
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themeColors);

  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
