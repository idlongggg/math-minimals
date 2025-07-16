import { useState, useCallback } from 'react';

import {
    AVAILABLE_ICONS,
    AVAILABLE_COLORS,
    DEFAULT_SETTINGS,
    SAMPLE_DATA_SETS,
} from '../constants';

import type { PictographData } from '../pictograph-chart';
import type {
    DataSetKey,
    PictographState,
    PictographActions,
    PictographSettings,
    UsePictographReturn,
} from '../types';

const INITIAL_CUSTOM_DATA: PictographData[] = [
    { category: 'Danh mục A', value: 10, icon: '🔵', color: '#3b82f6' },
];

export function usePictograph(): UsePictographReturn {
    const [state, setState] = useState<PictographState>({
        selectedDataSet: 'fruits',
        customData: INITIAL_CUSTOM_DATA,
        useCustomData: false,
        settings: DEFAULT_SETTINGS,
    });

    const setSelectedDataSet = useCallback((dataSet: DataSetKey) => {
        setState((prev) => ({ ...prev, selectedDataSet: dataSet }));
    }, []);

    const setUseCustomData = useCallback((useCustom: boolean) => {
        setState((prev) => ({ ...prev, useCustomData: useCustom }));
    }, []);

    const addCustomCategory = useCallback(() => {
        setState((prev) => {
            const newCategory: PictographData = {
                category: `Danh mục ${String.fromCharCode(65 + prev.customData.length)}`,
                value: 5,
                icon: AVAILABLE_ICONS[Math.floor(Math.random() * AVAILABLE_ICONS.length)],
                color: AVAILABLE_COLORS[prev.customData.length % AVAILABLE_COLORS.length],
            };

            return {
                ...prev,
                customData: [...prev.customData, newCategory],
            };
        });
    }, []);

    const updateCustomCategory = useCallback(
        (index: number, field: keyof PictographData, value: any) => {
            setState((prev) => {
                const updated = [...prev.customData];
                updated[index] = { ...updated[index], [field]: value };

                return {
                    ...prev,
                    customData: updated,
                };
            });
        },
        []
    );

    const removeCustomCategory = useCallback((index: number) => {
        setState((prev) => ({
            ...prev,
            customData: prev.customData.filter((_, i) => i !== index),
        }));
    }, []);

    const resetCustomData = useCallback(() => {
        setState((prev) => ({
            ...prev,
            customData: INITIAL_CUSTOM_DATA,
        }));
    }, []);

    const updateSettings = useCallback((settings: Partial<PictographSettings>) => {
        setState((prev) => ({
            ...prev,
            settings: { ...prev.settings, ...settings },
        }));
    }, []);

    const currentData = state.useCustomData
        ? state.customData
        : SAMPLE_DATA_SETS[state.selectedDataSet];

    const actions: PictographActions = {
        setSelectedDataSet,
        setUseCustomData,
        addCustomCategory,
        updateCustomCategory,
        removeCustomCategory,
        resetCustomData,
        updateSettings,
    };

    return {
        state,
        actions,
        currentData,
    };
}
