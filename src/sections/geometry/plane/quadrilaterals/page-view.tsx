'use client';

import 'mathlive';

import JXG from 'jsxgraph';
import { useRef, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { List, ListItem, ListItemText } from '@mui/material';

export function QuadrilateralGeometryView() {
    const quadBoardRef = useRef<HTMLDivElement>(null);

    const createQuadrilateral = (board: JXG.Board) => {
        // Tạo 4 đỉnh tứ giác lồi mặc định
        const A = board.create('point', [0, 0], { name: 'A', size: 3 });
        const B = board.create('point', [4, 0], { name: 'B', size: 3 });
        const C = board.create('point', [5, 3], { name: 'C', size: 3 });
        const D = board.create('point', [1, 4], { name: 'D', size: 3 });

        // Tạo 4 cạnh tứ giác
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
        const CD = board.create('line', [C, D], {
            strokeColor: '#1f77b4',
            strokeWidth: 2,
            straightFirst: true,
            straightLast: true,
        });
        const DA = board.create('line', [D, A], {
            strokeColor: '#1f77b4',
            strokeWidth: 2,
            straightFirst: true,
            straightLast: true,
        });

        // Tạo 4 góc nội của tứ giác (sửa thứ tự điểm để hiển thị góc nội)
        const angleA = board.create('angle', [B, A, D], {
            radius: 0.8,
            fillColor: '#ff7f0e',
            fillOpacity: 0.3,
            strokeColor: '#ff7f0e',
            strokeWidth: 1,
        });
        const angleB = board.create('angle', [C, B, A], {
            radius: 0.8,
            fillColor: '#2ca02c',
            fillOpacity: 0.3,
            strokeColor: '#2ca02c',
            strokeWidth: 1,
        });
        const angleC = board.create('angle', [D, C, B], {
            radius: 0.8,
            fillColor: '#d62728',
            fillOpacity: 0.3,
            strokeColor: '#d62728',
            strokeWidth: 1,
        });
        const angleD = board.create('angle', [A, D, C], {
            radius: 0.8,
            fillColor: '#9467bd',
            fillOpacity: 0.3,
            strokeColor: '#9467bd',
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
                () => (C.X() + D.X()) / 2,
                () => (C.Y() + D.Y()) / 2 + 0.3,
                () => `CD = ${Math.sqrt((D.X() - C.X()) ** 2 + (D.Y() - C.Y()) ** 2).toFixed(2)}`,
            ],
            { fontSize: 12, fixed: true }
        );
        board.create(
            'text',
            [
                () => (D.X() + A.X()) / 2 - 0.3,
                () => (D.Y() + A.Y()) / 2,
                () => `DA = ${Math.sqrt((A.X() - D.X()) ** 2 + (A.Y() - D.Y()) ** 2).toFixed(2)}`,
            ],
            { fontSize: 12, fixed: true }
        );

        // Hiển thị số đo các góc nội
        board.create(
            'text',
            [
                () => A.X() + 0.8,
                () => A.Y() + 0.5,
                () => `${((angleA.Value() * 180) / Math.PI).toFixed(1)}°`,
            ],
            { fontSize: 12, fixed: true }
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
        board.create(
            'text',
            [
                () => D.X() + 0.5,
                () => D.Y() - 0.5,
                () => `${((angleD.Value() * 180) / Math.PI).toFixed(1)}°`,
            ],
            { fontSize: 12, fixed: true }
        );

        // Hiển thị loại tứ giác
        board.create(
            'text',
            [
                2,
                4,
                () => {
                    const a = Math.sqrt((B.X() - A.X()) ** 2 + (B.Y() - A.Y()) ** 2);
                    const b = Math.sqrt((C.X() - B.X()) ** 2 + (C.Y() - B.Y()) ** 2);
                    const c = Math.sqrt((D.X() - C.X()) ** 2 + (D.Y() - C.Y()) ** 2);
                    const d = Math.sqrt((A.X() - D.X()) ** 2 + (A.Y() - D.Y()) ** 2);

                    const isParallelAB_CD =
                        Math.abs(
                            (B.Y() - A.Y()) / (B.X() - A.X()) - (D.Y() - C.Y()) / (D.X() - C.X())
                        ) < 0.01;
                    const isParallelBC_DA =
                        Math.abs(
                            (C.Y() - B.Y()) / (C.X() - B.X()) - (A.Y() - D.Y()) / (A.X() - D.X())
                        ) < 0.01;

                    if (a === c && b === d && isParallelAB_CD && isParallelBC_DA) {
                        return a === b ? 'Hình vuông' : 'Hình chữ nhật';
                    } else if (isParallelAB_CD && isParallelBC_DA) {
                        return 'Hình bình hành';
                    } else if (a === c && b === d) {
                        return 'Hình thoi';
                    } else if (isParallelAB_CD || isParallelBC_DA) {
                        return 'Hình thang';
                    } else {
                        return 'Tứ giác lồi';
                    }
                },
            ],
            { fontSize: 16, fontWeight: 'bold' }
        );
    };

    useEffect(() => {
        if (quadBoardRef.current) {
            const board = JXG.JSXGraph.initBoard(quadBoardRef.current.id, {
                boundingbox: [-1, 6, 6, -1],
                axis: true,
                showNavigation: true,
                showCopyright: false,
            });
            createQuadrilateral(board);
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
                            Tứ giác
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Di chuyển các đỉnh để thay đổi hình dạng tứ giác. Mặc định hiển thị tứ
                            giác lồi. Độ dài cạnh và số đo góc sẽ hiển thị trực tiếp.
                        </Typography>
                        <div
                            id="quadrilateral-container"
                            ref={quadBoardRef}
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
                            Tính chất của tứ giác
                        </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemText primary="Tứ giác là hình có bốn đỉnh và bốn cạnh." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Tổng bốn góc trong một tứ giác luôn bằng 360°." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Tứ giác có hai cặp cạnh đối song song gọi là hình bình hành." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Hình bình hành có bốn cạnh bằng nhau gọi là hình thoi." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Hình thoi có bốn góc vuông gọi là hình vuông." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Hình bình hành có bốn góc vuông gọi là hình chữ nhật." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Tứ giác có ít nhất một cặp cạnh đối song song gọi là hình thang." />
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}

export default QuadrilateralGeometryView;
