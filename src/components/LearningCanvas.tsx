import { useEffect, useRef } from "react"

export default function LearningCanvas(props: React.CanvasHTMLAttributes<HTMLCanvasElement>) {
  const ref = useRef<HTMLCanvasElement | null>(null); 

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.fillStyle = "grey";
    context.fillRect(10, 10, 100, 100); 
  }, []);

  return <canvas ref={ref} {...props}></canvas>;
}