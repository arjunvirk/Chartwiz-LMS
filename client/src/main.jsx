import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import store from "./store.js";
import { Toaster } from "react-hot-toast";
import SmoothScroll from "./components/SmoothScroll.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <SmoothScroll>
          <App />
        </SmoothScroll>
        <Toaster position="top-center" reverseOrder={false} />
      </GoogleOAuthProvider>
    </Provider>
  </BrowserRouter>,
);
