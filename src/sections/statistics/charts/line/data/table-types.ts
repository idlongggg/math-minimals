export type LineChartDataset = {
  label: string;
  data: number[];
};

export type LineChartData = {
  title: string;
  labels: (string | number)[];
  datasets: LineChartDataset[];
};
