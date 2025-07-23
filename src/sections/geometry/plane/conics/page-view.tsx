'use client';

import JXG from 'jsxgraph';
import { useRef, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { List, ListItem, ListItemText } from '@mui/material';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`conic-tabpanel-${index}`}
            aria-labelledby={`conic-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `conic-tab-${index}`,
        'aria-controls': `conic-tabpanel-${index}`,
    };
}

export function ConicSectionView() {
    const [tabValue, setTabValue] = useState(0);
    const ellipseBoardRef = useRef<HTMLDivElement>(null);
    const parabolaBoardRef = useRef<HTMLDivElement>(null);
    const hyperbolaBoardRef = useRef<HTMLDivElement>(null);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    // Tạo hình elip
    useEffect(() => {
        if (ellipseBoardRef.current) {
            const board = JXG.JSXGraph.initBoard(ellipseBoardRef.current.id, {
                boundingbox: [-8, 8, 8, -8],
                axis: true,
                showNavigation: true,
                showCopyright: false,
            });

            // Tạo tâm elip
            const center = board.create('point', [0, 0], {
                name: 'C',
                size: 3,
                color: '#2ca02c',
            });

            // Tạo bán trục lớn và nhỏ
            const a = 5;
            const b = 3;

            // Tạo elip bằng phương trình tham số
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

            // Tạo tiêu điểm
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

            // Hiển thị thông số
            board.create(
                'text',
                [-7, 7, () => `Tâm: (${center.X().toFixed(2)}, ${center.Y().toFixed(2)})`],
                {
                    fontSize: 14,
                    fixed: true,
                    color: '#2ca02c',
                }
            );

            board.create(
                'text',
                [
                    -7,
                    6.5,
                    () => `Tiêu điểm F₁: (${focus1.X().toFixed(2)}, ${focus1.Y().toFixed(2)})`,
                ],
                {
                    fontSize: 14,
                    fixed: true,
                    color: '#d62728',
                }
            );

            board.create(
                'text',
                [-7, 6, () => `Tiêu điểm F₂: (${focus2.X().toFixed(2)}, ${focus2.Y().toFixed(2)})`],
                {
                    fontSize: 14,
                    fixed: true,
                    color: '#d62728',
                }
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
    }, []);

    // Tạo hình parabol
    useEffect(() => {
        if (parabolaBoardRef.current) {
            const board = JXG.JSXGraph.initBoard(parabolaBoardRef.current.id, {
                boundingbox: [-8, 8, 8, -8],
                axis: true,
                showNavigation: true,
                showCopyright: false,
            });

            // Tạo tiêu điểm
            const focus = board.create('point', [0, 2], {
                name: 'F',
                size: 3,
                color: '#d62728',
            });

            // Tạo đường chuẩn (directrix)
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

            // Tạo parabol
            const parabola = board.create('parabola', [focus, directrix], {
                strokeColor: '#ff7f0e',
                strokeWidth: 2,
            });

            // Hiển thị thông số
            board.create(
                'text',
                [-7, 7, () => `Tiêu điểm F: (${focus.X().toFixed(2)}, ${focus.Y().toFixed(2)})`],
                {
                    fontSize: 14,
                    fixed: true,
                    color: '#d62728',
                }
            );

            board.create(
                'text',
                [
                    -7,
                    6.5,
                    () =>
                        `Khoảng cách đến đường chuẩn: ${Math.abs(focus.Y() - directrix.point1.Y()).toFixed(2)}`,
                ],
                {
                    fontSize: 14,
                    fixed: true,
                    color: '#9467bd',
                }
            );

            board.create(
                'text',
                [
                    -7,
                    6,
                    () =>
                        `Tham số tiêu (p): ${Math.abs(focus.Y() - directrix.point1.Y()).toFixed(2)}`,
                ],
                {
                    fontSize: 14,
                    fixed: true,
                    color: '#ff7f0e',
                }
            );
        }
    }, []);

    // Tạo hình hyperbol
    useEffect(() => {
        if (hyperbolaBoardRef.current) {
            const board = JXG.JSXGraph.initBoard(hyperbolaBoardRef.current.id, {
                boundingbox: [-10, 10, 10, -10],
                axis: true,
                showNavigation: true,
                showCopyright: false,
            });

            // Tạo tâm hyperbol
            const center = board.create('point', [0, 0], {
                name: 'C',
                size: 3,
                color: '#e377c2',
            });

            // Tạo bán trục thực và ảo
            const a = 4;
            const b = 3;

            // Tạo hyperbol bằng phương trình tham số
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

            // Tạo tiêu điểm
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

            // Hiển thị thông số
            board.create(
                'text',
                [-9, 9, () => `Tâm: (${center.X().toFixed(2)}, ${center.Y().toFixed(2)})`],
                {
                    fontSize: 14,
                    fixed: true,
                    color: '#e377c2',
                }
            );

            board.create(
                'text',
                [
                    -9,
                    8.5,
                    () => `Tiêu điểm F₁: (${focus1.X().toFixed(2)}, ${focus1.Y().toFixed(2)})`,
                ],
                {
                    fontSize: 14,
                    fixed: true,
                    color: '#d62728',
                }
            );

            board.create(
                'text',
                [-9, 8, () => `Tiêu điểm F₂: (${focus2.X().toFixed(2)}, ${focus2.Y().toFixed(2)})`],
                {
                    fontSize: 14,
                    fixed: true,
                    color: '#d62728',
                }
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
    }, []);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Các Đường Conic
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Di chuyển các điểm để khám phá các tính chất của từng đường conic.
                    </Typography>

                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        aria-label="Conic sections tabs"
                    >
                        <Tab label="Elip" {...a11yProps(0)} />
                        <Tab label="Parabol" {...a11yProps(1)} />
                        <Tab label="Hyperbol" {...a11yProps(2)} />
                    </Tabs>

                    <TabPanel value={tabValue} index={0}>
                        <Box sx={{ display: 'flex', gap: 3 }}>
                            <Box sx={{ flex: 1 }}>
                                <div
                                    id="ellipse-container"
                                    ref={ellipseBoardRef}
                                    style={{ width: '100%', height: '500px' }}
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
                                            <ListItemText
                                                primary="Tâm sai"
                                                secondary="e = c/a (0 < e < 1)"
                                            />
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
                        </Box>
                    </TabPanel>

                    <TabPanel value={tabValue} index={1}>
                        <Box sx={{ display: 'flex', gap: 3 }}>
                            <Box sx={{ flex: 1 }}>
                                <div
                                    id="parabola-container"
                                    ref={parabolaBoardRef}
                                    style={{ width: '100%', height: '500px' }}
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
                                            <ListItemText
                                                primary="Tiêu điểm"
                                                secondary="Điểm F cố định"
                                            />
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
                        </Box>
                    </TabPanel>

                    <TabPanel value={tabValue} index={2}>
                        <Box sx={{ display: 'flex', gap: 3 }}>
                            <Box sx={{ flex: 1 }}>
                                <div
                                    id="hyperbola-container"
                                    ref={hyperbolaBoardRef}
                                    style={{ width: '100%', height: '500px' }}
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
                        </Box>
                    </TabPanel>
                </CardContent>
            </Card>
        </Box>
    );
}

export default ConicSectionView;
