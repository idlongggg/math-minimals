import { DatasetGdp, DatasetElection, DatasetFootball } from './data/_mock';

import type { LineChartData } from './data/table-types';

export const DEFAULT_DATA: { key: string; label: string; table: LineChartData }[] = [
  { key: 'gdp', label: 'GDP', table: DatasetGdp },
  { key: 'election', label: 'Election', table: DatasetElection },
  { key: 'football', label: 'Football', table: DatasetFootball },
];

// Đưa mẫu dữ liệu trống vào constants
export const EMPTY_TABLE: LineChartData = {
  title: 'Bảng dữ liệu trống',
  labels: [''],
  datasets: [
    {
      label: 'Cột 1',
      data: [0],
    },
    {
      label: 'Cột 2',
      data: [0],
    },
  ],
};
