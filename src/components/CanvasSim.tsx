import { useEffect, useRef } from "react";

export default function CanvasSim() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const resize = () => { canvas.width = innerWidth; canvas.height = innerHeight; };
    addEventListener("resize", resize); resize();

    // estado mínimo: un punto que se mueve en X
    let x = 50, vx = 120; // px/s
    const y = 80;
    let last = performance.now() / 1000;

    const loop = () => {
      const now = performance.now() / 1000;
      const dt = Math.min(now - last, 0.05); // cap por si se pausa
      last = now;

      // actualizar
      x += vx * dt;
      if (x > canvas.width - 10 || x < 10) vx *= -1;

      // dibujar
      ctx.fillStyle = "rgba(11,14,23,0.3)"; // fondo con leve estela
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#98b2ff";
      ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2); ctx.fill();

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ display: "block", background: "#0b0e17" }} />;
}
