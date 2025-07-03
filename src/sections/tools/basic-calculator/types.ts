export interface BasicCalculatorState {
  display: string;
  previousValue: number | null;
  operation: string | null;
  waitingForOperand: boolean;
}

export type BasicOperation = '+' | '-' | '×' | '÷' | '=';

export interface BasicCalculatorActions {
  inputDigit: (digit: string) => void;
  inputDecimal: () => void;
  clear: () => void;
  performOperation: (operation: string) => void;
  backspace: () => void;
}

export interface UseBasicCalculatorReturn {
  state: BasicCalculatorState;
  actions: BasicCalculatorActions;
}
