// Quick examples component

import { InlineMath } from 'react-katex';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { Iconify } from 'src/components/iconify';

import { generateDivisionTable } from '../utils';
import {
  QUICK_EXAMPLES,
  TABLE_DIVISORS,
  TABLE_ROWS_COUNT,
  TABLE_START_NUMBER,
} from '../constants';

import type { QuickExample } from '../types';

interface QuickExamplesProps {
  onExampleClick: (example: QuickExample) => void;
}

export function QuickExamples({ onExampleClick }: QuickExamplesProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pb: 3 }}>
      <Typography variant="h6">Ví dụ nhanh</Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: 2,
        }}
      >
        {QUICK_EXAMPLES.map((example, index) => (
          <Card
            key={index}
            sx={{
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: (themeParam) => themeParam.vars.customShadows.z8,
              },
            }}
            onClick={() => onExampleClick(example)}
          >
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  textAlign: 'center',
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  {example.description}
                </Typography>
                <Box component="div" sx={{ fontSize: '1.1rem', my: 1 }}>
                  <InlineMath
                    math={`${example.dividend} \\div ${example.divisor} = ?`}
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                  <Iconify
                    icon="eva:arrowhead-right-fill"
                    sx={{ color: 'primary.main' }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      <DivisionTable />
    </Box>
  );
}

function DivisionTable() {
  const theme = useTheme();

  return (
    <Card>
      <CardHeader
        title={`Bảng chia có dư mẫu (chia cho ${TABLE_DIVISORS.join(', ')})`}
      />
      <CardContent>
        <Box sx={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th
                  style={{
                    padding: 12,
                    borderBottom: '2px solid #ddd',
                    textAlign: 'center',
                  }}
                >
                  Số bị chia
                </th>
                {TABLE_DIVISORS.map((divisor) => (
                  <th
                    key={divisor}
                    style={{
                      padding: 12,
                      borderBottom: '2px solid #ddd',
                      textAlign: 'center',
                    }}
                  >
                    ÷ {divisor}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from(
                { length: TABLE_ROWS_COUNT },
                (_, i) => i + TABLE_START_NUMBER
              ).map((num) => {
                const tableData = generateDivisionTable(num, TABLE_DIVISORS);
                return (
                  <tr
                    key={num}
                    style={{
                      backgroundColor:
                        num % 2 === 0
                          ? theme.palette.action.hover
                          : theme.palette.background.paper,
                    }}
                  >
                    <td
                      style={{
                        padding: 8,
                        textAlign: 'center',
                        fontFamily: 'monospace',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                      }}
                    >
                      {num}
                    </td>
                    {tableData.map(({ divisor, quotient, remainder }) => (
                      <td
                        key={divisor}
                        style={{
                          padding: 8,
                          textAlign: 'center',
                          fontFamily: 'monospace',
                          fontSize: '0.9rem',
                        }}
                      >
                        {quotient} dư {remainder}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Box>
      </CardContent>
    </Card>
  );
}
