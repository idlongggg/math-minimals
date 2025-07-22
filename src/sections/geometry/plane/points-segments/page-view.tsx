'use client';

import JXG from 'jsxgraph';
import 'mathlive';
import { useEffect, useRef } from 'react';

import { List, ListItem, ListItemText } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export function PointsSegmentsPlaneGeometryView() {
    const pointsBoardRef = useRef<HTMLDivElement>(null);
    const segmentBoardRef = useRef<HTMLDivElement>(null);
    const lineBoardRef = useRef<HTMLDivElement>(null);

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
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Tính chất của đường thẳng
                        </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemText primary="Đường thẳng là tập hợp vô hạn các điểm kéo dài vô tận về hai phía." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Đường thẳng không có điểm bắt đầu và kết thúc." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Qua hai điểm phân biệt chỉ có duy nhất một đường thẳng." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Đường thẳng có thể được xác định bởi hai điểm bất kỳ thuộc nó." />
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}

export default PointsSegmentsPlaneGeometryView;