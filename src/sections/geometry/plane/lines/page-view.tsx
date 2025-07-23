'use client';

import 'mathlive';

import JXG from 'jsxgraph';
import { useRef, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { List, ListItem, ListItemText } from '@mui/material';

export function LinesPlaneGeometryView() {
    const lineBoardRef = useRef<HTMLDivElement>(null);

    const createLine = (board: JXG.Board) => {
        const Q1 = board.create('point', [-3, -2], { name: 'Q1', size: 3 });
        const Q2 = board.create('point', [2, 2], { name: 'Q2', size: 3 });

        board.create('line', [Q1, Q2], {
            name: 'Đường thẳng',
            strokeColor: '#ff7f0e',
            strokeWidth: 2,
            highlightStrokeColor: '#ff7f0e',
            highlightStrokeWidth: 2,
            straightFirst: true,
            straightLast: true,
        });
    };

    useEffect(() => {
        if (lineBoardRef.current) {
            const board = JXG.JSXGraph.initBoard(lineBoardRef.current.id, {
                boundingbox: [-5, 5, 5, -5],
                axis: true,
                showNavigation: true,
                showCopyright: false,
            });
            createLine(board);
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
                            Đường thẳng
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Di chuyển các điểm để thay đổi đường thẳng (màu cam)
                        </Typography>
                        <div
                            id="line-container"
                            ref={lineBoardRef}
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
                            Tính chất của đường thẳng
                        </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemText primary="Đường thẳng là tập hợp vô hạn các điểm kéo dài vô tận về hai phía." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Đường thẳng không có điểm bắt đầu và kết thúc." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Qua hai điểm phân biệt chỉ có duy nhất một đường thẳng." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Đường thẳng có thể được xác định bởi hai điểm bất kỳ thuộc nó." />
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}

export default LinesPlaneGeometryView;
