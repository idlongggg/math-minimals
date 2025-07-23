'use client';

import JXG from 'jsxgraph';
import { useRef, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { List, ListItem, ListItemText } from '@mui/material';

export function CircleGeometryView() {
    const circleBoardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (circleBoardRef.current) {
            const board = JXG.JSXGraph.initBoard(circleBoardRef.current.id, {
                boundingbox: [-6, 6, 6, -6],
                axis: true,
                showNavigation: true,
                showCopyright: false,
            });

            // Tạo tâm đường tròn (có thể di chuyển)
            const center = board.create('point', [0, 0], {
                name: 'O',
                size: 4,
                color: '#d62728',
                face: 'o',
            });

            // Tạo điểm trên đường tròn (có thể di chuyển để thay đổi bán kính)
            const pointOnCircle = board.create('point', [3, 0], {
                name: 'A',
                size: 3,
                color: '#1f77b4',
            });

            // Tạo đường tròn
            const circle = board.create('circle', [center, pointOnCircle], {
                strokeColor: '#2ca02c',
                strokeWidth: 2,
                fillColor: '#98df8a',
                fillOpacity: 0.3,
            });

            // Vẽ bán kính OA
            const radius = board.create('line', [center, pointOnCircle], {
                strokeColor: '#ff7f0e',
                strokeWidth: 2,
                dash: 2,
            });

            // Vẽ đường kính
            const diameterPoint = board.create(
                'point',
                [
                    () => 2 * center.X() - pointOnCircle.X(),
                    () => 2 * center.Y() - pointOnCircle.Y(),
                ],
                { name: 'B', size: 2, color: '#9467bd' }
            );

            const diameter = board.create('line', [pointOnCircle, diameterPoint], {
                strokeColor: '#9467bd',
                strokeWidth: 1.5,
                dash: 1,
            });

            // Hiển thị thông số
            board.create(
                'text',
                [-5, 5, () => `Tâm O: (${center.X().toFixed(2)}, ${center.Y().toFixed(2)})`],
                {
                    fontSize: 14,
                    fixed: true,
                    fontWeight: 'bold',
                    color: '#d62728',
                }
            );

            board.create('text', [-5, 4.5, () => `Bán kính: ${radius.L().toFixed(2)}`], {
                fontSize: 14,
                fixed: true,
                color: '#ff7f0e',
            });

            board.create('text', [-5, 4, () => `Đường kính: ${(2 * radius.L()).toFixed(2)}`], {
                fontSize: 14,
                fixed: true,
                color: '#9467bd',
            });

            board.create(
                'text',
                [-5, 3.5, () => `Chu vi: ${(2 * Math.PI * radius.L()).toFixed(2)}`],
                {
                    fontSize: 14,
                    fixed: true,
                }
            );

            board.create(
                'text',
                [-5, 3, () => `Diện tích: ${(Math.PI * radius.L() * radius.L()).toFixed(2)}`],
                {
                    fontSize: 14,
                    fixed: true,
                }
            );

            // Tạo tiếp tuyến tại điểm A
            const tangent = board.create('tangent', [pointOnCircle, circle], {
                strokeColor: '#8c564b',
                strokeWidth: 2,
                dash: 3,
            });

            board.create(
                'text',
                [() => pointOnCircle.X() + 1.5, () => pointOnCircle.Y() + 1, 'Tiếp tuyến'],
                { fontSize: 12, color: '#8c564b' }
            );

            // Tạo dây cung: điểm C nằm trên đường tròn
            const chordPoint = board.create('glider', [0, 3, circle], {
                name: 'C',
                size: 3,
                color: '#e377c2',
            });

            // Dây cung nối A và C
            const chord = board.create('segment', [pointOnCircle, chordPoint], {
                strokeColor: '#e377c2',
                strokeWidth: 2,
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
                            Đường tròn & Hình tròn
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Di chuyển tâm O hoặc điểm A để thay đổi vị trí và kích thước.
                            <br />
                            Di chuyển điểm C (màu hồng) để thay đổi dây cung.
                            <br />
                            Các thông số được cập nhật tự động.
                        </Typography>
                        <div
                            id="circle-container"
                            ref={circleBoardRef}
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
                            Tính chất hình tròn
                        </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemText
                                    primary="Đường tròn"
                                    secondary="Tập hợp các điểm cách đều một điểm cố định (tâm) một khoảng không đổi (bán kính)"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Hình tròn"
                                    secondary="Phần mặt phẳng giới hạn bởi đường tròn"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Công thức chu vi" secondary="C = 2πr" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Công thức diện tích" secondary="S = πr²" />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Đường kính"
                                    secondary="Dây cung đi qua tâm, dài gấp đôi bán kính"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Dây cung"
                                    secondary="Đoạn thẳng nối hai điểm trên đường tròn"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Tiếp tuyến"
                                    secondary="Đường thẳng tiếp xúc với đường tròn tại một điểm duy nhất"
                                />
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}

export default CircleGeometryView;
