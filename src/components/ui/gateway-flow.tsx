import React, { useEffect, useRef } from "react";

export interface GatewayFlowProps {
  className?: string;
  backgroundColor?: string;
  lineColor?: string;
  dotColor?: string;
  speed?: number;
  density?: number;
  interactive?: boolean;
}

interface PathDefinition {
  p0: { x: number; y: number };
  cp1: { x: number; y: number };
  cp2: { x: number; y: number };
  p1: { x: number; y: number };
  length: number;
}

interface DotParticle {
  pathIndex: number;
  progress: number;
  speed: number;
  size: number;
  alpha: number;
  tailLength: number;
}

export const GatewayFlow: React.FC<GatewayFlowProps> = ({
  className = "",
  backgroundColor = "#ffffff",
  lineColor = "rgba(0, 0, 0, 0.12)",
  dotColor = "#000000",
  speed = 1.0,
  density = 1.0,
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    active: false,
    targetX: 0,
    targetY: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio || 800);
    let height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio || 500);

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = canvas.width = Math.floor(rect.width * dpr);
      height = canvas.height = Math.floor(rect.height * dpr);
      generatePaths();
    };

    let paths: PathDefinition[] = [];
    let dots: DotParticle[] = [];

    // Cubic bezier position calculation
    const getCubicBezierPoint = (
      p0: { x: number; y: number },
      cp1: { x: number; y: number },
      cp2: { x: number; y: number },
      p1: { x: number; y: number },
      t: number
    ) => {
      const u = 1 - t;
      const tt = t * t;
      const uu = u * u;
      const uuu = uu * u;
      const ttt = tt * t;

      return {
        x: uuu * p0.x + 3 * uu * t * cp1.x + 3 * u * tt * cp2.x + ttt * p1.x,
        y: uuu * p0.y + 3 * uu * t * cp1.y + 3 * u * tt * cp2.y + ttt * p1.y,
      };
    };

    const generatePaths = () => {
      paths = [];
      dots = [];

      const w = width;
      const h = height;
      const centerX = w * 0.5;
      const centerY = h * 0.52;
      const gatewayWidth = Math.min(w * 0.42, 360 * (window.devicePixelRatio || 1));
      const gatewayHeight = Math.min(h * 0.5, 240 * (window.devicePixelRatio || 1));

      // 1. Horizontal / Converging Perspective Streamlines
      const streamCount = Math.floor(18 * density);
      for (let i = 0; i < streamCount; i++) {
        const side = i % 2 === 0 ? -1 : 1;
        const progressY = i / streamCount;
        
        // Start from left or right edge
        const startX = side === -1 ? -w * 0.05 : w * 1.05;
        const startY = h * 0.15 + progressY * h * 0.75;

        // End in gateway focal center or opposite flow
        const endX = centerX + side * (gatewayWidth * 0.5 * (1 - progressY * 0.6));
        const endY = centerY + (progressY - 0.5) * gatewayHeight * 0.85;

        // Curved control points for dynamic graceful gateway arching
        const cp1X = startX + (centerX - startX) * 0.4;
        const cp1Y = startY + (side * 40 * (window.devicePixelRatio || 1));
        const cp2X = centerX - side * (gatewayWidth * 0.3);
        const cp2Y = endY - (40 * (window.devicePixelRatio || 1));

        paths.push({
          p0: { x: startX, y: startY },
          cp1: { x: cp1X, y: cp1Y },
          cp2: { x: cp2X, y: cp2Y },
          p1: { x: endX, y: endY },
          length: Math.hypot(endX - startX, endY - startY),
        });
      }

      // 2. Gateway Arch Portal Curves (Center converging geometry)
      const archCount = Math.floor(8 * density);
      for (let i = 0; i < archCount; i++) {
        const span = (i + 1) / archCount;
        const archW = gatewayWidth * (0.3 + span * 0.7);
        const archTopY = centerY - gatewayHeight * 0.5 * (0.4 + span * 0.6);
        const bottomY = centerY + gatewayHeight * 0.55;

        // Left-to-Right Arch
        paths.push({
          p0: { x: centerX - archW * 0.5, y: bottomY },
          cp1: { x: centerX - archW * 0.45, y: archTopY },
          cp2: { x: centerX + archW * 0.45, y: archTopY },
          p1: { x: centerX + archW * 0.5, y: bottomY },
          length: archW * 2,
        });

        // Downward Converging Gateway Funnel Streams
        paths.push({
          p0: { x: centerX - archW * 0.6, y: -h * 0.05 },
          cp1: { x: centerX - archW * 0.3, y: centerY * 0.6 },
          cp2: { x: centerX - (i * 12), y: centerY },
          p1: { x: centerX, y: centerY + (i * 8) },
          length: h,
        });
        paths.push({
          p0: { x: centerX + archW * 0.6, y: -h * 0.05 },
          cp1: { x: centerX + archW * 0.3, y: centerY * 0.6 },
          cp2: { x: centerX + (i * 12), y: centerY },
          p1: { x: centerX, y: centerY + (i * 8) },
          length: h,
        });
      }

      // 3. Ground Perspective Lines (flowing into the distance)
      const groundLines = Math.floor(10 * density);
      for (let i = 0; i < groundLines; i++) {
        const spread = (i / (groundLines - 1) - 0.5) * 2;
        paths.push({
          p0: { x: centerX + spread * w * 0.55, y: h * 1.05 },
          cp1: { x: centerX + spread * w * 0.35, y: h * 0.85 },
          cp2: { x: centerX + spread * gatewayWidth * 0.4, y: centerY + gatewayHeight * 0.4 },
          p1: { x: centerX + spread * gatewayWidth * 0.15, y: centerY + gatewayHeight * 0.1 },
          length: h * 0.6,
        });
      }

      // Initialize moving dots along each generated path
      const dotsPerPath = Math.max(2, Math.floor(3 * density));
      paths.forEach((_, pathIdx) => {
        for (let d = 0; d < dotsPerPath; d++) {
          dots.push({
            pathIndex: pathIdx,
            progress: Math.random(),
            speed: (0.0008 + Math.random() * 0.0016) * speed,
            size: (1.6 + Math.random() * 2.2) * (window.devicePixelRatio || 1),
            alpha: 0.5 + Math.random() * 0.45,
            tailLength: 0.03 + Math.random() * 0.04,
          });
        }
      });
    };

    generatePaths();
    window.addEventListener("resize", resize);

    // Mouse tracking for subtle interactive deflection
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      mouseRef.current.targetX = (e.clientX - rect.left) * dpr;
      mouseRef.current.targetY = (e.clientY - rect.top) * dpr;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Render Animation Loop
    let lastTime = performance.now();

    const render = (time: number) => {
      const delta = Math.min((time - lastTime) / 16.666, 2.0);
      lastTime = time;

      // Smooth mouse interpolation
      if (mouseRef.current.active) {
        mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
        mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;
      }

      // Clear & Draw Background (White / inverted)
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      // Subtle ambient vignette / depth gradient in white-to-soft-cream
      const radialGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.52,
        Math.min(width, height) * 0.1,
        width * 0.5,
        height * 0.52,
        Math.max(width, height) * 0.75
      );
      radialGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
      radialGrad.addColorStop(1, "rgba(246, 243, 236, 0.45)");
      ctx.fillStyle = radialGrad;
      ctx.fillRect(0, 0, width, height);

      // 1. Draw Flow Lines ("ზოლი" - Black with subtle transparency)
      ctx.lineWidth = 1.0 * (window.devicePixelRatio || 1);
      paths.forEach((path) => {
        ctx.beginPath();
        ctx.moveTo(path.p0.x, path.p0.y);

        // Gentle interactive warp if mouse is nearby
        let cp1x = path.cp1.x;
        let cp1y = path.cp1.y;
        let cp2x = path.cp2.x;
        let cp2y = path.cp2.y;

        if (mouseRef.current.active) {
          const midX = (path.cp1.x + path.cp2.x) * 0.5;
          const midY = (path.cp1.y + path.cp2.y) * 0.5;
          const dist = Math.hypot(mouseRef.current.x - midX, mouseRef.current.y - midY);
          const maxDist = 240 * (window.devicePixelRatio || 1);
          if (dist < maxDist) {
            const force = (1 - dist / maxDist) * 16 * (window.devicePixelRatio || 1);
            const angle = Math.atan2(midY - mouseRef.current.y, midX - mouseRef.current.x);
            cp1x += Math.cos(angle) * force;
            cp1y += Math.sin(angle) * force;
            cp2x += Math.cos(angle) * force;
            cp2y += Math.sin(angle) * force;
          }
        }

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, path.p1.x, path.p1.y);

        // Stroke gradient for graceful entry/exit
        const lineGrad = ctx.createLinearGradient(path.p0.x, path.p0.y, path.p1.x, path.p1.y);
        lineGrad.addColorStop(0, "rgba(0, 0, 0, 0.02)");
        lineGrad.addColorStop(0.2, lineColor);
        lineGrad.addColorStop(0.8, lineColor);
        lineGrad.addColorStop(1, "rgba(0, 0, 0, 0.04)");

        ctx.strokeStyle = lineGrad;
        ctx.stroke();
      });

      // 2. Draw Moving Black Dots & Motion Stream Trails ("მოძრავი წერტილები შავი")
      dots.forEach((dot) => {
        dot.progress += dot.speed * delta;
        if (dot.progress > 1) {
          dot.progress = 0;
        }

        const path = paths[dot.pathIndex];
        if (!path) return;

        // Current head position
        const pt = getCubicBezierPoint(path.p0, path.cp1, path.cp2, path.p1, dot.progress);

        // Trailing tail position
        const tailProgress = Math.max(0, dot.progress - dot.tailLength);
        const tailPt = getCubicBezierPoint(path.p0, path.cp1, path.cp2, path.p1, tailProgress);

        // Draw Motion Stream Trail
        const streamGrad = ctx.createLinearGradient(tailPt.x, tailPt.y, pt.x, pt.y);
        streamGrad.addColorStop(0, "rgba(0, 0, 0, 0)");
        streamGrad.addColorStop(1, `rgba(0, 0, 0, ${dot.alpha * 0.4})`);

        ctx.beginPath();
        ctx.moveTo(tailPt.x, tailPt.y);
        ctx.lineTo(pt.x, pt.y);
        ctx.strokeStyle = streamGrad;
        ctx.lineWidth = dot.size * 0.9;
        ctx.lineCap = "round";
        ctx.stroke();

        // Draw Dot Particle
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
        ctx.shadowBlur = 4 * (window.devicePixelRatio || 1);
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      // 3. Central Subtle Gateway Portal Ring (Minimalist modern architectural ring)
      const centerX = width * 0.5;
      const centerY = height * 0.52;
      const ringRadius = Math.min(width, height) * 0.16;

      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0, 0, 0, 0.08)";
      ctx.lineWidth = 1.2 * (window.devicePixelRatio || 1);
      ctx.setLineDash([4 * (window.devicePixelRatio || 1), 6 * (window.devicePixelRatio || 1)]);
      ctx.stroke();

      // Inner faint focus ring
      ctx.beginPath();
      ctx.arc(centerX, centerY, ringRadius * 0.55, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0, 0, 0, 0.05)";
      ctx.lineWidth = 1.0 * (window.devicePixelRatio || 1);
      ctx.setLineDash([]);
      ctx.stroke();
      ctx.restore();

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [backgroundColor, lineColor, dotColor, speed, density, interactive]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default GatewayFlow;
