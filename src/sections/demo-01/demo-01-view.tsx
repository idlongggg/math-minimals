'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export function Demo01View() {
  return (
    <Box>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Demo 01 Content
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This is a blank page for Demo 01. You can add your custom content here.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
