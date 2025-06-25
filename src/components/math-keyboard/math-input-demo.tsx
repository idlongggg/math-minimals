'use client';

import type { SxProps, Theme } from '@mui/material/styles';

import { useEffect, useRef } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useMathInputRegister } from 'src/components/math-keyboard';

// ----------------------------------------------------------------------

export type MathInputDemoProps = {
  sx?: SxProps<Theme>;
};

export function MathInputDemo({ sx }: MathInputDemoProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { registerInput } = useMathInputRegister();

  useEffect(() => {
    const cleanupInput = registerInput(inputRef);
    const cleanupTextarea = registerInput(textareaRef);

    return () => {
      cleanupInput?.();
      cleanupTextarea?.();
    };
  }, [registerInput]);

  return (
    <Box sx={[{ p: 3, maxWidth: 600, mx: 'auto' }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Demo Bàn phím Toán học
      </Typography>

      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
        Click vào các ô input bên dưới và sử dụng FAB button ở góc phải để mở bàn phím toán học
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          inputRef={inputRef}
          label="Phương trình đơn giản"
          placeholder="Nhập phương trình toán học..."
          fullWidth
          variant="outlined"
        />

        <TextField
          inputRef={textareaRef}
          label="Công thức phức tạp"
          placeholder="Nhập công thức LaTeX phức tạp..."
          multiline
          rows={4}
          fullWidth
          variant="outlined"
        />
      </Box>

      <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
        💡 Mẹo: Bàn phím sẽ tự động chèn ký hiệu LaTeX vào vị trí con trỏ trong ô input đang được
        focus.
      </Typography>
    </Box>
  );
}
