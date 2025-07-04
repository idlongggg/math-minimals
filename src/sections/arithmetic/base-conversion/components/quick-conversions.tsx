// Quick conversions component

import { InlineMath } from 'react-katex';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { Iconify } from 'src/components/iconify';

import { BASE_INFO, QUICK_CONVERSIONS } from '../constants';

import type { QuickConversion } from '../types';

interface QuickConversionsProps {
  onConversionClick: (conversion: QuickConversion) => void;
}

export function QuickConversions({ onConversionClick }: QuickConversionsProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pb: 3 }}>
      <Typography variant="h6">Chuyển đổi nhanh</Typography>

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
        {QUICK_CONVERSIONS.map((conversion, index) => (
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
            onClick={() => onConversionClick(conversion)}
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
                  {conversion.label}
                </Typography>
                <Box component="div" sx={{ fontSize: '1.1rem', my: 1 }}>
                  <InlineMath
                    math={`${conversion.example}_{(${conversion.from})} \\rightarrow ?_{(${conversion.to})}`}
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

      <BaseInfoTable />
    </Box>
  );
}

function BaseInfoTable() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Thông tin các hệ cơ số
        </Typography>
        <Box sx={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th
                  style={{
                    padding: 12,
                    borderBottom: '2px solid #ddd',
                    textAlign: 'left',
                  }}
                >
                  Hệ cơ số
                </th>
                <th
                  style={{
                    padding: 12,
                    borderBottom: '2px solid #ddd',
                    textAlign: 'left',
                  }}
                >
                  Tên gọi
                </th>
                <th
                  style={{
                    padding: 12,
                    borderBottom: '2px solid #ddd',
                    textAlign: 'left',
                  }}
                >
                  Các chữ số
                </th>
                <th
                  style={{
                    padding: 12,
                    borderBottom: '2px solid #ddd',
                    textAlign: 'left',
                  }}
                >
                  Ví dụ
                </th>
              </tr>
            </thead>
            <tbody>
              {BASE_INFO.map((base) => (
                <tr key={base.base}>
                  <td
                    style={{
                      padding: 12,
                      borderBottom: '1px solid #ddd',
                      fontWeight: 'bold',
                      fontSize: '1.1rem',
                    }}
                  >
                    {base.base}
                  </td>
                  <td
                    style={{
                      padding: 12,
                      borderBottom: '1px solid #ddd',
                    }}
                  >
                    {base.name}
                  </td>
                  <td
                    style={{
                      padding: 12,
                      borderBottom: '1px solid #ddd',
                      fontFamily: 'monospace',
                    }}
                  >
                    {base.digits}
                  </td>
                  <td
                    style={{
                      padding: 12,
                      borderBottom: '1px solid #ddd',
                      fontFamily: 'monospace',
                    }}
                  >
                    {base.examples.join(', ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </CardContent>
    </Card>
  );
}
