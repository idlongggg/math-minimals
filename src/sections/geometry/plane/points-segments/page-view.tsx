'use client';

import 'mathlive';

import JXG from 'jsxgraph';
import { useRef, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { List, ListItem, ListItemText } from '@mui/material';

export function PointsSegmentsPlaneGeometryView() {
    const pointsBoardRef = useRef<HTMLDivElement>(null);
    const segmentBoardRef = useRef<HTMLDivElement>(null);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [selectedPoint, setSelectedPoint] = useState<JXG.Point | null>(null);
    const [pointCoords, setPointCoords] = useState({ x: 0, y: 0 });

    const createPoints = (board: JXG.Board) => {
        board.create('point', [-3, -1], { name: 'A', size: 3 });
        board.create('point', [1, -1], { name: 'B', size: 3 });
        board.create('point', [0, 2], { name: 'C', size: 3 });

        // Thêm sự kiện click để tạo điểm mới
        let pointCount = 3;
        board.on('down', (e: any) => {
            const coords = board.getUsrCoordsOfMouse(e);
            const pointName = String.fromCharCode(65 + pointCount);
            if (!board.getAllObjectsUnderMouse(e).length) {
                board.create('point', [coords[0], coords[1]], { name: pointName, size: 3 });
                pointCount++;
            }
        });

        // Thêm sự kiện double click để mở popover
        board.on('dblclick', (e: any) => {
            const targets = board.getAllObjectsUnderMouse(e);
            const point = targets.find((obj: any) => obj.elType === 'point') as JXG.Point;
            if (point) {
                setSelectedPoint(point);
                setPointCoords({ x: point.X(), y: point.Y() });
                setAnchorEl(e.target as HTMLElement);
            }
        });
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

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedPoint(null);
    };

    const handleUpdateCoords = () => {
        if (selectedPoint) {
            selectedPoint.setPosition(JXG.COORDS_BY_USER, [pointCoords.x, pointCoords.y]);
            selectedPoint.board.update();
        }
        handleClose();
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
                            Di chuyển các điểm tự do trên mặt phẳng hoặc click để tạo điểm mới
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

            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="h6">Chỉnh tọa độ điểm</Typography>
                    <TextField
                        label="Tọa độ X"
                        type="number"
                        value={pointCoords.x}
                        onChange={(e) =>
                            setPointCoords({ ...pointCoords, x: parseFloat(e.target.value) })
                        }
                    />
                    <TextField
                        label="Tọa độ Y"
                        type="number"
                        value={pointCoords.y}
                        onChange={(e) =>
                            setPointCoords({ ...pointCoords, y: parseFloat(e.target.value) })
                        }
                    />
                    <Button variant="contained" onClick={handleUpdateCoords}>
                        Cập nhật
                    </Button>
                </Box>
            </Popover>
        </Box>
    );
}
