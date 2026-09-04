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

interface Particle {
  track: number; // streamline index
  t: number;     // horizontal progress [0, 1] from left to right
  speed: number;
  size: number;
  alpha: number;
}

export const GatewayFlow: React.FC<GatewayFlowProps> = ({
  className = "",
  backgroundColor = "#ffffff",
  lineColor = "rgba(0, 0, 0, 0.18)",
  dotColor = "#000000",
  speed = 0.45,
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
      initParticles();
    };

    const streamCount = Math.floor(44 * density);
    const particlesCount = Math.floor(65 * density);
    let particles: Particle[] = [];

    // Helper to calculate streamline Y coordinate at horizontal X for a given track s (0 to 1)
    // Matches the exact hyperbolic bowtie / hourglass geometry of the reference visual
    const getStreamPoint = (tX: number, s: number, dpr: number) => {
      const w = width;
      const h = height;
      const centerX = w * 0.5;
      const centerY = h * 0.28; // Aligned directly with the elevated start screening button

      const waistRadius = 13 * dpr; // Tight central pinch waist
      const edgeHeight = h * 0.48;  // Wide fanning horns at borders
      const archHeight = 26 * dpr;  // Upward arch bridge at the throat

      // Normalized horizontal distance from center [-1, 1]
      const dx = (tX - centerX) / (w * 0.5);

      // Hyperbolic envelope: sqrt(waist^2 + (dx * edge)^2)
      const halfH = Math.sqrt(waistRadius * waistRadius + (dx * edgeHeight) * (dx * edgeHeight));

      // Upward parabolic arch profile (peaks at center)
      const arch = -archHeight * Math.max(0, 1 - dx * dx * 1.5);

      // Streamline offset for track s (from -1 to 1)
      const normS = (s - 0.5) * 2; // -1 (bottom-most) to +1 (top-most)

      // Interactive subtle vertical response
      let interactiveY = 0;
      if (mouseRef.current.active) {
        const mdx = (tX - mouseRef.current.x) / dpr;
        const mdy = (centerY - mouseRef.current.y) / dpr;
        const dist = Math.hypot(mdx, mdy);
        if (dist < 180) {
          interactiveY = (1 - dist / 180) * 8 * dpr * Math.sign(mdy);
        }
      }

      return {
        x: tX,
        y: centerY + arch + normS * halfH + interactiveY,
        dx,
      };
    };

    const initParticles = () => {
      particles = [];
      const dpr = window.devicePixelRatio || 1;
      for (let i = 0; i < particlesCount; i++) {
        particles.push({
          track: Math.floor(Math.random() * streamCount),
          t: Math.random(),
          speed: (0.00035 + Math.random() * 0.00065) * speed,
          size: (1.5 + Math.random() * 1.8) * dpr,
          alpha: 0.65 + Math.random() * 0.35,
        });
      }
    };

    initParticles();
    window.addEventListener("resize", resize);

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

    let lastTime = performance.now();

    const render = (time: number) => {
      const delta = Math.min((time - lastTime) / 16.666, 2.0);
      lastTime = time;

      const dpr = window.devicePixelRatio || 1;

      if (mouseRef.current.active) {
        mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
        mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;
      }

      // 1. Draw Background
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      // Subtle ambient vignette in soft white/cream
      const radialGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.28,
        Math.min(width, height) * 0.08,
        width * 0.5,
        height * 0.28,
        Math.max(width, height) * 0.75
      );
      radialGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
      radialGrad.addColorStop(1, "rgba(246, 243, 236, 0.4)");
      ctx.fillStyle = radialGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Streamline Tracks (Dotted Curves as in screenshot)
      const samples = 70;
      ctx.lineWidth = 1.0 * dpr;
      ctx.setLineDash([1.4 * dpr, 3.8 * dpr]); // Exact dotted dash pattern from screenshot!

      for (let i = 0; i < streamCount; i++) {
        const s = i / (streamCount - 1);
        ctx.beginPath();

        for (let j = 0; j <= samples; j++) {
          const tX = (j / samples) * width;
          const pt = getStreamPoint(tX, s, dpr);
          if (j === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }

        // Faint alpha for tracks, slightly denser toward center
        const lineGrad = ctx.createLinearGradient(0, 0, width, 0);
        lineGrad.addColorStop(0, "rgba(0, 0, 0, 0.08)");
        lineGrad.addColorStop(0.35, "rgba(0, 0, 0, 0.16)");
        lineGrad.addColorStop(0.5, "rgba(0, 0, 0, 0.24)");
        lineGrad.addColorStop(0.65, "rgba(0, 0, 0, 0.16)");
        lineGrad.addColorStop(1, "rgba(0, 0, 0, 0.08)");

        ctx.strokeStyle = lineGrad;
        ctx.stroke();
      }

      // 3. Draw Moving Particles along the Streamlines ("მოძრავი წერტილები შავი")
      ctx.setLineDash([]); // Solid circles

      particles.forEach((p) => {
        const s = p.track / (streamCount - 1);
        const currentX = p.t * width;
        const pt = getStreamPoint(currentX, s, dpr);

        // Smooth physics-based acceleration through throat (Venturi effect)
        const dx = pt.dx;
        const speedBoost = 1.0 + (1 - Math.min(1, Math.abs(dx))) * 0.75;
        p.t += p.speed * speedBoost * delta;

        if (p.t > 1) {
          p.t = 0;
          p.track = Math.floor(Math.random() * streamCount);
        }

        // Draw Motion trail
        const prevX = Math.max(0, (p.t - 0.02) * width);
        const prevPt = getStreamPoint(prevX, s, dpr);

        const trailGrad = ctx.createLinearGradient(prevPt.x, prevPt.y, pt.x, pt.y);
        trailGrad.addColorStop(0, "rgba(0, 0, 0, 0)");
        trailGrad.addColorStop(1, `rgba(0, 0, 0, ${p.alpha * 0.4})`);

        ctx.beginPath();
        ctx.moveTo(prevPt.x, prevPt.y);
        ctx.lineTo(pt.x, pt.y);
        ctx.strokeStyle = trailGrad;
        ctx.lineWidth = p.size * 0.85;
        ctx.lineCap = "round";
        ctx.stroke();

        // Draw Particle Dot (Crisp black dot with subtle soft halo)
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        ctx.shadowBlur = 3 * dpr;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

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
