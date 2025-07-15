export interface LineChartDataset {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
}

export interface LineChartData {
    title: string;
    labels: (string | number)[];
    datasets: LineChartDataset[];
    xAxisTitle?: string; // Thêm trục X
    yAxisTitle?: string; // Thêm trục Y
}
