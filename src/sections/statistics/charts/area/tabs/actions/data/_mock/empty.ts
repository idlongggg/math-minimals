import { ChartData } from "../table-types";

export const Empty: ChartData = {
    labels: [0],
    datasets: [
        {
            label: 'Column 1',
            data: [0],
        },
        {
            label: 'Column 2',
            data: [0],
        },
    ],
}