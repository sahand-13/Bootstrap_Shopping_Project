import React from "react";
import Router from "./routes";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./styles/root.css";
import { ShoppingProvider } from "./contexts/ShoppingContext";
import Notistack from "./components/Notistack/Notistack";
const App = () => {
  return (
    <ThemeProvider>
      <ShoppingProvider>
        <Notistack>
          <Router />
        </Notistack>
      </ShoppingProvider>
    </ThemeProvider>
  );
};

export default App;
