'use client';

import JXG from 'jsxgraph';
import { useRef, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

export function PointsSegmentsPlaneGeometryView() {
    const pointsBoardRef = useRef<HTMLDivElement>(null);
    const segmentBoardRef = useRef<HTMLDivElement>(null);
    const lineBoardRef = useRef<HTMLDivElement>(null);

    // Hàm tạo các điểm
    const createPoints = (board: JXG.Board) => {
        // Tạo 3 điểm tự do
        const A = board.create('point', [-3, -1], { name: 'A', size: 3 });
        const B = board.create('point', [1, -1], { name: 'B', size: 3 });
        const C = board.create('point', [0, 2], { name: 'C', size: 3 });
    };

    // Hàm tạo đoạn thẳng
    const createSegment = (board: JXG.Board) => {
        const P1 = board.create('point', [-3, -1], { name: 'P1', size: 3 });
        const P2 = board.create('point', [2, 1], { name: 'P2', size: 3 });

        board.create('segment', [P1, P2], {
            name: 'Đoạn thẳng',
            strokeColor: '#1f77b4',
            strokeWidth: 3,
            highlightStrokeColor: '#1f77b4',
            highlightStrokeWidth: 3,
        });
    };

    // Hàm tạo đường thẳng
    const createLine = (board: JXG.Board) => {
        const Q1 = board.create('point', [-3, -2], { name: 'Q1', size: 3 });
        const Q2 = board.create('point', [2, 2], { name: 'Q2', size: 3 });

        board.create('line', [Q1, Q2], {
            name: 'Đường thẳng',
            strokeColor: '#ff7f0e',
            strokeWidth: 2,
            highlightStrokeColor: '#ff7f0e',
            highlightStrokeWidth: 2,
            straightFirst: true,
            straightLast: true,
        });
    };

    useEffect(() => {
        // Khởi tạo bảng vẽ điểm
        if (pointsBoardRef.current) {
            const board = JXG.JSXGraph.initBoard(pointsBoardRef.current.id, {
                boundingbox: [-5, 5, 5, -5],
                axis: true,
                showNavigation: true,
                showCopyright: false,
            });
            createPoints(board);
        }

        // Khởi tạo bảng vẽ đoạn thẳng
        if (segmentBoardRef.current) {
            const board = JXG.JSXGraph.initBoard(segmentBoardRef.current.id, {
                boundingbox: [-5, 5, 5, -5],
                axis: true,
                showNavigation: true,
                showCopyright: false,
            });
            createSegment(board);
        }

        // Khởi tạo bảng vẽ đường thẳng
        if (lineBoardRef.current) {
            const board = JXG.JSXGraph.initBoard(lineBoardRef.current.id, {
                boundingbox: [-5, 5, 5, -5],
                axis: true,
                showNavigation: true,
                showCopyright: false,
            });
            createLine(board);
        }
    }, []);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Các điểm
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Di chuyển các điểm tự do trên mặt phẳng
                    </Typography>
                    <div
                        id="points-container"
                        ref={pointsBoardRef}
                        style={{
                            width: '400px',
                            height: '400px',
                        }}
                    />
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Đoạn thẳng
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Di chuyển các điểm để thay đổi đoạn thẳng (màu xanh dương)
                    </Typography>
                    <div
                        id="segment-container"
                        ref={segmentBoardRef}
                        style={{
                            width: '400px',
                            height: '400px',
                        }}
                    />
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Đường thẳng
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Di chuyển các điểm để thay đổi đường thẳng (màu cam)
                    </Typography>
                    <div
                        id="line-container"
                        ref={lineBoardRef}
                        style={{
                            width: '400px',
                            height: '400px',
                        }}
                    />
                </CardContent>
            </Card>
        </Box>
    );
}

export default PointsSegmentsPlaneGeometryView;
