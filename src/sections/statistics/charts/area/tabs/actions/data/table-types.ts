export interface ChartData {
    labels: number[];
    datasets: {
        label: string;
        data: number[];
    }[];
}

export interface ChartWrap {
    title: string;
    xTitle: string;
    yTitle: string;
    data: ChartData;
}
