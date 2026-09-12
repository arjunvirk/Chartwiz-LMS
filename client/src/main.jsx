import { createRoot } from "react-dom/client";
import "./index.css";
import "./alphira-theme.css";
import "./alphira-boxy.css";
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
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              background: "#ffffff",
              color: "#20251f",
              border: "1px solid #e2e4dc",
              borderRadius: "12px",
              padding: "14px 18px",
              fontFamily: "var(--ac-font-body)",
              fontSize: "14px",
              boxShadow: "0 8px 32px rgba(32,37,31,0.08)",
            },
            success: { iconTheme: { primary: "#35734d", secondary: "#ffffff" } },
            error: { iconTheme: { primary: "#b64040", secondary: "#ffffff" } },
          }}
        />
      </GoogleOAuthProvider>
    </Provider>
  </BrowserRouter>,
);
