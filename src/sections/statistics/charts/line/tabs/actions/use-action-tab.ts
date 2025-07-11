import { useRef, useMemo, useState, useEffect } from 'react';

export function useActionsTab(DEFAULT_DATA: any[]) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [dataGridHeight, setDataGridHeight] = useState(400);

  const [selectedDatasetKey, setSelectedDatasetKey] = useState(DEFAULT_DATA[0]?.key || 'gdp');

  const [data, setData] = useState(() => {
    const found = DEFAULT_DATA.find((d) => d.key === selectedDatasetKey) || DEFAULT_DATA[0];
    return found.data;
  });

  const getColumnsFromData = (currData: typeof data) => [
    {
      field: 'id',
      headerName: 'STT',
      width: 60,
    },
    {
      field: 'label',
      headerName: 'Tên dòng',
      width: 180,
    },
    ...currData.labels.map((label: string | number) => ({
      field: String(label),
      headerName: String(label),
      width: 150,
    })),
  ];

  const getRowsFromData = (currData: typeof data) =>
    currData.datasets.map((ds: any, i: number) => {
      const row: any = {
        id: i + 1,
        label: ds.label,
      };
      currData.labels.forEach((label: string | number, idx: number) => {
        row[String(label)] = ds.data[idx] ?? '';
      });
      return row;
    });

  const [columns, setColumns] = useState(getColumnsFromData(data));
  const [selectedRowIds, setSelectedRowIds] = useState<readonly (string | number)[]>([]);
  const rows = useMemo(() => getRowsFromData(data), [data]);

  const handleDeleteSelectedRows = () => {
    // Remove selected rows from data.datasets
    const newDatasets = data.datasets.filter(
      (_: any, i: number) => !selectedRowIds.includes(i + 1)
    );
    const newData = { ...data, datasets: newDatasets };
    setData(newData);
    setSelectedRowIds([]);
  };

  useEffect(() => {
    function updateHeight() {
      const windowHeight = window.innerHeight;
      let containerHeight = 0;
      if (containerRef.current) {
        containerHeight = containerRef.current.getBoundingClientRect().top;
      }
      setDataGridHeight(windowHeight - containerHeight - 160);
    }
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  useEffect(() => {
    const found = DEFAULT_DATA.find((d) => d.key === selectedDatasetKey) || DEFAULT_DATA[0];
    setData(found.data);
    setColumns(getColumnsFromData(found.data));
  }, [selectedDatasetKey, DEFAULT_DATA]);

  const handleRenameColumn = (field: string, newHeaderName: string) => {
    let baseField = newHeaderName
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-zA-Z0-9_]/g, '');
    if (!baseField) baseField = 'col';
    let newField = baseField;
    let suffix = 1;
    while (columns.some((col: any) => col.field === newField)) {
      if (newField === field) break;
      newField = `${baseField}_${suffix}`;
      suffix++;
    }
    setColumns((prevCols: any[]) =>
      prevCols.map((col: any) =>
        col.field === field ? { ...col, headerName: newHeaderName, field: newField } : col
      )
    );
    // No need to update rows, as rows are derived from data
  };

  const handleHideColumn = (field: string) => {
    setColumns((prevCols: any[]) => prevCols.filter((col: any) => col.field !== field));
    // No need to update rows, as rows are derived from data
  };

  const handleAddRow = () => {
    const newDataset = {
      label: 'Hàng mới',
      data: Array(data.labels.length).fill(NaN),
    };
    const newData = {
      ...data,
      datasets: [...data.datasets, newDataset],
    };
    setData(newData);
  };

  return {
    containerRef,
    dataGridHeight,
    selectedDatasetKey,
    setSelectedDatasetKey,
    columns,
    setColumns,
    rows,
    selectedRowIds,
    setSelectedRowIds,
    handleRenameColumn,
    handleDeleteSelectedRows,
    handleHideColumn,
    handleAddRow,
    setData,
    data,
  };
}
