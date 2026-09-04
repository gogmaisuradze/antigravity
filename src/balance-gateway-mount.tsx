import React from "react";
import { createRoot } from "react-dom/client";
import { GatewayFlow } from "./components/ui/gateway-flow";

export function initBalanceGatewayFlow() {
  const container = document.getElementById("gateway-flow-root");
  if (container && !container.dataset.mounted) {
    container.dataset.mounted = "true";
    const root = createRoot(container);
    root.render(
      <GatewayFlow
        className="w-full h-full"
        backgroundColor="#ffffff"
        lineColor="rgba(0, 0, 0, 0.12)"
        dotColor="#000000"
        speed={1.2}
        density={1.1}
        interactive={true}
      />
    );
  }
}
