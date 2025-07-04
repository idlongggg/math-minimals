import type { GraphBounds, FunctionData, GraphSettings } from './types';

export const COLORS = [
  '#1976d2', // blue
  '#d32f2f', // red
  '#388e3c', // green
  '#f57c00', // orange
  '#7b1fa2', // purple
  '#0288d1', // light blue
  '#c2185b', // pink
  '#5d4037', // brown
] as const;

export const INITIAL_BOUNDS: GraphBounds = {
  xMin: -10,
  xMax: 10,
  yMin: -10,
  yMax: 10,
};

export const INITIAL_SETTINGS: GraphSettings = {
  gridVisible: true,
  zoom: 1,
};

export const INITIAL_FUNCTION: Omit<FunctionData, 'id'> = {
  expression: 'x^2',
  color: COLORS[0],
  visible: true,
  points: [],
};

export const MAX_HISTORY_ITEMS = 10;
export const PLOT_POINTS = 1000; // Number of points for smooth curve

export const QUICK_FUNCTIONS = [
  'x^2',
  'x^3',
  'sqrt(x)',
  'sin(x)',
  'cos(x)',
  'tan(x)',
  'log(x)',
  'ln(x)',
  '1/x',
  'abs(x)',
] as const;

export const CANVAS_CONFIG = {
  width: 800,
  height: 600,
  gridColor: '#e0e0e0',
  axisColor: '#333',
  pointColor: '#ff4444',
  lineWidth: 2,
  gridLineWidth: 0.5,
  axisLineWidth: 1,
  pointRadius: 4,
} as const;
