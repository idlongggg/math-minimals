import { useRef, useEffect, useCallback } from 'react';

import {
  drawAxes,
  drawGrid,
  clearCanvas,
  drawFunction,
  drawHoveredPoint,
} from '../utils';

import type { GraphingCalculatorState } from '../types';

export function useCanvasDrawing(state: GraphingCalculatorState) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawGraph = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    const { functions, bounds, settings, hoveredPoint } = state;

    // Clear canvas
    clearCanvas(ctx, width, height);

    // Draw grid if enabled
    if (settings.gridVisible) {
      drawGrid(ctx, bounds, width, height);
    }

    // Draw axes
    drawAxes(ctx, bounds, width, height);

    // Draw functions
    functions.forEach((func) => {
      if (func.visible && func.points.length > 0) {
        drawFunction(ctx, func.points, bounds, width, height, func.color);
      }
    });

    // Draw hovered point
    if (hoveredPoint) {
      drawHoveredPoint(ctx, hoveredPoint, bounds, width, height);
    }
  }, [state]);

  // Redraw when state changes
  useEffect(() => {
    drawGraph();
  }, [drawGraph]);

  return {
    canvasRef,
    drawGraph,
  };
}
