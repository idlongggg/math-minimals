import { useCallback, useState } from 'react';
import { INITIAL_STATE, MAX_HISTORY_ITEMS } from '../constants';
import type {
    CalculatorHookReturn,
    CalculatorState,
    MemoryAction,
    ScientificFunction
} from '../types';
import {
    calculate,
    formatCalculationForHistory,
    formatDisplayValue,
    performScientificCalculation,
    safeParseFloat,
} from '../utils';

export function useCalculator(): CalculatorHookReturn {
  const [state, setState] = useState<CalculatorState>(INITIAL_STATE);

  const updateState = useCallback((updates: Partial<CalculatorState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const addToHistory = useCallback((calculation: string) => {
    setState(prev => ({
      ...prev,
      history: [calculation, ...prev.history.slice(0, MAX_HISTORY_ITEMS - 1)]
    }));
  }, []);

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
    updateState({
      display: '0',
      previousValue: null,
      operation: null,
      waitingForOperand: false,
    });
  }, [updateState]);

  const clearAll = useCallback(() => {
    setState({ ...INITIAL_STATE });
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

        if (nextOperation === '=') {
          addToHistory(
            `${currentValue} ${prev.operation} ${inputValue} = ${newValue}`
          );
        }

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
  }, [addToHistory]);

  const performScientificOperation = useCallback((func: ScientificFunction) => {
    setState(prev => {
      const inputValue = safeParseFloat(prev.display);
      let result: number;

      if (func === 'power') {
        if (prev.previousValue !== null) {
          result = Math.pow(prev.previousValue, inputValue);
          addToHistory(formatCalculationForHistory(func, inputValue, result, prev.previousValue));
          
          return {
            ...prev,
            display: formatDisplayValue(result),
            previousValue: null,
            operation: null,
            waitingForOperand: true,
          };
        }
        return prev;
      }

      result = performScientificCalculation(func, inputValue, prev.isRadianMode);
      addToHistory(formatCalculationForHistory(func, inputValue, result));

      return {
        ...prev,
        display: formatDisplayValue(result),
        waitingForOperand: true,
      };
    });
  }, [addToHistory]);

  const handleMemory = useCallback((action: MemoryAction) => {
    setState(prev => {
      const currentValue = safeParseFloat(prev.display);
      
      switch (action) {
        case 'MC':
          return { ...prev, memory: 0 };
        case 'MR':
          return { 
            ...prev, 
            display: formatDisplayValue(prev.memory),
            waitingForOperand: true 
          };
        case 'MS':
          return { ...prev, memory: currentValue };
        case 'M+':
          return { ...prev, memory: prev.memory + currentValue };
        case 'M-':
          return { ...prev, memory: prev.memory - currentValue };
        default:
          return prev;
      }
    });
  }, []);

  const toggleAngleMode = useCallback(() => {
    updateState({ isRadianMode: !state.isRadianMode });
  }, [state.isRadianMode, updateState]);

  const clearHistory = useCallback(() => {
    updateState({ history: [] });
  }, [updateState]);

  const setDisplayFromHistory = useCallback((value: string) => {
    updateState({ 
      display: value,
      waitingForOperand: true 
    });
  }, [updateState]);

  const toggleSign = useCallback(() => {
    setState(prev => ({
      ...prev,
      display: formatDisplayValue(-safeParseFloat(prev.display)),
    }));
  }, []);

  const absoluteValue = useCallback(() => {
    setState(prev => ({
      ...prev,
      display: formatDisplayValue(Math.abs(safeParseFloat(prev.display))),
    }));
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
      clearAll,
      performOperation,
      performScientificOperation,
      handleMemory,
      toggleAngleMode,
      clearHistory,
      setDisplayFromHistory,
      toggleSign,
      absoluteValue,
      backspace,
    },
  };
}
