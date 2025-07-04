import { CANVAS_CONFIG } from '../constants';
import {
  transformX,
  transformY,
  isPointInBounds,
  calculateGridStep,
} from './math';

import type { GraphBounds, HoveredPoint } from '../types';

/**
 * Draw grid lines on canvas
 */
export function drawGrid(
  ctx: CanvasRenderingContext2D,
  bounds: GraphBounds,
  width: number,
  height: number
): void {
  const { xMin, xMax, yMin, yMax } = bounds;

  ctx.strokeStyle = CANVAS_CONFIG.gridColor;
  ctx.lineWidth = CANVAS_CONFIG.gridLineWidth;

  // Vertical grid lines
  const xStep = calculateGridStep(xMin, xMax);
  for (let x = Math.ceil(xMin / xStep) * xStep; x <= xMax; x += xStep) {
    const canvasX = transformX(x, xMin, xMax, width);
    ctx.beginPath();
    ctx.moveTo(canvasX, 0);
    ctx.lineTo(canvasX, height);
    ctx.stroke();
  }

  // Horizontal grid lines
  const yStep = calculateGridStep(yMin, yMax);
  for (let y = Math.ceil(yMin / yStep) * yStep; y <= yMax; y += yStep) {
    const canvasY = transformY(y, yMin, yMax, height);
    ctx.beginPath();
    ctx.moveTo(0, canvasY);
    ctx.lineTo(width, canvasY);
    ctx.stroke();
  }
}

/**
 * Draw coordinate axes on canvas
 */
export function drawAxes(
  ctx: CanvasRenderingContext2D,
  bounds: GraphBounds,
  width: number,
  height: number
): void {
  const { xMin, xMax, yMin, yMax } = bounds;

  ctx.strokeStyle = CANVAS_CONFIG.axisColor;
  ctx.lineWidth = CANVAS_CONFIG.axisLineWidth;

  // X-axis (y = 0)
  if (yMin <= 0 && yMax >= 0) {
    const axisY = transformY(0, yMin, yMax, height);
    ctx.beginPath();
    ctx.moveTo(0, axisY);
    ctx.lineTo(width, axisY);
    ctx.stroke();
  }

  // Y-axis (x = 0)
  if (xMin <= 0 && xMax >= 0) {
    const axisX = transformX(0, xMin, xMax, width);
    ctx.beginPath();
    ctx.moveTo(axisX, 0);
    ctx.lineTo(axisX, height);
    ctx.stroke();
  }
}

/**
 * Draw a function curve on canvas
 */
export function drawFunction(
  ctx: CanvasRenderingContext2D,
  points: Array<{ x: number; y: number }>,
  bounds: GraphBounds,
  width: number,
  height: number,
  color: string
): void {
  if (points.length === 0) return;

  const { xMin, xMax, yMin, yMax } = bounds;

  ctx.strokeStyle = color;
  ctx.lineWidth = CANVAS_CONFIG.lineWidth;
  ctx.beginPath();

  let isFirstPoint = true;

  for (const point of points) {
    const canvasX = transformX(point.x, xMin, xMax, width);
    const canvasY = transformY(point.y, yMin, yMax, height);

    if (isPointInBounds(canvasX, canvasY, width, height)) {
      if (isFirstPoint) {
        ctx.moveTo(canvasX, canvasY);
        isFirstPoint = false;
      } else {
        ctx.lineTo(canvasX, canvasY);
      }
    } else if (!isFirstPoint) {
      // Continue drawing outside bounds for smooth curves
      ctx.lineTo(canvasX, canvasY);
    }
  }

  ctx.stroke();
}

/**
 * Draw a highlighted point on canvas
 */
export function drawHoveredPoint(
  ctx: CanvasRenderingContext2D,
  point: HoveredPoint,
  bounds: GraphBounds,
  width: number,
  height: number
): void {
  const { xMin, xMax, yMin, yMax } = bounds;

  const canvasX = transformX(point.x, xMin, xMax, width);
  const canvasY = transformY(point.y, yMin, yMax, height);

  // Draw point
  ctx.fillStyle = CANVAS_CONFIG.pointColor;
  ctx.beginPath();
  ctx.arc(canvasX, canvasY, CANVAS_CONFIG.pointRadius, 0, 2 * Math.PI);
  ctx.fill();

  // Draw coordinates text
  ctx.fillStyle = CANVAS_CONFIG.axisColor;
  ctx.font = '12px Arial';
  const text = `(${point.x.toFixed(2)}, ${point.y.toFixed(2)})`;
  ctx.fillText(text, canvasX + 10, canvasY - 10);
}

/**
 * Clear entire canvas
 */
export function clearCanvas(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): void {
  ctx.clearRect(0, 0, width, height);
}
