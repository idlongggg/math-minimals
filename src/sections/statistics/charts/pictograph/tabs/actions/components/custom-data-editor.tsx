import Box from '@mui/material/Box';
import { Card } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';

import { AddIcon, CloseIcon, ResetIcon } from 'src/assets/icons';

import { AVAILABLE_ICONS, AVAILABLE_COLORS } from '../data/constants';

import type { PictographActions } from '../data/types';
import type { PictographData } from '../pictograph-chart';

interface CustomDataEditorProps {
    customData: PictographData[];
    actions: PictographActions;
}

export function CustomDataEditor({ customData, actions }: CustomDataEditorProps) {
    const theme = useTheme();

    return (
        <Box sx={{ mb: 3 }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 2,
                }}
            >
                <Typography variant="subtitle2">Dữ liệu tùy chỉnh</Typography>
                <IconButton size="small" onClick={actions.addCustomCategory} color="primary">
                    <AddIcon />
                </IconButton>
                <IconButton size="small" onClick={actions.resetCustomData} color="warning">
                    <ResetIcon />
                </IconButton>
            </Box>

            {customData.map((item, index) => (
                <Card
                    key={index}
                    variant="outlined"
                    sx={{
                        p: 2,
                        mb: 2,
                        '&:hover': {
                            borderColor: theme.palette.primary.main,
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            mb: 1,
                        }}
                    >
                        <TextField
                            size="small"
                            label="Tên danh mục"
                            value={item.category}
                            onChange={(e) =>
                                actions.updateCustomCategory(index, 'category', e.target.value)
                            }
                            sx={{ flex: 1 }}
                        />
                        <IconButton
                            size="small"
                            onClick={() => actions.removeCustomCategory(index)}
                            color="error"
                            disabled={customData.length <= 1}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <TextField
                        size="small"
                        label="Giá trị"
                        type="number"
                        value={item.value}
                        onChange={(e) =>
                            actions.updateCustomCategory(index, 'value', Number(e.target.value))
                        }
                        sx={{ mb: 1, width: '100%' }}
                    />

                    <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                        <FormControl size="small" sx={{ flex: 1 }}>
                            <InputLabel>Biểu tượng</InputLabel>
                            <Select
                                value={item.icon}
                                label="Biểu tượng"
                                onChange={(e) =>
                                    actions.updateCustomCategory(index, 'icon', e.target.value)
                                }
                            >
                                {AVAILABLE_ICONS.map((icon) => (
                                    <MenuItem key={icon} value={icon}>
                                        {icon} {icon}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl size="small" sx={{ flex: 1 }}>
                            <InputLabel>Màu sắc</InputLabel>
                            <Select
                                value={item.color}
                                label="Màu sắc"
                                onChange={(e) =>
                                    actions.updateCustomCategory(index, 'color', e.target.value)
                                }
                            >
                                {AVAILABLE_COLORS.map((color) => (
                                    <MenuItem key={color} value={color}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: 16,
                                                    height: 16,
                                                    bgcolor: color,
                                                    borderRadius: '50%',
                                                }}
                                            />
                                            {color}
                                        </Box>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </Card>
            ))}
        </Box>
    );
}
