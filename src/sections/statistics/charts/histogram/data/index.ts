import { Empty } from './_mock/empty';

import type { Chart } from './table-types';

export type ChartDataItem = {
    key: string;
    chart: Chart;
};

export * from '.';
export * from './_mock';
export * from './table-types';

export type SavedChartItem = {
    data: ChartDataItem;
    savedAt: string;
    index: number;
};

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
        key: 'height',
        chart: {
            title: 'Tần Số Chiều Cao Đệ Tử Tông Môn',
            x: 'Chiều Cao (thước)',
            y: 'Số Đệ Tử',
            table: {
                labels: ['Chiều cao'],
                data: [
                    { k: '1.5 - 1.6', v: [20] },
                    { k: '1.6 - 1.7', v: [35] },
                    { k: '1.7 - 1.8', v: [50] },
                    { k: '1.8 - 1.9', v: [45] },
                    { k: '1.9 - 2.0', v: [30] },
                    { k: '2.0 - 2.1', v: [25] },
                    { k: '2.1 - 2.2', v: [15] },
                    { k: '2.2 - 2.3', v: [10] },
                    { k: '2.3 - 2.4', v: [8] },
                    { k: '2.4 - 2.5', v: [5] },
                    { k: '2.5 - 2.6', v: [3] },
                    { k: '2.6 - 2.7', v: [2] },
                ],
            },
        },
    },
    {
        key: 'thpt_quoc_gia_2025',
        chart: {
            title: 'Tần Số Điểm Thi THPT Quốc Gia 2025',
            x: 'Khoảng Điểm',
            y: 'Số Thí Sinh',
            table: {
                labels: ['Điểm thi'],
                data: [
                    { k: '0 - 1', v: [192] },
                    { k: '1 - 2', v: [5000] },
                    { k: '2 - 3', v: [15000] },
                    { k: '3 - 4', v: [40000] },
                    { k: '4 - 5', v: [200000] },
                    { k: '5 - 6', v: [350000] },
                    { k: '6 - 7', v: [300000] },
                    { k: '7 - 8', v: [200000] },
                    { k: '8 - 9', v: [100000] },
                    { k: '9 - 10', v: [16427] },
                    { k: '10', v: [500] },
                ],
            },
        },
    },
    {
        key: 'energy_consumption_2025',
        chart: {
            title: 'Tần Số Tiêu Thụ Năng Lượng Xanh 2025',
            x: 'Tỷ Lệ Năng Lượng Xanh (%)',
            y: 'Số Hộ Gia Đình',
            table: {
                labels: ['Năng lượng xanh'],
                data: [
                    { k: '0 - 10', v: [100000] },
                    { k: '10 - 20', v: [80000] },
                    { k: '20 - 30', v: [60000] },
                    { k: '30 - 40', v: [50000] },
                    { k: '40 - 50', v: [40000] },
                    { k: '50 - 60', v: [30000] },
                    { k: '60 - 70', v: [20000] },
                    { k: '70 - 80', v: [15000] },
                    { k: '80 - 90', v: [10000] },
                    { k: '90 - 100', v: [5000] },
                    { k: '100', v: [2000] },
                ],
            },
        },
    },
    {
        key: 'ai_usage_2025',
        chart: {
            title: 'Tần Số Ứng Dụng AI Trong Công Việc 2025',
            x: 'Mức Độ Ứng Dụng',
            y: 'Số Công Ty',
            table: {
                labels: ['Ứng dụng AI'],
                data: [
                    { k: 'Không sử dụng', v: [2000] },
                    { k: 'Thử nghiệm', v: [5000] },
                    { k: 'Dùng cơ bản', v: [10000] },
                    { k: 'Dùng thường xuyên', v: [15000] },
                    { k: 'Dùng chuyên sâu', v: [12000] },
                    { k: 'Tích hợp toàn diện', v: [8000] },
                    { k: 'AI tự động hóa', v: [6000] },
                    { k: 'AI nghiên cứu', v: [4000] },
                    { k: 'AI sáng tạo', v: [3000] },
                    { k: 'AI quản lý', v: [2000] },
                    { k: 'AI tiên tiến', v: [1000] },
                ],
            },
        },
    },
];
