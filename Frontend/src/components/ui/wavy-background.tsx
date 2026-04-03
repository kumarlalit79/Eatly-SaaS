"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: any;
}) => {
  const noise = createNoise3D();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.001;
      case "fast":
        return 0.002;
      default:
        return 0.001;
    }
  };

  const init = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let w = (ctx.canvas.width = window.innerWidth);
    let h = (ctx.canvas.height = window.innerHeight);
    ctx.filter = `blur(${blur}px)`;
    let nt = 0;

    window.onresize = function () {
      w = ctx.canvas.width = window.innerWidth;
      h = ctx.canvas.height = window.innerHeight;
      ctx.filter = `blur(${blur}px)`;
    };

    const render = () => {
      ctx.fillStyle = backgroundFill || "transparent";
      ctx.globalAlpha = waveOpacity || 0.5;
      ctx.fillRect(0, 0, w, h);

      const waveColors = colors ?? [
        "#0F766E", // teal-700
        "#2DD4BF", // teal-400
        "#F97316", // orange-500
        "#14B8A6", // teal-500
        "#FFEDD5", // orange-100
      ];
      drawWave(5);
      requestAnimationFrame(render);

      function drawWave(n: number) {
        nt += getSpeed();
        for (let i = 0; i < n; i++) {
          ctx?.beginPath();
          ctx!.lineWidth = waveWidth || 50;
          ctx!.strokeStyle = waveColors[i % waveColors.length];
          for (let x = 0; x < w; x += 5) {
            var y = noise(x / 800, 0.3 * i, nt) * 100;
            ctx!.lineTo(x, y + h * 0.5); // Adjust for height, centered nicely
          }
          ctx!.stroke();
          ctx!.closePath();
        }
      }
    };
    render();
  };

  useEffect(() => {
    init();
    return () => {
      
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className={cn(
        "h-full flex flex-col items-center justify-center",
        containerClassName,
      )}
    >
      <canvas
        className="absolute inset-0 z-0"
        ref={canvasRef}
        id="canvas"
        style={{
          ...(props.style || {}),
        }}
      ></canvas>
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
