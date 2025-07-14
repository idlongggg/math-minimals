import { DatasetElection, DatasetFootball, DatasetGdp } from '../../data/_mock';
import type { LineChartData } from '../../data/table-types';

export const DEFAULT_DATA: { key: string; label: string; table: LineChartData }[] = [
  { key: 'gdp', label: 'GDP', table: DatasetGdp },
  { key: 'election', label: 'Election', table: DatasetElection },
  { key: 'football', label: 'Football', table: DatasetFootball },
];

// Màu sắc mặc định cho các cột mới
export const COLORS = [
  '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
  '#9966FF', '#FF9F40', '#8AC926', '#1982C4',
  '#6A4C93', '#F15BB5', '#00BBF9', '#00F5D4'
];