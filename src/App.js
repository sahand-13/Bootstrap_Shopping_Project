import React from "react";
import Router from "./routes";
import Layout from "./layout";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./styles/root.css";
import { ShoppingProvider } from "./contexts/ShoppingContext";
const App = () => {
  return (
    <ThemeProvider>
      <ShoppingProvider>
        <Layout>
          <Router />
        </Layout>
      </ShoppingProvider>
    </ThemeProvider>
  );
};

export default App;
