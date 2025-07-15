import { Empty } from './data/_mock/empty';
import { FootyWC, GdpTrack, VoteTrend } from './data/_mock';

import type { ChartWrap } from './data/table-types';

export type DataItem = {
    key: string;
    table: ChartWrap;
};

export const DEFAULT_DATA: DataItem[] = [
    {
        key: 'empty',
        table: {
            title: 'Empty Table',
            xTitle: 'X',
            yTitle: 'Y',
            data: Empty,
        },
    },
    {
        key: 'gdp',
        table: {
            title: 'Bảng GDP các nước (tỷ USD)',
            xTitle: 'Năm',
            yTitle: 'GDP (tỷ USD)',
            data: GdpTrack,
        },
    },
    {
        key: 'election',
        table: {
            title: 'Bảng kết quả bầu cử',
            xTitle: 'Năm',
            yTitle: 'Số phiếu bầu',
            data: VoteTrend,
        },
    },
    {
        key: 'football',
        table: {
            title: 'Bảng thống kê bàn thắng World Cup',
            xTitle: 'Mùa giải',
            yTitle: 'Số bàn thắng',
            data: FootyWC,
        },
    },
];
