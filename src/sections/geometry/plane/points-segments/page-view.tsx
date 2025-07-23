'use client';

import 'mathlive';

import JXG from 'jsxgraph';
import { useRef, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { List, ListItem, ListItemText } from '@mui/material';

export function PointsSegmentsPlaneGeometryView() {
    const pointsBoardRef = useRef<HTMLDivElement>(null);
    const segmentBoardRef = useRef<HTMLDivElement>(null);

    const createPoints = (board: JXG.Board) => {
        board.create('point', [-3, -1], { name: 'A', size: 3 });
        board.create('point', [1, -1], { name: 'B', size: 3 });
        board.create('point', [0, 2], { name: 'C', size: 3 });
    };

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

    useEffect(() => {
        if (pointsBoardRef.current) {
            const board = JXG.JSXGraph.initBoard(pointsBoardRef.current.id, {
                boundingbox: [-5, 5, 5, -5],
                axis: true,
                showNavigation: true,
                showCopyright: false,
            });

            createPoints(board);
        }

        if (segmentBoardRef.current) {
            const board = JXG.JSXGraph.initBoard(segmentBoardRef.current.id, {
                boundingbox: [-5, 5, 5, -5],
                axis: true,
                showNavigation: true,
                showCopyright: false,
            });
            createSegment(board);
        }
    }, []);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' },
                    gap: 3,
                }}
            >
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
                            Tính chất của điểm
                        </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemText primary="Điểm là một vị trí trong không gian, không có kích thước." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Điểm được xác định bởi tọa độ của nó trong hệ tọa độ." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Điểm có thể được biểu diễn bằng các ký hiệu như A, B, C." />
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            </Box>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' },
                    gap: 3,
                }}
            >
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
                            Tính chất của đoạn thẳng
                        </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemText primary="Đoạn thẳng là phần đường thẳng nối hai điểm." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Đoạn thẳng có độ dài xác định và có thể đo được." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Đoạn thẳng là tập hợp tất cả các điểm nằm giữa hai điểm đầu mút." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Đoạn thẳng có thể được ký hiệu bằng tên hai điểm đầu mút, ví dụ: đoạn thẳng AB." />
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}
