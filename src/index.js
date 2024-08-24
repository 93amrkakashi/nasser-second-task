import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import StoreProvider from "./providers/StoreProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HelmetProvider } from "react-helmet-async";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StoreProvider>
      <BrowserRouter>
        <HelmetProvider>
          <App />
          <ToastContainer />
        </HelmetProvider>
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>
);
