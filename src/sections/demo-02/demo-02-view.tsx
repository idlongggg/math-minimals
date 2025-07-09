'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export function Demo02View() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Demo 02 Content - Test Fixed Header
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This is a test page for Demo 02 with long content to test the fixed header
            functionality.
          </Typography>
        </CardContent>
      </Card>

      {/* Multiple cards to create scrollable content */}
      {Array.from({ length: 15 }, (_, index) => (
        <Card key={index}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Content Card {index + 1}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              This is card number {index + 1}. This content is repeated multiple times to create a
              scrollable area. The header (title and description) should remain fixed at the top
              while only this content area scrolls.
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
