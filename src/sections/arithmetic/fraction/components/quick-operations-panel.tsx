import { BlockMath } from 'react-katex';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';

import { Iconify } from 'src/components/iconify';

import { QUICK_OPERATIONS } from '../constants';
import {
    addFractions,
    divideFractions,
    formatFraction,
    fractionToDecimal,
    multiplyFractions,
    subtractFractions,
} from '../utils';

import type { QuickOperation } from '../types';

interface QuickOperationsPanelProps {
  onOperationSelect?: (operation: QuickOperation) => void;
}

/**
 * Component hiển thị các phép toán nhanh được định nghĩa sẵn
 * Cho phép người dùng thực hiện các phép tính phổ biến một cách nhanh chóng
 */
export function QuickOperationsPanel({
  onOperationSelect,
}: QuickOperationsPanelProps) {
  const executeOperation = (operation: QuickOperation): string => {
    const { fractions, operation: op } = operation;

    if (fractions.length < 1) return '';

    let result;
    let resultText = '';

    if (op === 'convert' && fractions.length === 1) {
      // Chuyển đổi phân số
      const fraction = fractions[0];
      const decimal = fractionToDecimal(fraction);
      const percentage = decimal * 100;

      resultText = `${formatFraction(fraction)} = ${decimal} = ${percentage}\\%`;
    } else if (fractions.length === 2) {
      // Phép tính với hai phân số
      const [f1, f2] = fractions;
      let symbol = '';

      switch (op) {
        case 'add':
          result = addFractions(f1, f2);
          symbol = '+';
          break;
        case 'subtract':
          result = subtractFractions(f1, f2);
          symbol = '-';
          break;
        case 'multiply':
          result = multiplyFractions(f1, f2);
          symbol = '×';
          break;
        case 'divide':
          result = divideFractions(f1, f2);
          symbol = '÷';
          break;
        default:
          return '';
      }

      if (result) {
        resultText = `${formatFraction(f1)} ${symbol} ${formatFraction(f2)} = ${formatFraction(result)}`;
      }
    }

    return resultText;
  };

  const handleOperationClick = (operation: QuickOperation) => {
    if (onOperationSelect) {
      onOperationSelect(operation);
    }
  };

  return (
    <Card>
      <CardHeader
        title="Phép toán nhanh"
        subheader="Các ví dụ phổ biến được định nghĩa sẵn"
        avatar={<Iconify icon="solar:case-minimalistic-bold" width={24} />}
      />

      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {QUICK_OPERATIONS.map((operation, index) => {
            const resultText = executeOperation(operation);

            return (
              <Card
                key={index}
                variant="outlined"
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: 'action.hover',
                    borderColor: 'primary.main',
                  },
                }}
                onClick={() => handleOperationClick(operation)}
              >
                <CardContent sx={{ py: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <Chip
                      label={operation.label}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                    <Button
                      size="small"
                      variant="text"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOperationClick(operation);
                      }}
                    >
                      Thực hiện
                    </Button>
                  </Box>

                  {resultText && (
                    <Box
                      sx={{ mt: 1, p: 1, bgcolor: 'grey.50', borderRadius: 1 }}
                    >
                      <BlockMath math={resultText} />
                    </Box>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
}
