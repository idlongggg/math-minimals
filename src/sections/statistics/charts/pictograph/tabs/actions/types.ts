import type { PictographData } from './pictograph-chart';

export type DataSetKey = 'fruits' | 'vehicles' | 'animals' | 'sports';

export interface PictographSettings {
    unitValue: number;
    maxIconsPerRow: number;
    iconSize: number;
}

export interface PictographState {
    selectedDataSet: DataSetKey;
    customData: PictographData[];
    useCustomData: boolean;
    settings: PictographSettings;
}

export interface PictographActions {
    setSelectedDataSet: (dataSet: DataSetKey) => void;
    setUseCustomData: (useCustom: boolean) => void;
    addCustomCategory: () => void;
    updateCustomCategory: (index: number, field: keyof PictographData, value: any) => void;
    removeCustomCategory: (index: number) => void;
    resetCustomData: () => void;
    updateSettings: (settings: Partial<PictographSettings>) => void;
}

export interface UsePictographReturn {
    state: PictographState;
    actions: PictographActions;
    currentData: PictographData[];
}
