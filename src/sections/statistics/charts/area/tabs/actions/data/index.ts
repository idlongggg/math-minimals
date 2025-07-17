import { Empty } from './_mock/empty';
import { FootyWC, GdpTrack, VoteTrend, EarthquakeTrend, NuclearWarheads } from './_mock';

import type { Chart } from './table-types';

export type ChartDataItem = {
    key: string;
    chart: Chart;
};

export * from '.';
export * from './_mock';
export * from './table-types';

export const DATA_INPUT: ChartDataItem[] = [
    {
        key: 'empty',
        chart: {
            title: '...',
            x: 'X',
            y: 'Y',
            table: Empty,
        },
    },
    {
        key: 'gdp',
        chart: {
            title: 'Bảng GDP các nước (tỷ USD)',
            x: 'Năm',
            y: 'GDP (tỷ USD)',
            table: GdpTrack,
        },
    },
    {
        key: 'election',
        chart: {
            title: 'Bảng kết quả bầu cử',
            x: 'Năm',
            y: 'Số phiếu bầu',
            table: VoteTrend,
        },
    },
    {
        key: 'football',
        chart: {
            title: 'Bảng thống kê bàn thắng World Cup',
            x: 'Mùa giải',
            y: 'Số bàn thắng',
            table: FootyWC,
        },
    },
    {
        key: 'earthquake',
        chart: {
            title: 'Số lượng động đất lớn trên thế giới',
            x: 'Năm',
            y: 'Số trận động đất',
            table: EarthquakeTrend,
        },
    },
    {
        key: 'nuclear',
        chart: {
            title: 'Thống kê đầu đạn hạt nhân các nước',
            x: 'Năm',
            y: 'Số lượng đầu đạn',
            table: NuclearWarheads,
        },
    },
];
