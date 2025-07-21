'use client';

import JXG from 'jsxgraph';
import { useRef, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

export function Demo02View() {
    const parallelogramBoardRef = useRef<HTMLDivElement>(null);
    const squareBoardRef = useRef<HTMLDivElement>(null);
    const triangleBoardRef = useRef<HTMLDivElement>(null);

    // Hàm tạo hình bình hành (có nền)
    const createParallelogram = (board: JXG.Board) => {
        // Tạo 3 điểm tự do
        const A = board.create('point', [-3, -1], { name: 'A', size: 3 });
        const B = board.create('point', [1, -1], { name: 'B', size: 3 });
        const C = board.create('point', [2, 2], { name: 'C', size: 3 });

        // Tạo điểm D sao cho ABCD là hình bình hành
        const D = board.create(
            'point',
            [() => C.X() + A.X() - B.X(), () => C.Y() + A.Y() - B.Y()],
            { name: 'D', size: 3 }
        );

        // Tạo polygon có nền
        board.create('polygon', [A, B, C, D], {
            fillColor: '#a6cee3', // Màu nền
            fillOpacity: 0.7, // Độ trong suốt (0-1)
            borders: {
                // Cấu hình đường viền
                strokeColor: '#1f77b4',
                strokeWidth: 2,
                highlightStrokeColor: '#1f77b4',
                highlightStrokeWidth: 2,
            },
        });
    };

    // Hàm tạo hình vuông (có nền)
    const createSquare = (board: JXG.Board) => {
        // Tạo 2 điểm tự do
        const A = board.create('point', [-2, -2], { name: 'A', size: 3 });
        const B = board.create('point', [2, -2], { name: 'B', size: 3 });

        // Tạo điểm D sao cho AB vuông góc AD và AB = AD
        const D = board.create(
            'point',
            [() => A.X() - (B.Y() - A.Y()), () => A.Y() + (B.X() - A.X())],
            { name: 'D', size: 3 }
        );

        // Tạo điểm C sao cho ABCD là hình vuông
        const C = board.create(
            'point',
            [() => B.X() + D.X() - A.X(), () => B.Y() + D.Y() - A.Y()],
            { name: 'C', size: 3 }
        );

        // Tạo polygon có nền
        board.create('polygon', [A, B, C, D], {
            fillColor: '#b2df8a', // Màu nền
            fillOpacity: 0.7,
            borders: {
                strokeColor: '#33a02c',
                strokeWidth: 2,
                highlightStrokeColor: '#33a02c',
                highlightStrokeWidth: 2,
            },
        });
    };

    // Hàm tạo tam giác (có nền)
    const createTriangle = (board: JXG.Board) => {
        const A = board.create('point', [-2, -1], { name: 'A', size: 3 });
        const B = board.create('point', [2, -1], { name: 'B', size: 3 });
        const C = board.create('point', [0, 3], { name: 'C', size: 3 });

        // Tạo polygon có nền
        board.create('polygon', [A, B, C], {
            fillColor: '#fdbf6f', // Màu nền
            fillOpacity: 0.7,
            borders: {
                strokeColor: '#ff7f0e',
                strokeWidth: 2,
                highlightStrokeColor: '#ff7f0e',
                highlightStrokeWidth: 2,
            },
        });
    };

    useEffect(() => {
        // Khởi tạo bảng vẽ hình bình hành
        if (parallelogramBoardRef.current) {
            const board = JXG.JSXGraph.initBoard(parallelogramBoardRef.current.id, {
                boundingbox: [-6, 6, 6, -6], // Đặt cùng tỷ lệ width/height (12/12 = 1)
                axis: true,
                showNavigation: true,
                showCopyright: false,
            });
            createParallelogram(board);
        }

        // Khởi tạo bảng vẽ hình vuông
        if (squareBoardRef.current) {
            const board = JXG.JSXGraph.initBoard(squareBoardRef.current.id, {
                boundingbox: [-5, 5, 5, -5], // Tỷ lệ 1:1 (10/10)
                axis: true,
                showNavigation: true,
                showCopyright: false,
            });
            createSquare(board);
        }

        // Khởi tạo bảng vẽ tam giác
        if (triangleBoardRef.current) {
            const board = JXG.JSXGraph.initBoard(triangleBoardRef.current.id, {
                boundingbox: [-5, 5, 5, -5], // Tỷ lệ 1:1
                axis: true,
                showNavigation: true,
                showCopyright: false,
            });
            createTriangle(board);
        }
    }, []);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Hình tam giác
                    </Typography>
                    <div
                        id="triangle-container"
                        ref={triangleBoardRef}
                        style={{ width: '400px', height: '400px' }}
                    />
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Hình bình hành
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Di chuyển các điểm A, B, C - điểm D sẽ tự động điều chỉnh để giữ tính chất
                        hình bình hành
                    </Typography>
                    <div
                        id="parallelogram-container"
                        ref={parallelogramBoardRef}
                        style={{ width: '400px', height: '400px' }}
                    />
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Hình vuông
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Di chuyển các điểm A, B - điểm C và D sẽ tự động điều chỉnh để giữ tính chất
                        hình vuông
                    </Typography>
                    <div
                        id="square-container"
                        ref={squareBoardRef}
                        style={{ width: '400px', height: '400px' }}
                    />
                </CardContent>
            </Card>
        </Box>
    );
}

export default Demo02View;
