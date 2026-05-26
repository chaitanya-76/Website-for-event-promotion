import { useEffect, useRef } from "react";

const ORBS = [
  { vx: 0.18, vy: 0.12, radius: 0.55 },
  { vx: -0.14, vy: 0.20, radius: 0.45 },
  { vx: 0.22, vy: -0.16, radius: 0.40 },
];

export default function App() {
  const canvasRef = useRef(null);
  const orbsRef = useRef([]);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const init = (w, h) => {
      orbsRef.current = ORBS.map((o, i) => ({
        ...o,
        x: w * [0.25, 0.75, 0.5][i],
        y: h * [0.3, 0.65, 0.2][i],
      }));
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init(canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const { width, height } = canvas;

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);

      for (const orb of orbsRef.current) {
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < 0 || orb.x > width) orb.vx *= -1;
        if (orb.y < 0 || orb.y > height) orb.vy *= -1;

        const r = Math.max(width, height) * orb.radius;
        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, r);
        grad.addColorStop(0, "rgba(223, 41, 53, 0.13)");
        grad.addColorStop(0.5, "rgba(223, 41, 53, 0.04)");
        grad.addColorStop(1, "rgba(223, 41, 53, 0)");

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="absolute w-full -z-1 h-screen overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="relative z-10 flex items-center justify-center w-full h-full" />
    </div>
  );
}