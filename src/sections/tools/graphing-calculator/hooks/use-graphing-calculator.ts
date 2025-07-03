import { useCallback, useState } from 'react';
import {
    COLORS,
    INITIAL_BOUNDS,
    INITIAL_FUNCTION,
    INITIAL_SETTINGS,
    MAX_HISTORY_ITEMS,
    PLOT_POINTS,
} from '../constants';
import type {
    FunctionData,
    GraphBounds,
    GraphingCalculatorState,
    GraphSettings,
    HoveredPoint,
    UseGraphingCalculatorReturn,
} from '../types';
import { generatePoints } from '../utils';

export function useGraphingCalculator(): UseGraphingCalculatorReturn {
  const [state, setState] = useState<GraphingCalculatorState>({
    functions: [
      {
        id: '1',
        ...INITIAL_FUNCTION,
        points: [],
      },
    ],
    selectedFunctionId: '1',
    bounds: INITIAL_BOUNDS,
    settings: INITIAL_SETTINGS,
    error: '',
    history: [],
    hoveredPoint: null,
  });

  const updateState = useCallback((updates: Partial<GraphingCalculatorState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const updateFunctionPoints = useCallback(() => {
    setState(prev => ({
      ...prev,
      functions: prev.functions.map(func => ({
        ...func,
        points: func.expression 
          ? generatePoints(func.expression, prev.bounds.xMin, prev.bounds.xMax, PLOT_POINTS)
          : [],
      })),
    }));
  }, []);

  const addFunction = useCallback(() => {
    setState(prev => {
      const newId = (prev.functions.length + 1).toString();
      const newFunction: FunctionData = {
        id: newId,
        expression: '',
        color: COLORS[prev.functions.length % COLORS.length],
        visible: true,
        points: [],
      };

      return {
        ...prev,
        functions: [...prev.functions, newFunction],
        selectedFunctionId: newId,
      };
    });
  }, []);

  const removeFunction = useCallback((id: string) => {
    setState(prev => {
      const filteredFunctions = prev.functions.filter(func => func.id !== id);
      let newSelectedId = prev.selectedFunctionId;
      
      if (prev.selectedFunctionId === id && filteredFunctions.length > 0) {
        newSelectedId = filteredFunctions[0].id;
      }

      return {
        ...prev,
        functions: filteredFunctions,
        selectedFunctionId: newSelectedId,
      };
    });
  }, []);

  const updateFunctionExpression = useCallback((id: string, expression: string) => {
    setState(prev => ({
      ...prev,
      functions: prev.functions.map(func =>
        func.id === id ? { ...func, expression } : func
      ),
      error: '',
    }));
  }, []);

  const toggleFunctionVisibility = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      functions: prev.functions.map(func =>
        func.id === id ? { ...func, visible: !func.visible } : func
      ),
    }));
  }, []);

  const setBounds = useCallback((bounds: Partial<GraphBounds>) => {
    setState(prev => ({
      ...prev,
      bounds: { ...prev.bounds, ...bounds },
    }));
  }, []);

  const setSettings = useCallback((settings: Partial<GraphSettings>) => {
    setState(prev => ({
      ...prev,
      settings: { ...prev.settings, ...settings },
    }));
  }, []);

  const resetView = useCallback(() => {
    updateState({
      bounds: INITIAL_BOUNDS,
      settings: { ...state.settings, zoom: 1 },
    });
  }, [state.settings, updateState]);

  const handleZoom = useCallback((zoom: number) => {
    setState(prev => {
      const centerX = (prev.bounds.xMin + prev.bounds.xMax) / 2;
      const centerY = (prev.bounds.yMin + prev.bounds.yMax) / 2;
      const rangeX = 20 / zoom;
      const rangeY = 20 / zoom;

      return {
        ...prev,
        settings: { ...prev.settings, zoom },
        bounds: {
          xMin: centerX - rangeX / 2,
          xMax: centerX + rangeX / 2,
          yMin: centerY - rangeY / 2,
          yMax: centerY + rangeY / 2,
        },
      };
    });
  }, []);

  const addToHistory = useCallback((expression: string) => {
    setState(prev => ({
      ...prev,
      history: [expression, ...prev.history.slice(0, MAX_HISTORY_ITEMS - 1)],
    }));
  }, []);

  const clearHistory = useCallback(() => {
    updateState({ history: [] });
  }, [updateState]);

  const setHoveredPoint = useCallback((point: HoveredPoint | null) => {
    updateState({ hoveredPoint: point });
  }, [updateState]);

  const setError = useCallback((error: string) => {
    updateState({ error });
  }, [updateState]);

  return {
    state,
    actions: {
      addFunction,
      removeFunction,
      updateFunctionExpression,
      toggleFunctionVisibility,
      setBounds,
      setSettings,
      resetView,
      handleZoom,
      addToHistory,
      clearHistory,
      setHoveredPoint,
      setError,
      updateFunctionPoints,
    },
  };
}
