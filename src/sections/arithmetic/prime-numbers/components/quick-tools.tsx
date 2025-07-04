// Quick tools component for prime numbers

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { Iconify } from 'src/components/iconify';

import { QUICK_CHECKS, FIRST_100_PRIMES } from '../constants';

import type { QuickCheck } from '../types';

interface QuickToolsProps {
  onQuickCheck: (quickCheck: QuickCheck) => void;
  onPrimeClick: (prime: number) => void;
}

export function QuickTools({ onQuickCheck, onPrimeClick }: QuickToolsProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pb: 3 }}>
      <Typography variant="h6">Kiểm tra nhanh</Typography>

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
        {QUICK_CHECKS.map((quickCheck, index) => (
          <Card
            key={index}
            sx={{
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: (theme) => theme.vars.customShadows.z8,
              },
            }}
            onClick={() => onQuickCheck(quickCheck)}
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
                  {quickCheck.label}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Số:
                  </Typography>
                  <Typography
                    variant="h6"
                    color="primary.main"
                    fontWeight="bold"
                  >
                    {quickCheck.example}
                  </Typography>
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

      <Card>
        <CardHeader title="100 số nguyên tố đầu tiên" />
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              maxHeight: 400,
              overflow: 'auto',
            }}
          >
            {FIRST_100_PRIMES.map((prime, index) => (
              <Chip
                key={prime}
                label={`${index + 1}. ${prime}`}
                variant="outlined"
                color="primary"
                onClick={() => onPrimeClick(prime)}
                sx={{ cursor: 'pointer' }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
