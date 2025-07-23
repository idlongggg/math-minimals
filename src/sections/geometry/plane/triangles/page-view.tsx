'use client';

import 'mathlive';

import JXG from 'jsxgraph';
import { useRef, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { List, ListItem, ListItemText } from '@mui/material';

export function TriangleGeometryView() {
    const triangleBoardRef = useRef<HTMLDivElement>(null);

    const createTriangle = (board: JXG.Board) => {
        // Tạo 3 đỉnh tam giác vuông mặc định (vuông tại A)
        const A = board.create('point', [0, 0], { name: 'A', size: 3 });
        const B = board.create('point', [4, 0], { name: 'B', size: 3 });
        const C = board.create('point', [0, 3], { name: 'C', size: 3 });

        // Tạo 3 cạnh tam giác
        const AB = board.create('line', [A, B], {
            strokeColor: '#1f77b4',
            strokeWidth: 2,
            straightFirst: true,
            straightLast: true,
        });
        const BC = board.create('line', [B, C], {
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

        // Tạo 3 góc của tam giác
        const angleA = board.create('angle', [B, A, C], {
            radius: 1,
            fillColor: '#ff7f0e',
            fillOpacity: 0.3,
            strokeColor: '#ff7f0e',
            strokeWidth: 1,
            orthoType: 'square', // Ký hiệu góc vuông
            orthoSensitivity: 0.5,
        });

        const angleB = board.create('angle', [C, B, A], {
            radius: 0.8,
            fillColor: '#2ca02c',
            fillOpacity: 0.3,
            strokeColor: '#2ca02c',
            strokeWidth: 1,
        });

        const angleC = board.create('angle', [A, C, B], {
            radius: 0.8,
            fillColor: '#d62728',
            fillOpacity: 0.3,
            strokeColor: '#d62728',
            strokeWidth: 1,
        });

        // Hiển thị độ dài các cạnh
        board.create(
            'text',
            [
                () => (A.X() + B.X()) / 2,
                () => (A.Y() + B.Y()) / 2 - 0.3,
                () => `AB = ${Math.sqrt((B.X() - A.X()) ** 2 + (B.Y() - A.Y()) ** 2).toFixed(2)}`,
            ],
            { fontSize: 12, fixed: true }
        );

        board.create(
            'text',
            [
                () => (B.X() + C.X()) / 2 + 0.3,
                () => (B.Y() + C.Y()) / 2,
                () => `BC = ${Math.sqrt((C.X() - B.X()) ** 2 + (C.Y() - B.Y()) ** 2).toFixed(2)}`,
            ],
            { fontSize: 12, fixed: true }
        );

        board.create(
            'text',
            [
                () => (A.X() + C.X()) / 2 - 0.3,
                () => (A.Y() + C.Y()) / 2,
                () => `AC = ${Math.sqrt((C.X() - A.X()) ** 2 + (C.Y() - A.Y()) ** 2).toFixed(2)}`,
            ],
            { fontSize: 12, fixed: true }
        );

        // Hiển thị số đo các góc
        board.create(
            'text',
            [
                () => A.X() + 0.8,
                () => A.Y() + 0.5,
                () => {
                    const angleValue = (angleA.Value() * 180) / Math.PI;
                    return angleValue === 90 ? '90°' : `${angleValue.toFixed(1)}°`;
                },
            ],
            { fontSize: 12, fixed: true, fontWeight: 'bold' }
        );

        board.create(
            'text',
            [
                () => B.X() - 0.8,
                () => B.Y() + 0.5,
                () => `${((angleB.Value() * 180) / Math.PI).toFixed(1)}°`,
            ],
            { fontSize: 12, fixed: true }
        );

        board.create(
            'text',
            [
                () => C.X(),
                () => C.Y() - 0.5,
                () => `${((angleC.Value() * 180) / Math.PI).toFixed(1)}°`,
            ],
            { fontSize: 12, fixed: true }
        );

        // Hiển thị loại tam giác
        board.create(
            'text',
            [
                2,
                4,
                () => {
                    const a = Math.sqrt((C.X() - B.X()) ** 2 + (C.Y() - B.Y()) ** 2);
                    const b = Math.sqrt((A.X() - C.X()) ** 2 + (A.Y() - C.Y()) ** 2);
                    const c = Math.sqrt((B.X() - A.X()) ** 2 + (B.Y() - A.Y()) ** 2);

                    const angleAValue = (angleA.Value() * 180) / Math.PI;
                    const angleBValue = (angleB.Value() * 180) / Math.PI;
                    const angleCValue = (angleC.Value() * 180) / Math.PI;

                    if (angleAValue === 90 || angleBValue === 90 || angleCValue === 90) {
                        return 'Tam giác vuông';
                    } else if (a === b && b === c) {
                        return 'Tam giác đều';
                    } else if (a === b || b === c || a === c) {
                        return 'Tam giác cân';
                    } else if (angleAValue < 90 && angleBValue < 90 && angleCValue < 90) {
                        return 'Tam giác nhọn';
                    } else {
                        return 'Tam giác tù';
                    }
                },
            ],
            { fontSize: 16, fontWeight: 'bold' }
        );
    };

    useEffect(() => {
        if (triangleBoardRef.current) {
            const board = JXG.JSXGraph.initBoard(triangleBoardRef.current.id, {
                boundingbox: [-1, 5, 5, -1],
                axis: true,
                showNavigation: true,
                showCopyright: false,
            });
            createTriangle(board);
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
                            Tam giác
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Di chuyển các đỉnh để thay đổi hình dạng tam giác. Mặc định hiển thị tam
                            giác vuông. Độ dài cạnh và số đo góc sẽ hiển thị trực tiếp.
                        </Typography>
                        <div
                            id="triangle-container"
                            ref={triangleBoardRef}
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
                            Tính chất của tam giác
                        </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemText primary="Tam giác là hình có ba đỉnh và ba cạnh." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Tổng ba góc trong một tam giác luôn bằng 180°." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Tam giác có ba góc nhọn gọi là tam giác nhọn." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Tam giác có một góc vuông gọi là tam giác vuông." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Tam giác có một góc tù gọi là tam giác tù." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Tam giác có ba cạnh bằng nhau gọi là tam giác đều." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Tam giác có hai cạnh bằng nhau gọi là tam giác cân." />
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}

export default TriangleGeometryView;
