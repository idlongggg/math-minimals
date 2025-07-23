'use client';

import JXG from 'jsxgraph';
import { useRef, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { List, ListItem, ListItemText } from '@mui/material';

export function ConicSectionView() {
    const ellipseBoardRef = useRef<HTMLDivElement>(null);
    const parabolaBoardRef = useRef<HTMLDivElement>(null);
    const hyperbolaBoardRef = useRef<HTMLDivElement>(null);
    const [boards, setBoards] = useState<{ [key: string]: JXG.Board | null }>({
        ellipse: null,
        parabola: null,
        hyperbola: null,
    });

    // Hàm khởi tạo và hủy board
    const initBoard = (
        ref: React.RefObject<HTMLDivElement>,
        type: string,
        config: JXG.BoundingBox
    ) => {
        if (ref.current && !boards[type]) {
            const board = JXG.JSXGraph.initBoard(ref.current.id, {
                boundingbox: config,
                axis: true,
                showNavigation: true,
                showCopyright: false,
            });
            setBoards((prev) => ({ ...prev, [type]: board }));
            return board;
        }
        return boards[type];
    };

    const destroyBoard = (type: string) => {
        if (boards[type]) {
            JXG.JSXGraph.freeBoard(boards[type]!);
            setBoards((prev) => ({ ...prev, [type]: null }));
        }
    };

    // Tạo hình elip
    useEffect(() => {
        if (ellipseBoardRef.current) {
            destroyBoard('ellipse');
            const board = initBoard(ellipseBoardRef, 'ellipse', [-8, 8, 8, -8]);
            if (board) {
                const center = board.create('point', [0, 0], {
                    name: 'C',
                    size: 3,
                    color: '#2ca02c',
                });

                const a = 5;
                const b = 3;

                const ellipse = board.create(
                    'curve',
                    [
                        (t) => center.X() + a * Math.cos(t),
                        (t) => center.Y() + b * Math.sin(t),
                        [0, 2 * Math.PI],
                    ],
                    {
                        strokeColor: '#2ca02c',
                        strokeWidth: 2,
                        fillColor: '#98df8a',
                        fillOpacity: 0.2,
                    }
                );

                const c = Math.sqrt(a * a - b * b);
                const focus1 = board.create('point', [center.X() - c, center.Y()], {
                    name: 'F₁',
                    size: 3,
                    color: '#d62728',
                });

                const focus2 = board.create('point', [center.X() + c, center.Y()], {
                    name: 'F₂',
                    size: 3,
                    color: '#d62728',
                });

                board.create(
                    'text',
                    [-7, 7, () => `Tâm: (${center.X().toFixed(2)}, ${center.Y().toFixed(2)})`],
                    { fontSize: 14, fixed: true, color: '#2ca02c' }
                );

                board.create(
                    'text',
                    [
                        -7,
                        6.5,
                        () => `Tiêu điểm F₁: (${focus1.X().toFixed(2)}, ${focus1.Y().toFixed(2)})`,
                    ],
                    { fontSize: 14, fixed: true, color: '#d62728' }
                );

                board.create(
                    'text',
                    [
                        -7,
                        6,
                        () => `Tiêu điểm F₂: (${focus2.X().toFixed(2)}, ${focus2.Y().toFixed(2)})`,
                    ],
                    { fontSize: 14, fixed: true, color: '#d62728' }
                );

                board.create('text', [-7, 5.5, () => `Trục lớn: ${(2 * a).toFixed(2)}`], {
                    fontSize: 14,
                    fixed: true,
                    color: '#2ca02c',
                });

                board.create('text', [-7, 5, () => `Trục nhỏ: ${(2 * b).toFixed(2)}`], {
                    fontSize: 14,
                    fixed: true,
                    color: '#2ca02c',
                });

                board.create('text', [-7, 4.5, () => `Tiêu cự: ${(2 * c).toFixed(2)}`], {
                    fontSize: 14,
                    fixed: true,
                    color: '#d62728',
                });
            }
        }
        return () => {
            destroyBoard('ellipse');
        };
    }, []);

    // Tạo hình parabol
    useEffect(() => {
        if (parabolaBoardRef.current) {
            destroyBoard('parabola');
            const board = initBoard(parabolaBoardRef, 'parabola', [-8, 8, 8, -8]);
            if (board) {
                const focus = board.create('point', [0, 2], {
                    name: 'F',
                    size: 3,
                    color: '#d62728',
                });

                const directrix = board.create(
                    'line',
                    [
                        [0, -2],
                        [1, -2],
                    ],
                    {
                        name: 'Directrix',
                        strokeColor: '#9467bd',
                        strokeWidth: 2,
                        dash: 2,
                    }
                );

                const parabola = board.create('parabola', [focus, directrix], {
                    strokeColor: '#ff7f0e',
                    strokeWidth: 2,
                });

                board.create(
                    'text',
                    [
                        -7,
                        7,
                        () => `Tiêu điểm F: (${focus.X().toFixed(2)}, ${focus.Y().toFixed(2)})`,
                    ],
                    { fontSize: 14, fixed: true, color: '#d62728' }
                );

                board.create(
                    'text',
                    [
                        -7,
                        6.5,
                        () =>
                            `Khoảng cách đến đường chuẩn: ${Math.abs(focus.Y() - directrix.point1.Y()).toFixed(2)}`,
                    ],
                    { fontSize: 14, fixed: true, color: '#9467bd' }
                );

                board.create(
                    'text',
                    [
                        -7,
                        6,
                        () =>
                            `Tham số tiêu (p): ${Math.abs(focus.Y() - directrix.point1.Y()).toFixed(2)}`,
                    ],
                    { fontSize: 14, fixed: true, color: '#ff7f0e' }
                );
            }
        }
        return () => {
            destroyBoard('parabola');
        };
    }, []);

    // Tạo hình hyperbol
    useEffect(() => {
        if (hyperbolaBoardRef.current) {
            destroyBoard('hyperbola');
            const board = initBoard(hyperbolaBoardRef, 'hyperbola', [-10, 10, 10, -10]);
            if (board) {
                const center = board.create('point', [0, 0], {
                    name: 'C',
                    size: 3,
                    color: '#e377c2',
                });

                const a = 4;
                const b = 3;

                const hyperbola1 = board.create(
                    'curve',
                    [
                        (t) => center.X() + a * Math.cosh(t),
                        (t) => center.Y() + b * Math.sinh(t),
                        [-3, 3],
                    ],
                    {
                        strokeColor: '#e377c2',
                        strokeWidth: 2,
                    }
                );

                const hyperbola2 = board.create(
                    'curve',
                    [
                        (t) => center.X() - a * Math.cosh(t),
                        (t) => center.Y() + b * Math.sinh(t),
                        [-3, 3],
                    ],
                    {
                        strokeColor: '#e377c2',
                        strokeWidth: 2,
                    }
                );

                const c = Math.sqrt(a * a + b * b);
                const focus1 = board.create('point', [center.X() - c, center.Y()], {
                    name: 'F₁',
                    size: 3,
                    color: '#d62728',
                });

                const focus2 = board.create('point', [center.X() + c, center.Y()], {
                    name: 'F₂',
                    size: 3,
                    color: '#d62728',
                });

                board.create(
                    'text',
                    [-9, 9, () => `Tâm: (${center.X().toFixed(2)}, ${center.Y().toFixed(2)})`],
                    { fontSize: 14, fixed: true, color: '#e377c2' }
                );

                board.create(
                    'text',
                    [
                        -9,
                        8.5,
                        () => `Tiêu điểm F₁: (${focus1.X().toFixed(2)}, ${focus1.Y().toFixed(2)})`,
                    ],
                    { fontSize: 14, fixed: true, color: '#d62728' }
                );

                board.create(
                    'text',
                    [
                        -9,
                        8,
                        () => `Tiêu điểm F₂: (${focus2.X().toFixed(2)}, ${focus2.Y().toFixed(2)})`,
                    ],
                    { fontSize: 14, fixed: true, color: '#d62728' }
                );

                board.create('text', [-9, 7.5, () => `Độ dài trục thực: ${(2 * a).toFixed(2)}`], {
                    fontSize: 14,
                    fixed: true,
                    color: '#e377c2',
                });

                board.create('text', [-9, 7, () => `Khoảng cách tiêu cự: ${(2 * c).toFixed(2)}`], {
                    fontSize: 14,
                    fixed: true,
                    color: '#d62728',
                });
            }
        }
        return () => {
            destroyBoard('hyperbola');
        };
    }, []);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Các Đường Conic
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
                Di chuyển các điểm để khám phá các tính chất của từng đường conic.
            </Typography>

            {/* Card Elip */}
            <Card sx={{ display: 'flex', gap: 2, p: 2 }}>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" gutterBottom>
                        Elip
                    </Typography>
                    <div
                        id="ellipse-container-unique"
                        ref={ellipseBoardRef}
                        style={{ width: '100%', height: '400px' }}
                    />
                </Box>
                <Card sx={{ width: '350px' }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Tính chất Elip
                        </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemText
                                    primary="Định nghĩa"
                                    secondary="Tập hợp các điểm có tổng khoảng cách đến hai điểm cố định (tiêu điểm) là hằng số"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Phương trình chính tắc"
                                    secondary="(x²/a²) + (y²/b²) = 1"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Tiêu điểm"
                                    secondary="Hai điểm F₁, F₂ cố định"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Trục lớn"
                                    secondary="Đoạn thẳng dài nhất đi qua tâm và hai tiêu điểm"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Trục nhỏ"
                                    secondary="Đoạn thẳng ngắn nhất đi qua tâm, vuông góc với trục lớn"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Tâm sai" secondary="e = c/a (0 < e < 1)" />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Ứng dụng"
                                    secondary="Quỹ đạo các hành tinh, kiến trúc, y học"
                                />
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            </Card>

            {/* Card Parabol */}
            <Card sx={{ display: 'flex', gap: 2, p: 2 }}>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" gutterBottom>
                        Parabol
                    </Typography>
                    <div
                        id="parabola-container-unique"
                        ref={parabolaBoardRef}
                        style={{ width: '100%', height: '400px' }}
                    />
                </Box>
                <Card sx={{ width: '350px' }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Tính chất Parabol
                        </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemText
                                    primary="Định nghĩa"
                                    secondary="Tập hợp các điểm cách đều một điểm cố định (tiêu điểm) và một đường thẳng cố định (đường chuẩn)"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Phương trình chính tắc"
                                    secondary="y² = 4px"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Tiêu điểm" secondary="Điểm F cố định" />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Đường chuẩn"
                                    secondary="Đường thẳng cố định"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Đỉnh"
                                    secondary="Điểm giữa của tiêu điểm và đường chuẩn"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Tham số tiêu"
                                    secondary="Khoảng cách từ tiêu điểm đến đường chuẩn"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Ứng dụng"
                                    secondary="Anten vệ tinh, gương cầu lồi, đèn pha"
                                />
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            </Card>

            {/* Card Hyperbol */}
            <Card sx={{ display: 'flex', gap: 2, p: 2 }}>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" gutterBottom>
                        Hyperbol
                    </Typography>
                    <div
                        id="hyperbola-container-unique"
                        ref={hyperbolaBoardRef}
                        style={{ width: '100%', height: '400px' }}
                    />
                </Box>
                <Card sx={{ width: '350px' }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Tính chất Hyperbol
                        </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemText
                                    primary="Định nghĩa"
                                    secondary="Tập hợp các điểm có hiệu khoảng cách đến hai điểm cố định (tiêu điểm) là hằng số"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Phương trình chính tắc"
                                    secondary="(x²/a²) - (y²/b²) = 1"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Tiêu điểm"
                                    secondary="Hai điểm F₁, F₂ cố định"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Trục thực"
                                    secondary="Đoạn thẳng nối hai đỉnh của hyperbol"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Trục ảo"
                                    secondary="Đoạn thẳng vuông góc với trục thực tại trung điểm"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Đường tiệm cận"
                                    secondary="Hai đường thẳng mà hyperbol tiến gần đến vô cùng"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Ứng dụng"
                                    secondary="Hệ thống định vị, thiên văn học, kính thiên văn"
                                />
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            </Card>
        </Box>
    );
}

export default ConicSectionView;
