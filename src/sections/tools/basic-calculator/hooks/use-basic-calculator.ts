import { useCallback, useState } from 'react';
import { INITIAL_STATE } from '../constants';
import type {
    BasicCalculatorState,
    UseBasicCalculatorReturn
} from '../types';
import { calculate, formatDisplayValue, safeParseFloat } from '../utils';

export function useBasicCalculator(): UseBasicCalculatorReturn {
  const [state, setState] = useState<BasicCalculatorState>(INITIAL_STATE);

  const inputDigit = useCallback((digit: string) => {
    setState(prev => {
      if (prev.waitingForOperand) {
        return {
          ...prev,
          display: digit,
          waitingForOperand: false,
        };
      }
      
      return {
        ...prev,
        display: prev.display === '0' ? digit : prev.display + digit,
      };
    });
  }, []);

  const inputDecimal = useCallback(() => {
    setState(prev => {
      if (prev.waitingForOperand) {
        return {
          ...prev,
          display: '0.',
          waitingForOperand: false,
        };
      }
      
      if (prev.display.indexOf('.') === -1) {
        return {
          ...prev,
          display: prev.display + '.',
        };
      }
      
      return prev;
    });
  }, []);

  const clear = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  const performOperation = useCallback((nextOperation: string) => {
    setState(prev => {
      const inputValue = safeParseFloat(prev.display);

      if (prev.previousValue === null) {
        return {
          ...prev,
          previousValue: inputValue,
          waitingForOperand: true,
          operation: nextOperation,
        };
      }
      
      if (prev.operation) {
        const currentValue = prev.previousValue || 0;
        const newValue = calculate(currentValue, inputValue, prev.operation);

        return {
          ...prev,
          display: formatDisplayValue(newValue),
          previousValue: newValue,
          waitingForOperand: true,
          operation: nextOperation,
        };
      }

      return {
        ...prev,
        waitingForOperand: true,
        operation: nextOperation,
      };
    });
  }, []);

  const backspace = useCallback(() => {
    setState(prev => {
      if (prev.display.length > 1) {
        return { ...prev, display: prev.display.slice(0, -1) };
      }
      return { ...prev, display: '0' };
    });
  }, []);

  return {
    state,
    actions: {
      inputDigit,
      inputDecimal,
      clear,
      performOperation,
      backspace,
    },
  };
}
