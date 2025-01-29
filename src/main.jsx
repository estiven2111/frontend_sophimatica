import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./componets/redux/store.js";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { ThemeProvider } from "./componets/context/themeContext";

// axios.defaults.baseURL = "http://localhost:5000/user/api";
// axios.defaults.baseURL = "https://syncronizabackup-production.up.railway.app/user/api"
// axios.defaults.baseURL =  "http://incentivos.creame.com.co:5000/user/api"
axios.defaults.baseURL =  "https://appincentivos.creame.com.co/user/api"  //todo es esta backend azure
ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
    ,
  </ThemeProvider>
);
