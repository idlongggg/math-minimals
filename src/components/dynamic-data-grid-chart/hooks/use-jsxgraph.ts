import { useRef, useEffect } from 'react';

import { chartColors } from '../constants';

import type { ChartDataRow, ColumnDefinition } from '../types';

interface UseJSXGraphProps {
  id: string;
  title: string;
  rows: ChartDataRow[];
  columns: ColumnDefinition[];
  xAxisColumn: string;
  yAxisColumns: string[];
}

export function useJSXGraph({
  id,
  title,
  rows,
  columns,
  xAxisColumn,
  yAxisColumns,
}: UseJSXGraphProps) {
  const boardRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize and update chart
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initChart = async () => {
      try {
        const JXG = await import('jsxgraph');

        if (boardRef.current) {
          JXG.JSXGraph.freeBoard(boardRef.current);
        }

        if (containerRef.current && rows.length > 0) {
          // Get numeric columns only
          const numericColumns = columns.filter((col) => col.type === 'number');
          const validXColumn = numericColumns.find(
            (col) => col.field === xAxisColumn
          );
          const validYColumns = yAxisColumns.filter((col) =>
            numericColumns.some((numCol) => numCol.field === col)
          );

          if (!validXColumn || validYColumns.length === 0) return;

          // Get data for chart
          const validRows = rows.filter(
            (row) =>
              typeof row[xAxisColumn] === 'number' &&
              validYColumns.some((yCol) => typeof row[yCol] === 'number')
          );

          if (validRows.length === 0) return;

          // Calculate bounds
          const xValues = validRows.map((row) => row[xAxisColumn] as number);
          const allYValues = validYColumns.flatMap((yCol) =>
            validRows.map((row) => row[yCol] as number)
          );

          const xMin = Math.min(...xValues) - 1;
          const xMax = Math.max(...xValues) + 1;
          const yMin = Math.min(...allYValues) - 1;
          const yMax = Math.max(...allYValues) + 1;

          // Initialize board
          boardRef.current = JXG.JSXGraph.initBoard(id, {
            boundingbox: [xMin, yMax, xMax, yMin],
            axis: true,
            grid: true,
            showCopyright: false,
            showNavigation: true,
            zoom: {
              factorX: 1.25,
              factorY: 1.25,
              wheel: true,
              needShift: false,
            },
            pan: {
              enabled: true,
              needShift: false,
            },
          });

          // Add title
          boardRef.current.create(
            'text',
            [xMin + (xMax - xMin) * 0.05, yMax - (yMax - yMin) * 0.1, title],
            {
              fontSize: 16,
              fontWeight: 'bold',
              color: '#374151',
            }
          );

          // Draw lines for each Y column
          validYColumns.forEach((yColumn, index) => {
            const color = chartColors[index % chartColors.length];
            const validRowsForColumn = validRows.filter(
              (row) => typeof row[yColumn] === 'number'
            );

            if (validRowsForColumn.length > 1) {
              // Create line
              boardRef.current.create(
                'curve',
                [
                  validRowsForColumn.map((row) => row[xAxisColumn] as number),
                  validRowsForColumn.map((row) => row[yColumn] as number),
                ],
                {
                  strokeColor: color,
                  strokeWidth: 2,
                  name: `${yColumn} Line`,
                }
              );

              // Create points
              validRowsForColumn.forEach((row) => {
                boardRef.current.create(
                  'point',
                  [row[xAxisColumn] as number, row[yColumn] as number],
                  {
                    size: 3,
                    color,
                    name: `${yColumn}: (${row[xAxisColumn]}, ${row[yColumn]})`,
                  }
                );
              });
            }
          });
        }
      } catch (error) {
        console.error('Error initializing JSXGraph:', error);
      }
    };

    initChart();
  }, [rows, columns, xAxisColumn, yAxisColumns, id, title]);

  return {
    boardRef,
    containerRef,
  };
}
