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
      const centerY = h * 0.27; // Elevated focal point aligned directly with the start button

      // Helper to generate a 100% perfectly straight perspective ray towards the center
      const addStraightRay = (startX: number, startY: number, endX = centerX, endY = centerY) => {
        paths.push({
          p0: { x: startX, y: startY },
          cp1: { x: startX + (endX - startX) * 0.333, y: startY + (endY - startY) * 0.333 },
          cp2: { x: startX + (endX - startX) * 0.667, y: startY + (endY - startY) * 0.667 },
          p1: { x: endX, y: endY },
          length: Math.hypot(endX - startX, endY - startY),
        });
      };

      // 1. Straight Perspective Rays from Left Border
      const sideRayCount = Math.floor(7 * density);
      for (let i = 0; i <= sideRayCount; i++) {
        const y = h * (0.02 + (i / sideRayCount) * 0.96);
        addStraightRay(-w * 0.02, y);
      }

      // 2. Straight Perspective Rays from Right Border
      for (let i = 0; i <= sideRayCount; i++) {
        const y = h * (0.02 + (i / sideRayCount) * 0.96);
        addStraightRay(w * 1.02, y);
      }

      // 3. Straight Perspective Rays from Top Border (ceiling grid)
      const topRayCount = Math.floor(8 * density);
      for (let i = 0; i <= topRayCount; i++) {
        const x = w * (0.05 + (i / topRayCount) * 0.9);
        addStraightRay(x, -h * 0.04);
      }

      // 4. Straight Perspective Rays from Bottom Border (ground grid)
      const bottomRayCount = Math.floor(10 * density);
      for (let i = 0; i <= bottomRayCount; i++) {
        const x = w * (0.03 + (i / bottomRayCount) * 0.94);
        addStraightRay(x, h * 1.04);
      }

      // 5. Corner rays
      addStraightRay(0, 0);
      addStraightRay(w, 0);
      addStraightRay(0, h);
      addStraightRay(w, h);

      // Initialize moving dots along straight rays with calm, serene speed ("დინამიკა შეანელე")
      const dotsPerPath = Math.max(1, Math.floor(2 * density));
      paths.forEach((_, pathIdx) => {
        for (let d = 0; d < dotsPerPath; d++) {
          dots.push({
            pathIndex: pathIdx,
            progress: Math.random(),
            // Much slower, tranquil drift speed
            speed: (0.0003 + Math.random() * 0.0006) * speed,
            size: (1.5 + Math.random() * 1.8) * (window.devicePixelRatio || 1),
            alpha: 0.5 + Math.random() * 0.45,
            tailLength: 0.025 + Math.random() * 0.035,
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
        height * 0.27,
        Math.min(width, height) * 0.08,
        width * 0.5,
        height * 0.27,
        Math.max(width, height) * 0.75
      );
      radialGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
      radialGrad.addColorStop(1, "rgba(246, 243, 236, 0.45)");
      ctx.fillStyle = radialGrad;
      ctx.fillRect(0, 0, width, height);

      // 1. Draw Flow Lines ("ზოლი" - Clean straight perspective lines)
      ctx.lineWidth = 1.0 * (window.devicePixelRatio || 1);
      paths.forEach((path) => {
        ctx.beginPath();
        ctx.moveTo(path.p0.x, path.p0.y);
        ctx.lineTo(path.p1.x, path.p1.y);

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
        ctx.lineWidth = dot.size * 0.85;
        ctx.lineCap = "round";
        ctx.stroke();

        // Draw Dot Particle
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
        ctx.shadowBlur = 3 * (window.devicePixelRatio || 1);
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      // 3. Central Subtle Gateway Portal Ring & Concentric Gateway Frames
      const centerX = width * 0.5;
      const centerY = height * 0.27;
      const ringRadius = Math.min(width, height) * 0.12;

      ctx.save();
      // Concentric Gateway Perspective Frames
      const frameCount = 3;
      for (let f = 1; f <= frameCount; f++) {
        const scale = f / frameCount;
        const fW = Math.min(width * 0.65, 480 * (window.devicePixelRatio || 1)) * scale;
        const fH = Math.min(height * 0.45, 260 * (window.devicePixelRatio || 1)) * scale;
        ctx.strokeStyle = `rgba(0, 0, 0, ${0.03 + f * 0.02})`;
        ctx.lineWidth = 0.8 * (window.devicePixelRatio || 1);
        ctx.strokeRect(centerX - fW * 0.5, centerY - fH * 0.5, fW, fH);
      }

      // Outer dashed focal circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0, 0, 0, 0.08)";
      ctx.lineWidth = 1.0 * (window.devicePixelRatio || 1);
      ctx.setLineDash([4 * (window.devicePixelRatio || 1), 6 * (window.devicePixelRatio || 1)]);
      ctx.stroke();

      // Inner faint focus ring
      ctx.beginPath();
      ctx.arc(centerX, centerY, ringRadius * 0.55, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0, 0, 0, 0.05)";
      ctx.lineWidth = 0.8 * (window.devicePixelRatio || 1);
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
