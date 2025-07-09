'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export function Demo02View() {
  return (
    <Box>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Demo 02 Content
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This is a blank page for Demo 02. You can add your custom content here.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
