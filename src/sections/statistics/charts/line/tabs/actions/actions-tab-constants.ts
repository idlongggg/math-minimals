import { DatasetElection, DatasetFootball, DatasetGdp } from './data/_mock';

import type { LineChartData } from './data/table-types';

export const DEFAULT_DATA: { key: string; label: string; table: LineChartData }[] = [
  {
    key: 'gdp',
    label: 'GDP',
    table: {
      ...DatasetGdp,
      xAxisTitle: 'Năm',
      yAxisTitle: 'GDP (tỷ USD)',
    },
  },
  {
    key: 'election',
    label: 'Election',
    table: {
      ...DatasetElection,
      xAxisTitle: 'Năm',
      yAxisTitle: 'Số phiếu bầu',
    },
  },
  {
    key: 'football',
    label: 'Football',
    table: {
      ...DatasetFootball,
      xAxisTitle: 'Mùa giải',
      yAxisTitle: 'Số bàn thắng',
    },
  },
];

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
  xAxisTitle: 'Trục X',
  yAxisTitle: 'Trục Y',
};
