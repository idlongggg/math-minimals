'use client';

import 'mathlive';

import JXG from 'jsxgraph';
import { useRef, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { List, ListItem, ListItemText } from '@mui/material';

export function AngleGeometryView() {
    const angleBoardRef = useRef<HTMLDivElement>(null);

    const createAngle = (board: JXG.Board) => {
        // Tạo 3 điểm để tạo thành góc
        const A = board.create('point', [0, 0], { name: 'A', size: 3 });
        const B = board.create('point', [4, 0], { name: 'B', size: 3 });
        const C = board.create('point', [3, 3], { name: 'C', size: 3 });

        // Tạo 2 đoạn thẳng tạo thành góc
        board.create('line', [A, B], {
            strokeColor: '#1f77b4',
            strokeWidth: 2,
            straightFirst: true,
            straightLast: true,
        });
        board.create('line', [A, C], {
            strokeColor: '#1f77b4',
            strokeWidth: 2,
            straightFirst: true,
            straightLast: true,
        });

        // Tạo góc
        const angle = board.create('angle', [B, A, C], {
            radius: 1,
            fillColor: '#ff7f0e',
            fillOpacity: 0.3,
            strokeColor: '#ff7f0e',
            strokeWidth: 1,
        });

        // Thêm nhãn hiển thị giá trị góc
        board.create(
            'text',
            [
                A.X() + 1.5,
                A.Y() + 0.5,
                () => {
                    const angleValue = (angle.Value() * 180) / Math.PI;
                    return `${angleValue.toFixed(1)}°`;
                },
            ],
            { fontSize: 14, fixed: true }
        );

        // Thêm nhãn hiển thị loại góc
        board.create(
            'text',
            [
                2,
                4,
                () => {
                    const angleValue = (angle.Value() * 180) / Math.PI;
                    if (angleValue < 90) return 'Góc nhọn';
                    if (Math.abs(angleValue - 90) < 0.1) return 'Góc vuông';
                    if (angleValue < 180) return 'Góc tù';
                    if (Math.abs(angleValue - 180) < 0.1) return 'Góc bẹt';
                    return 'Góc phản';
                },
            ],
            { fontSize: 16, fontWeight: 'bold' }
        );
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
                            Di chuyển các điểm để thay đổi góc (màu cam). Giá trị góc sẽ hiển thị
                            trực tiếp trên đồ thị.
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
                            <ListItem>
                                <ListItemText primary="Góc lớn hơn 180° gọi là góc phản." />
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}

export default AngleGeometryView;
