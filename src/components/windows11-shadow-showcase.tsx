'use client';

import { Box, Card, Paper, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export function Windows11ShadowShowcase() {
  const theme = useTheme();

  const shadowExamples = [
    { name: 'Card (z1)', shadow: theme.vars.customShadows.z1 },
    { name: 'Raised (z4)', shadow: theme.vars.customShadows.z4 },
    { name: 'Floating (z8)', shadow: theme.vars.customShadows.z8 },
    { name: 'Dialog (z12)', shadow: theme.vars.customShadows.z12 },
    { name: 'Modal (z16)', shadow: theme.vars.customShadows.z16 },
    { name: 'Flyout', shadow: theme.vars.customShadows.flyout },
    { name: 'Dropdown', shadow: theme.vars.customShadows.dropdown },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Windows 11 Fluent Design Shadows
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Improved shadow system with layered, softer shadows that match Windows 11's Fluent Design
        system.
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 3,
          mb: 6,
        }}
      >
        {shadowExamples.map((example, index) => (
          <Card
            key={example.name}
            sx={{
              p: 3,
              textAlign: 'center',
              boxShadow: example.shadow,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: theme.vars.customShadows.z20,
              },
            }}
          >
            <Typography variant="h6" gutterBottom>
              {example.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Windows 11 style shadow with layered depth and soft edges
            </Typography>
          </Card>
        ))}
      </Box>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Material Elevation Examples
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: 2,
            mt: 2,
          }}
        >
          {[1, 2, 4, 8, 12, 16].map((elevation) => (
            <Paper
              key={elevation}
              elevation={elevation}
              sx={{
                p: 2,
                textAlign: 'center',
                height: 120,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <Typography variant="body2">Elevation {elevation}</Typography>
            </Paper>
          ))}
        </Box>
      </Box>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Acrylic Material Effect
        </Typography>

        <Paper
          sx={{
            p: 4,
            mt: 2,
            position: 'relative',
            overflow: 'hidden',
            ...theme.mixins.acrylicMaterial({
              tint: alpha(theme.palette.primary.main, 0.1),
              opacity: 0.8,
              blur: 40,
            }),
          }}
        >
          <Typography variant="h6" gutterBottom>
            Acrylic Material
          </Typography>
          <Typography variant="body1" color="text.secondary">
            This demonstrates Windows 11's acrylic material effect with blur, tint, and subtle noise
            texture.
          </Typography>
        </Paper>
      </Box>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Enhanced Blur Effects
        </Typography>

        <Paper
          sx={{
            p: 4,
            mt: 2,
            ...theme.mixins.fluentBlur({
              color: alpha(theme.palette.background.paper, 0.85),
              blur: 25,
            }),
          }}
        >
          <Typography variant="h6" gutterBottom>
            Fluent Blur
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Enhanced blur effect with saturation boost for a more modern, Windows 11-like
            appearance.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}
