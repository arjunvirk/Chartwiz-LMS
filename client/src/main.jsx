import { createRoot } from "react-dom/client";
import "./index.css";
import "./alphira-tokens.css";
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
            duration: 4000,
            className: "ac-toast",
            style: {
              background: "var(--ac-moss-900)",
              color: "var(--ac-white)",
              border: "1px solid var(--ac-moss-800)",
              borderRadius: 0,
              padding: "12px 16px",
              fontFamily: "var(--ac-font-body)",
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: 1.45,
              maxWidth: "min(420px, calc(100vw - 32px))",
              boxShadow: "var(--ac-shadow-lg)",
            },
            success: { iconTheme: { primary: "#a0b88a", secondary: "#20251f" } },
            error: { iconTheme: { primary: "#e08a7f", secondary: "#20251f" } },
          }}
        />
      </GoogleOAuthProvider>
    </Provider>
  </BrowserRouter>,
);

