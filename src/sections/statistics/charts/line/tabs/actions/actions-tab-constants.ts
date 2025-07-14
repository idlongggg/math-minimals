import { DatasetGdp, DatasetElection, DatasetFootball } from '../../data/_mock';

import type { LineChartData } from '../../data/table-types';

export const DEFAULT_DATA: { key: string; label: string; table: LineChartData }[] = [
  { key: 'gdp', label: 'GDP', table: DatasetGdp },
  { key: 'election', label: 'Election', table: DatasetElection },
  { key: 'football', label: 'Football', table: DatasetFootball },
];
