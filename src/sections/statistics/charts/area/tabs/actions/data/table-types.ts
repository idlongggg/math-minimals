export interface AreaChartDataset {
    label: string;
    data: number[];
}

export interface AreaChartData {
    title: string;
    labels: (string | number)[];
    datasets: AreaChartDataset[];
    xAxisTitle?: string; // Thêm trục X
    yAxisTitle?: string; // Thêm trục Y
}
