'use client';

import JXG from 'jsxgraph';
import { useRef, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { List, ListItem, ListItemText } from '@mui/material';

export function ConicGeometryView() {
    const conicBoardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (conicBoardRef.current) {
            const board = JXG.JSXGraph.initBoard(conicBoardRef.current.id, {
                boundingbox: [-10, 8, 10, -8],
                axis: true,
                showNavigation: true,
                showCopyright: false,
            });

            // Tạo tâm elip (có thể di chuyển)
            const center = board.create('point', [0, 0], {
                name: 'O',
                size: 4,
                color: '#d62728',
                face: 'o',
            });

            // Tạo điểm trên trục chính (xác định bán trục a)
            const majorAxisPoint = board.create('point', [5, 0], {
                name: 'A',
                size: 3,
                color: '#1f77b4',
            });

            // Tạo điểm trên trục phụ (xác định bán trục b)
            const minorAxisPoint = board.create('point', [0, 3], {
                name: 'B',
                size: 3,
                color: '#1f77b4',
            });

            // Tạo elip
            const ellipse = board.create('ellipse', [center, majorAxisPoint, minorAxisPoint], {
                strokeColor: '#2ca02c',
                strokeWidth: 2,
                fillColor: '#98df8a',
                fillOpacity: 0.3,
            });

            // Tính toán các thông số elip
            const a = () =>
                Math.sqrt(
                    Math.pow(majorAxisPoint.X() - center.X(), 2) +
                        Math.pow(majorAxisPoint.Y() - center.Y(), 2)
                );

            const b = () =>
                Math.sqrt(
                    Math.pow(minorAxisPoint.X() - center.X(), 2) +
                        Math.pow(minorAxisPoint.Y() - center.Y(), 2)
                );

            const c = () => Math.sqrt(Math.abs(a() ** 2 - b() ** 2));
            const eccentricity = () => c() / Math.max(a(), b());
            const area = () => Math.PI * a() * b();

            // Tính chu vi gần đúng sử dụng công thức Ramanujan
            const perimeter = () => {
                const h = Math.pow((a() - b()) / (a() + b()), 2);
                return Math.PI * (a() + b()) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));
            };

            // Vẽ hai trục
            const majorAxis = board.create(
                'segment',
                [
                    [
                        () => center.X() - (majorAxisPoint.X() - center.X()),
                        () => center.Y() - (majorAxisPoint.Y() - center.Y()),
                    ],
                    majorAxisPoint,
                ],
                {
                    strokeColor: '#ff7f0e',
                    strokeWidth: 1.5,
                    dash: 1,
                }
            );

            const minorAxis = board.create(
                'segment',
                [
                    [
                        () => center.X() - (minorAxisPoint.X() - center.X()),
                        () => center.Y() - (minorAxisPoint.Y() - center.Y()),
                    ],
                    minorAxisPoint,
                ],
                {
                    strokeColor: '#ff7f0e',
                    strokeWidth: 1.5,
                    dash: 1,
                }
            );

            // Tạo tiêu điểm
            const foci = () => {
                const dx = majorAxisPoint.X() - center.X();
                const dy = majorAxisPoint.Y() - center.Y();
                const len = Math.sqrt(dx * dx + dy * dy);
                const ratio = len > 0 ? c() / len : 0;

                return [
                    [center.X() + dx * ratio, center.Y() + dy * ratio],
                    [center.X() - dx * ratio, center.Y() - dy * ratio],
                ];
            };

            const focus1 = board.create('point', [() => foci()[0][0], () => foci()[0][1]], {
                name: 'F1',
                size: 3,
                color: '#bcbd22',
            });

            const focus2 = board.create('point', [() => foci()[1][0], () => foci()[1][1]], {
                name: 'F2',
                size: 3,
                color: '#bcbd22',
            });

            // Hiển thị thông số
            board.create(
                'text',
                [-9, 7, () => `Tâm O: (${center.X().toFixed(2)}, ${center.Y().toFixed(2)})`],
                {
                    fontSize: 14,
                    fixed: true,
                    fontWeight: 'bold',
                    color: '#d62728',
                }
            );

            board.create('text', [-9, 6.5, () => `Bán trục chính: ${a().toFixed(2)}`], {
                fontSize: 14,
                fixed: true,
                color: '#1f77b4',
            });

            board.create('text', [-9, 6, () => `Bán trục phụ: ${b().toFixed(2)}`], {
                fontSize: 14,
                fixed: true,
                color: '#1f77b4',
            });

            board.create('text', [-9, 5.5, () => `Tiêu cự: ${(2 * c()).toFixed(2)}`], {
                fontSize: 14,
                fixed: true,
                color: '#bcbd22',
            });

            board.create('text', [-9, 5, () => `Tâm sai: ${eccentricity().toFixed(3)}`], {
                fontSize: 14,
                fixed: true,
            });

            board.create('text', [-9, 4.5, () => `Diện tích: ${area().toFixed(2)}`], {
                fontSize: 14,
                fixed: true,
            });

            board.create('text', [-9, 4, () => `Chu vi: ${perimeter().toFixed(2)}`], {
                fontSize: 14,
                fixed: true,
            });

            // Tạo điểm di động trên elip
            const pointOnEllipse = board.create('glider', [3, 2, ellipse], {
                name: 'P',
                size: 3,
                color: '#e377c2',
            });

            // Vẽ bán kính vector
            const radiusVector = board.create('segment', [center, pointOnEllipse], {
                strokeColor: '#7f7f7f',
                strokeWidth: 1.5,
                dash: 2,
            });

            // Hiển thị định nghĩa elip
            board.create('text', [0, -7, 'Tổng khoảng cách đến 2 tiêu điểm = 2a'], {
                fontSize: 14,
                fixed: true,
                color: '#2ca02c',
            });
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
                            Đường Conic (Elip)
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Di chuyển tâm O, điểm A (trục chính) hoặc điểm B (trục phụ) để thay đổi
                            hình dạng.
                            <br />
                            Di chuyển điểm P (màu hồng) để thay đổi vị trí trên elip.
                            <br />
                            Các thông số được cập nhật tự động.
                        </Typography>
                        <div
                            id="conic-container"
                            ref={conicBoardRef}
                            style={{
                                width: '500px',
                                height: '500px',
                            }}
                        />
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Tính chất hình Elip
                        </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemText
                                    primary="Định nghĩa"
                                    secondary="Tập hợp các điểm có tổng khoảng cách đến hai điểm cố định (tiêu điểm) là một hằng số"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Tiêu điểm (F1, F2)"
                                    secondary="Hai điểm cố định dùng để xác định elip"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Trục chính"
                                    secondary="Đoạn thẳng dài nhất đi qua tâm và hai tiêu điểm"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Trục phụ"
                                    secondary="Đoạn thẳng ngắn nhất đi qua tâm và vuông góc với trục chính"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Tâm sai (e)"
                                    secondary="Tỉ số giữa khoảng cách từ tâm đến tiêu điểm và bán trục chính (0 < e < 1)"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Công thức diện tích"
                                    secondary="S = π × a × b"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Công thức chu vi (xấp xỉ)"
                                    secondary="P ≈ π × (a + b) × [1 + 3h/(10 + √(4 - 3h))] với h = ((a - b)/(a + b))²"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Phương trình chính tắc"
                                    secondary="(x-h)²/a² + (y-k)²/b² = 1 (a > b)"
                                />
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}

export default ConicGeometryView;
