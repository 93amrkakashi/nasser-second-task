import React from "react";
import Navbaar from "./components/Nav";
import "./App.css";
import AppRoutes from "./routes";
function App() {
  return (
    <div dir="rtl" className="App">
      <Navbaar />
      <div className="mt-[70px] w-full ">
      <AppRoutes />
      </div>
    </div>
  );
}

export default App;
