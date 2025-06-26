'use client';

import { useEffect, useRef } from 'react';

// JSXGraph styles
const jsxGraphStyles = `
  .jxgbox {
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    box-sizing: border-box;
  }
  
  .JXGtext {
    font-family: inherit;
  }
  
  .JXGboard {
    overflow: hidden;
  }
`;

export interface LineChartProps {
  id: string;
  width?: number;
  height?: number;
  title?: string;
  data?: Array<{
    name: string;
    points: Array<[number, number]>;
    color?: string;
  }>;
}

export function LineChart({ 
  id, 
  width = 600, 
  height = 400, 
  title = "Biểu đồ đường",
  data = [
    {
      name: "Hàm sin(x)",
      points: Array.from({ length: 100 }, (_, i) => {
        const x = (i - 50) * 0.2;
        return [x, Math.sin(x)];
      }),
      color: '#3b82f6'
    },
    {
      name: "Hàm cos(x)",
      points: Array.from({ length: 100 }, (_, i) => {
        const x = (i - 50) * 0.2;
        return [x, Math.cos(x)];
      }),
      color: '#ef4444'
    }
  ]
}: LineChartProps) {
  const boardRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Inject styles
    if (typeof document !== 'undefined') {
      const styleElement = document.createElement('style');
      styleElement.textContent = jsxGraphStyles;
      document.head.appendChild(styleElement);
      
      return () => {
        document.head.removeChild(styleElement);
      };
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

  const initChart = async () => {
    try {
      const JXG = await import('jsxgraph');
      
      if (boardRef.current) {
        JXG.JSXGraph.freeBoard(boardRef.current);
      }

      if (containerRef.current) {
        boardRef.current = JXG.JSXGraph.initBoard(id, {
          boundingbox: [-12, 3, 12, -3],
          axis: true,
          grid: true,
          showCopyright: false,
          showNavigation: true,
          zoom: {
            factorX: 1.25,
            factorY: 1.25,
            wheel: true,
            needShift: false
          },
          pan: {
            enabled: true,
            needShift: false
          }
        });

        // Thiết lập tiêu đề
        boardRef.current.create('text', [0, 2.5, title], {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#374151'
        });

        // Vẽ các đường biểu đồ
        data.forEach((series, index) => {
          const curve = boardRef.current.create('curve', [
            series.points.map(p => p[0]),
            series.points.map(p => p[1])
          ], {
            strokeColor: series.color || `hsl(${index * 60}, 70%, 50%)`,
            strokeWidth: 2,
            name: series.name
          });

          // Thêm chú thích
          boardRef.current.create('text', [-10, 2 - index * 0.3, series.name], {
            fontSize: 12,
            color: series.color || `hsl(${index * 60}, 70%, 50%)`
          });
        });

        // Thêm nhãn cho trục
        boardRef.current.create('text', [11, -0.3, 'x'], {
          fontSize: 14,
          color: '#6b7280'
        });
        
        boardRef.current.create('text', [0.3, 2.8, 'y'], {
          fontSize: 14,
          color: '#6b7280'
        });
      }
    } catch (error) {
      console.error('Error initializing JSXGraph:', error);
    }
  };

    initChart();

    return () => {
      if (boardRef.current) {
        try {
          const JXG = require('jsxgraph');
          JXG.JSXGraph.freeBoard(boardRef.current);
        } catch (error) {
          // Ignore cleanup errors
        }
      }
    };
  }, [id, data, title]);

  return (
    <div className="w-full">
      <div 
        ref={containerRef}
        id={id}
        className="jxgbox border border-gray-200 rounded-lg"
        style={{ 
          width: `${width}px`, 
          height: `${height}px`,
          margin: '0 auto'
        }}
      />
    </div>
  );
}
