import React from "react";
import { createRoot } from "react-dom/client";
import { CoverFlowCarousel } from "./components/ui/3-d-coverflow-carousel";

export function initNewsCoverFlow() {
  const container = document.getElementById("news-coverflow-root");
  if (container && !container.dataset.mounted) {
    container.dataset.mounted = "true";
    const root = createRoot(container);
    root.render(<CoverFlowCarousel />);
  }
}
