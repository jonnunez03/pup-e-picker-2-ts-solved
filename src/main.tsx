import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { App } from "./App";
import { DogContextProvider } from "./Context/DogContextProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <DogContextProvider>
    <React.StrictMode>
      <Toaster />
      <App />
    </React.StrictMode>
  </DogContextProvider>
);
