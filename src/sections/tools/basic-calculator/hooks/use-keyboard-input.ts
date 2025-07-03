import { useCallback, useEffect } from 'react';
import { KEYBOARD_MAPPINGS } from '../constants';
import type { UseBasicCalculatorReturn } from '../types';

export function useKeyboardInput(calculatorActions: UseBasicCalculatorReturn['actions']) {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key;

      // Handle digits
      if (key >= '0' && key <= '9') {
        calculatorActions.inputDigit(key);
        return;
      }

      // Handle operators
      if (key in KEYBOARD_MAPPINGS.operators) {
        if (key === '/') {
          event.preventDefault(); // Prevent default browser search
        }
        calculatorActions.performOperation(
          KEYBOARD_MAPPINGS.operators[key as keyof typeof KEYBOARD_MAPPINGS.operators]
        );
        return;
      }

      // Handle special actions
      switch (key) {
        case '.':
          calculatorActions.inputDecimal();
          break;
        case 'Enter':
        case '=':
          calculatorActions.performOperation('=');
          break;
        case 'Escape':
        case 'c':
        case 'C':
          calculatorActions.clear();
          break;
        case 'Backspace':
          calculatorActions.backspace();
          break;
        default:
          // No action for unrecognized keys
          break;
      }
    },
    [calculatorActions]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);
}
