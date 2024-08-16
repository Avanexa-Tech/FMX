import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./scss/index.scss";
import { ConfigProvider } from "antd";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Helvetica",
          colorPrimary: "#4085F6",
        },
      }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>
);
