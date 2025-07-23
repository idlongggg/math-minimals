'use client';

import 'mathlive';

import JXG from 'jsxgraph';
import { useRef, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { List, ListItem, ListItemText } from '@mui/material';

export function PolygonGeometryView() {
    const polyBoardRef = useRef<HTMLDivElement>(null);

    const createPolygon = (board: JXG.Board) => {
        // Tạo 5 đỉnh đa giác lồi mặc định
        const points = [
            board.create('point', [0, 0], { name: 'A', size: 3 }),
            board.create('point', [3, 0], { name: 'B', size: 3 }),
            board.create('point', [4, 2], { name: 'C', size: 3 }),
            board.create('point', [2, 3], { name: 'D', size: 3 }),
            board.create('point', [0, 2], { name: 'E', size: 3 }),
        ];

        // Tạo các cạnh đa giác
        const lines = points.map((point, i) => {
            const nextPoint = points[(i + 1) % points.length];
            return board.create('line', [point, nextPoint], {
                strokeColor: '#1f77b4',
                strokeWidth: 2,
                straightFirst: true,
                straightLast: true,
            });
        });

        // Tạo các góc nội của đa giác và lưu để tính tổng
        const angles: JXG.Angle[] = points.map((point, i) => {
            const prevPoint = points[(i - 1 + points.length) % points.length];
            const nextPoint = points[(i + 1) % points.length];
            return board.create('angle', [nextPoint, point, prevPoint], {
                radius: 0.8,
                fillColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                fillOpacity: 0.3,
                strokeColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                strokeWidth: 1,
            });
        });

        // Hiển thị độ dài các cạnh
        lines.forEach((line, i) => {
            const point1 = points[i];
            const point2 = points[(i + 1) % points.length];
            board.create(
                'text',
                [
                    () => (point1.X() + point2.X()) / 2,
                    () => (point1.Y() + point2.Y()) / 2 + (i % 2 === 0 ? -0.3 : 0.3),
                    () =>
                        `${point1.name}${point2.name} = ${Math.sqrt(
                            (point2.X() - point1.X()) ** 2 + (point2.Y() - point1.Y()) ** 2
                        ).toFixed(2)}`,
                ],
                { fontSize: 12, fixed: true }
            );
        });

        // Hiển thị số đo các góc nội
        points.forEach((point, i) => {
            const prevPoint = points[(i - 1 + points.length) % points.length];
            const nextPoint = points[(i + 1) % points.length];
            const angle = board.create('angle', [nextPoint, point, prevPoint], { visible: false });
            board.create(
                'text',
                [
                    () => point.X() + (i % 2 === 0 ? 0.5 : -0.5),
                    () => point.Y() + (i % 2 === 0 ? 0.5 : -0.5),
                    () => `${((angle.Value() * 180) / Math.PI).toFixed(1)}°`,
                ],
                { fontSize: 12, fixed: true }
            );
        });

        // Hiển thị loại đa giác và tổng góc nội động
        board.create(
            'text',
            [
                2,
                4,
                () => {
                    const n = points.length;
                    const sumAngles = angles
                        .reduce((sum, angle) => sum + (angle.Value() * 180) / Math.PI, 0)
                        .toFixed(1);
                    return `Đa giác ${n} cạnh, tổng góc nội: ${sumAngles}°`;
                },
            ],
            { fontSize: 16, fontWeight: 'bold' }
        );
    };

    useEffect(() => {
        if (polyBoardRef.current) {
            const board = JXG.JSXGraph.initBoard(polyBoardRef.current.id, {
                boundingbox: [-1, 5, 5, -1],
                axis: true,
                showNavigation: true,
                showCopyright: false,
            });
            createPolygon(board);
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
                            Đa giác
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Di chuyển các đỉnh để thay đổi hình dạng đa giác. Mặc định hiển thị đa
                            giác lồi. Độ dài cạnh và số đo góc sẽ hiển thị trực tiếp.
                        </Typography>
                        <div
                            id="polygon-container"
                            ref={polyBoardRef}
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
                            Tính chất của đa giác
                        </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemText primary="Đa giác là hình có từ ba cạnh trở lên." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Tổng các góc trong của đa giác n cạnh là (n-2)×180°." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Đa giác đều là đa giác có tất cả các cạnh bằng nhau và các góc bằng nhau." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Số đường chéo của đa giác n cạnh là n(n-3)/2." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Đa giác lồi có tất cả các góc trong nhỏ hơn 180°." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Đa giác lõm có ít nhất một góc trong lớn hơn 180°." />
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}

export default PolygonGeometryView;
