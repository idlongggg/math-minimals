export interface PlotPoint {
  x: number;
  y: number;
}

export interface FunctionData {
  id: string;
  expression: string;
  color: string;
  visible: boolean;
  points: PlotPoint[];
}

export interface GraphBounds {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}

export interface GraphSettings {
  gridVisible: boolean;
  zoom: number;
}

export interface HoveredPoint {
  x: number;
  y: number;
}

export interface GraphingCalculatorState {
  functions: FunctionData[];
  selectedFunctionId: string;
  bounds: GraphBounds;
  settings: GraphSettings;
  error: string;
  history: string[];
  hoveredPoint: HoveredPoint | null;
}

export interface GraphingCalculatorActions {
  addFunction: () => void;
  removeFunction: (id: string) => void;
  updateFunctionExpression: (id: string, expression: string) => void;
  toggleFunctionVisibility: (id: string) => void;
  setBounds: (bounds: Partial<GraphBounds>) => void;
  setSettings: (settings: Partial<GraphSettings>) => void;
  resetView: () => void;
  handleZoom: (zoom: number) => void;
  addToHistory: (expression: string) => void;
  clearHistory: () => void;
  setHoveredPoint: (point: HoveredPoint | null) => void;
  setError: (error: string) => void;
  updateFunctionPoints: () => void;
}

export interface UseGraphingCalculatorReturn {
  state: GraphingCalculatorState;
  actions: GraphingCalculatorActions;
}
