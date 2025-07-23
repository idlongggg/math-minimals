'use client';

import JXG from 'jsxgraph';
import 'mathlive';
import { useEffect, useRef } from 'react';

import { List, ListItem, ListItemText } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export function AngleGeometryView() {
    const angleBoardRef = useRef<HTMLDivElement>(null);

    const createAngle = (board: JXG.Board) => {
        // Tạo 3 điểm để tạo thành góc
        const A = board.create('point', [0, 0], { name: 'A', size: 3 });
        const B = board.create('point', [4, 0], { name: 'B', size: 3 });
        const C = board.create('point', [3, 3], { name: 'C', size: 3 });

        // Tạo 2 đoạn thẳng tạo thành góc
        const AB = board.create('line', [A, B], {
            strokeColor: '#1f77b4',
            strokeWidth: 2,
            straightFirst: true,
            straightLast: true,
        });
        const AC = board.create('line', [A, C], {
            strokeColor: '#1f77b4',
            strokeWidth: 2,
            straightFirst: true,
            straightLast: true,
        });

        // Tạo góc và hiển thị độ lớn
        board.create('angle', [B, A, C], {
            name: 'α',
            radius: 1,
            fillColor: '#ff7f0e',
            fillOpacity: 0.3,
            strokeColor: '#ff7f0e',
            strokeWidth: 1,
        });
    };

    useEffect(() => {
        if (angleBoardRef.current) {
            const board = JXG.JSXGraph.initBoard(angleBoardRef.current.id, {
                boundingbox: [-1, 5, 5, -1],
                axis: true,
                showNavigation: true,
                showCopyright: false,
            });
            createAngle(board);
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
                            Góc
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Di chuyển các điểm để thay đổi góc (màu cam)
                        </Typography>
                        <div
                            id="angle-container"
                            ref={angleBoardRef}
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
                            Tính chất của góc
                        </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemText primary="Góc là hình tạo bởi hai tia chung gốc." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Góc được đo bằng đơn vị độ (°) hoặc radian." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Góc nhỏ hơn 90° gọi là góc nhọn." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Góc bằng 90° gọi là góc vuông." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Góc lớn hơn 90° nhưng nhỏ hơn 180° gọi là góc tù." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Góc bằng 180° gọi là góc bẹt." />
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}