export interface CalculatorState {
  display: string;
  previousValue: number | null;
  operation: string | null;
  waitingForOperand: boolean;
  memory: number;
  isRadianMode: boolean;
  history: string[];
}

export type Operation = '+' | '-' | '×' | '÷' | 'mod' | '^' | '=';

export type ScientificFunction =
  | 'sin'
  | 'cos'
  | 'tan'
  | 'log'
  | 'ln'
  | 'sqrt'
  | 'square'
  | 'factorial'
  | 'reciprocal'
  | 'pi'
  | 'e'
  | 'exp'
  | 'power';

export type MemoryAction = 'MC' | 'MR' | 'MS' | 'M+' | 'M-';

export interface ButtonStyleConfig {
  minHeight: number;
  fontSize: string;
  fontWeight: number;
}

export interface CalculatorHookReturn {
  state: CalculatorState;
  actions: {
    inputDigit: (digit: string) => void;
    inputDecimal: () => void;
    clear: () => void;
    clearAll: () => void;
    performOperation: (operation: string) => void;
    performScientificOperation: (func: ScientificFunction) => void;
    handleMemory: (action: MemoryAction) => void;
    toggleAngleMode: () => void;
    clearHistory: () => void;
    setDisplayFromHistory: (value: string) => void;
    toggleSign: () => void;
    absoluteValue: () => void;
    backspace: () => void;
  };
}
