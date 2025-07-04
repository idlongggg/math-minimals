import { useState, useCallback } from 'react';

import type { HistoryItem } from '../types';

export const useHistory = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const addToHistory = useCallback(
    (item: Omit<HistoryItem, 'id' | 'timestamp'>) => {
      const historyItem: HistoryItem = {
        ...item,
        id: Date.now().toString(),
        timestamp: new Date(),
      };
      setHistory((prev) => [historyItem, ...prev.slice(0, 49)]); // Keep last 50 items
    },
    []
  );

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const removeFromHistory = useCallback((id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return {
    history,
    addToHistory,
    clearHistory,
    removeFromHistory,
  };
};
