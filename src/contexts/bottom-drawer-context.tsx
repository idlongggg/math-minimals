'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

export interface BottomDrawerContextValue {
  isOpen: boolean;
  isVisible: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  onShow: () => void;
  onHide: () => void;
}

const BottomDrawerContext = createContext<BottomDrawerContextValue | undefined>(
  undefined
);

export interface BottomDrawerProviderProps {
  children: ReactNode;
}

export function BottomDrawerProvider({ children }: BottomDrawerProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const value: BottomDrawerContextValue = {
    isOpen,
    isVisible,
    onOpen: () => setIsOpen(true),
    onClose: () => setIsOpen(false),
    onToggle: () => setIsOpen(!isOpen),
    onShow: () => setIsVisible(true),
    onHide: () => setIsVisible(false),
  };

  return (
    <BottomDrawerContext.Provider value={value}>
      {children}
    </BottomDrawerContext.Provider>
  );
}

export function useBottomDrawer(): BottomDrawerContextValue {
  const context = useContext(BottomDrawerContext);

  if (!context) {
    throw new Error(
      'useBottomDrawer must be used within a BottomDrawerProvider'
    );
  }

  return context;
}
