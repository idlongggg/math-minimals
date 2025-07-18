export type TableData = {
    labels: string[];
    data: {
        k: string;
        v: number[];
    }[];
};

export type Chart = {
    title: string;
    x: string;
    y: string;
    table: TableData;
};
