import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import StoreProvider from "./providers/StoreProvider";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StoreProvider>
      <BrowserRouter>
        <App />
<ToastContainer />
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>
);
