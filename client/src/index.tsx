import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";

// root of app
ReactDOM.createRoot(document.getElementById("root")!).render(
  // provider for the global state
  <Provider store={store}>
    <App />
  </Provider>
);
