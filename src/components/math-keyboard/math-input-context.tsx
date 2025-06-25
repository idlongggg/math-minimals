'use client';

import type { ReactNode } from 'react';

import { createContext, useCallback, useContext, useState } from 'react';

// ----------------------------------------------------------------------

type MathInputContextType = {
  focusedInput: HTMLInputElement | HTMLTextAreaElement | null;
  setFocusedInput: (input: HTMLInputElement | HTMLTextAreaElement | null) => void;
  insertSymbol: (symbol: string) => void;
};

const MathInputContext = createContext<MathInputContextType | undefined>(undefined);

// ----------------------------------------------------------------------

type MathInputProviderProps = {
  children: ReactNode;
};

export function MathInputProvider({ children }: MathInputProviderProps) {
  const [focusedInput, setFocusedInput] = useState<HTMLInputElement | HTMLTextAreaElement | null>(
    null
  );

  const insertSymbol = useCallback(
    (symbol: string) => {
      if (!focusedInput) return;

      const start = focusedInput.selectionStart || 0;
      const end = focusedInput.selectionEnd || 0;
      const currentValue = focusedInput.value;

      const newValue = currentValue.slice(0, start) + symbol + currentValue.slice(end);

      // Update the input value
      focusedInput.value = newValue;

      // Trigger input event to update React state if controlled
      const event = new Event('input', { bubbles: true });
      focusedInput.dispatchEvent(event);

      // Set cursor position after the inserted symbol
      const newCursorPosition = start + symbol.length;
      focusedInput.setSelectionRange(newCursorPosition, newCursorPosition);

      // Keep focus on the input
      focusedInput.focus();
    },
    [focusedInput]
  );

  const value = {
    focusedInput,
    setFocusedInput,
    insertSymbol,
  };

  return <MathInputContext.Provider value={value}>{children}</MathInputContext.Provider>;
}

// ----------------------------------------------------------------------

export function useMathInput() {
  const context = useContext(MathInputContext);
  if (context === undefined) {
    throw new Error('useMathInput must be used within a MathInputProvider');
  }
  return context;
}

// ----------------------------------------------------------------------

// Hook for input components to register themselves
export function useMathInputRegister() {
  const { setFocusedInput } = useMathInput();

  const registerInput = useCallback(
    (inputRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>) => {
      const handleFocus = () => {
        if (inputRef.current) {
          setFocusedInput(inputRef.current);
        }
      };

      const handleBlur = () => {
        // Small delay to allow clicking on math keyboard
        setTimeout(() => {
          if (document.activeElement !== inputRef.current) {
            setFocusedInput(null);
          }
        }, 100);
      };

      if (inputRef.current) {
        inputRef.current.addEventListener('focus', handleFocus);
        inputRef.current.addEventListener('blur', handleBlur);

        return () => {
          if (inputRef.current) {
            inputRef.current.removeEventListener('focus', handleFocus);
            inputRef.current.removeEventListener('blur', handleBlur);
          }
        };
      }

      return undefined;
    },
    [setFocusedInput]
  );

  return { registerInput };
}
