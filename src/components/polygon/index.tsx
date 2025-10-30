import { useState } from "react";
import { closestPointInPolygon } from "./closest-pointIn-polygon";
import type { Point } from "../../lib/type";

const canvasSize = 400;
const triangle: Point[] = [
  { x: 100, y: 100 },
  { x: 200, y: 50 },
  { x: 150, y: 200 },
];
const square: Point[] = [
  { x: 250, y: 100 },
  { x: 350, y: 100 },
  { x: 350, y: 200 },
  { x: 250, y: 200 },
];

const rectangle: Point[] = [
  { x: 50, y: 250 },
  { x: 350, y: 250 },
  { x: 350, y: 300 },
  { x: 50, y: 300 },
];

export default function PolygonVisualizer() {
  const [pos, setPos] = useState<Point>({ x: 180, y: 180 });

  const closestTriangle = closestPointInPolygon(triangle, pos);
  const closestSquare = closestPointInPolygon(square, pos);
  const closestRectangle = closestPointInPolygon(rectangle, pos);

  return (
    <canvas
      width={canvasSize}
      height={canvasSize}
      style={{ border: "1px solid black" }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      ref={(canvas) => {
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvasSize, canvasSize);

        drawPolygon(ctx, triangle, "red");
        drawPolygon(ctx, square, "blue");
        drawPolygon(ctx, rectangle, "pink");

        drawPoint(ctx, pos, "green");
        drawPoint(ctx, closestTriangle, "yellow");
        drawPoint(ctx, closestSquare, "yellow");
        drawPoint(ctx, closestRectangle, "yellow");
      }}
    />
  );
}

function drawPolygon(
  ctx: CanvasRenderingContext2D,
  poly: Point[],
  color: string
) {
  if (poly.length === 0) return;

  ctx.beginPath();
  ctx.moveTo(poly[0]?.x ?? 0, poly[0]?.y ?? 0);
  poly.slice(1).forEach((p) => ctx.lineTo(p.x, p.y));
  ctx.closePath();
  ctx.strokeStyle = color;
  ctx.stroke();
}

function drawPoint(ctx: CanvasRenderingContext2D, p: Point, color: string) {
  ctx.beginPath();
  ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}
