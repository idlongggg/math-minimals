'use client';

import type { ReactNode } from 'react';

import { createContext, useContext, useState } from 'react';

// ----------------------------------------------------------------------

export interface MathKeyboardContextValue {
  isOpen: boolean;
  isVisible: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  onShow: () => void;
  onHide: () => void;
}

const MathKeyboardContext = createContext<MathKeyboardContextValue | undefined>(undefined);

// ----------------------------------------------------------------------

export interface MathKeyboardProviderProps {
  children: ReactNode;
}

export function MathKeyboardProvider({ children }: MathKeyboardProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const value: MathKeyboardContextValue = {
    isOpen,
    isVisible,
    onOpen: () => setIsOpen(true),
    onClose: () => setIsOpen(false),
    onToggle: () => setIsOpen(!isOpen),
    onShow: () => setIsVisible(true),
    onHide: () => setIsVisible(false),
  };

  return <MathKeyboardContext.Provider value={value}>{children}</MathKeyboardContext.Provider>;
}

// ----------------------------------------------------------------------

export function useMathKeyboard(): MathKeyboardContextValue {
  const context = useContext(MathKeyboardContext);

  if (!context) {
    throw new Error('useMathKeyboard must be used within a MathKeyboardProvider');
  }

  return context;
}
