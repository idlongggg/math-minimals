'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { getTabColor, getTabColorAlpha, type TabColorConfig, type TabColorKey } from 'src/theme/tab-colors';

// ----------------------------------------------------------------------

interface TabColorContextValue {
  /** Current active tab */
  currentTab: string;
  /** Current tab color configuration */
  tabColor: TabColorConfig;
  /** Get color value for current tab */
  getColor: (variant?: keyof TabColorConfig) => string;
  /** Get alpha color for current tab */
  getAlphaColor: (alpha?: number) => string;
  /** Set current tab */
  setCurrentTab: (tab: string) => void;
  /** Check if tab is active */
  isActiveTab: (tab: string) => boolean;
  /** Tab color mapping */
  tabColorMapping: Record<string, TabColorKey>;
  /** Set tab color mapping */
  setTabColorMapping: (mapping: Record<string, TabColorKey>) => void;
}

const TabColorContext = createContext<TabColorContextValue | undefined>(undefined);

// ----------------------------------------------------------------------

interface TabColorProviderProps {
  children: React.ReactNode;
  /** Initial tab */
  initialTab?: string;
  /** Tab color mapping */
  tabColorMapping?: Record<string, TabColorKey>;
}

export function TabColorProvider({
  children,
  initialTab = 'overview',
  tabColorMapping: initialMapping = {},
}: TabColorProviderProps) {
  const [currentTab, setCurrentTab] = useState(initialTab);
  const [tabColorMapping, setTabColorMapping] = useState<Record<string, TabColorKey>>(initialMapping);

  // Get current tab color
  const tabColor = useMemo(() => {
    const colorKey = tabColorMapping[currentTab] || currentTab;
    return getTabColor(colorKey);
  }, [currentTab, tabColorMapping]);

  // Get color value for current tab
  const getColor = useCallback((variant: keyof TabColorConfig = 'main') => tabColor[variant], [tabColor]);

  // Get alpha color for current tab
  const getAlphaColor = useCallback((alpha: number = 0.1) => {
    const colorKey = tabColorMapping[currentTab] || currentTab;
    return getTabColorAlpha(colorKey, alpha);
  }, [currentTab, tabColorMapping]);

  // Check if tab is active
  const isActiveTab = useCallback((tab: string) => currentTab === tab, [currentTab]);

  const contextValue = useMemo(() => ({
    currentTab,
    tabColor,
    getColor,
    getAlphaColor,
    setCurrentTab,
    isActiveTab,
    tabColorMapping,
    setTabColorMapping,
  }), [
    currentTab,
    tabColor,
    getColor,
    getAlphaColor,
    setCurrentTab,
    isActiveTab,
    tabColorMapping,
    setTabColorMapping,
  ]);

  return (
    <TabColorContext.Provider value={contextValue}>
      {children}
    </TabColorContext.Provider>
  );
}

// ----------------------------------------------------------------------

/**
 * Hook to use tab color context
 */
export function useTabColor(): TabColorContextValue {
  const context = useContext(TabColorContext);
  if (!context) {
    throw new Error('useTabColor must be used within TabColorProvider');
  }
  return context;
}

/**
 * Hook to get tab color without context (standalone usage)
 */
export function useTabColorStandalone(tab: string = 'overview', mapping?: Record<string, TabColorKey>) {
  const tabColor = useMemo(() => {
    const colorKey = mapping?.[tab] || tab;
    return getTabColor(colorKey);
  }, [tab, mapping]);

  const getColor = useCallback((variant: keyof TabColorConfig = 'main') => tabColor[variant], [tabColor]);

  const getAlphaColor = useCallback((alpha: number = 0.1) => {
    const colorKey = mapping?.[tab] || tab;
    return getTabColorAlpha(colorKey, alpha);
  }, [tab, mapping]);

  return {
    tabColor,
    getColor,
    getAlphaColor,
  };
}

/**
 * Hook to safely get tab color context without throwing if provider is not available
 */
export function useTabColorSafe() {
  try {
    return useContext(TabColorContext);
  } catch {
    return null;
  }
}
