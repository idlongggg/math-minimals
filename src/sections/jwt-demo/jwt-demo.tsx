'use client';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { jwtDecode, MOCK_JWT_USERS, generateMockJWT } from 'src/_mock/_jwt';

import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export function JWTDemo() {
  const { user } = useAuthContext();
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const [decodedToken, setDecodedToken] = useState<any>(null);

  const handleGenerateToken = (userIndex: number) => {
    const token = generateMockJWT(userIndex);
    setSelectedToken(token);
    setDecodedToken(jwtDecode(token));
  };

  const handleCopyToken = () => {
    if (selectedToken) {
      navigator.clipboard.writeText(selectedToken);
      alert('Token copied to clipboard!');
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        JWT Token Demo
      </Typography>

      {/* Current User Info */}
      {user && (
        <Card sx={{ mb: 3 }}>
          <CardHeader title="Current User" />
          <CardContent>
            <Stack spacing={1}>
              <Typography variant="body2">
                <strong>Name:</strong> {user.displayName}
              </Typography>
              <Typography variant="body2">
                <strong>Email:</strong> {user.email}
              </Typography>
              <Typography variant="body2">
                <strong>Role:</strong> {user.role}
              </Typography>
              <Box>
                <Typography variant="body2" component="span">
                  <strong>Access:</strong>{' '}
                </Typography>
                {user.access?.map((subject: string) => (
                  <Chip
                    key={subject}
                    label={subject}
                    size="small"
                    variant="outlined"
                    sx={{ ml: 0.5 }}
                  />
                ))}
              </Box>
            </Stack>
          </CardContent>
        </Card>
      )}

      {/* Token Generators */}
      <Card sx={{ mb: 3 }}>
        <CardHeader title="Generate Mock JWT Tokens" />
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="body2" color="text.secondary">
              Click on any user below to generate their JWT token:
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {MOCK_JWT_USERS.map((mockUser, index) => (
                <Box
                  key={mockUser.id}
                  sx={{
                    p: 2,
                    border: 1,
                    borderRadius: 1,
                    borderColor: 'divider',
                    backgroundColor: 'background.paper',
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2">{mockUser.displayName}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {mockUser.email} • {mockUser.role}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5 }}>
                        {mockUser.access.map((subject) => (
                          <Chip
                            key={subject}
                            label={subject}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: '0.75rem' }}
                          />
                        ))}
                      </Box>
                    </Box>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleGenerateToken(index)}
                    >
                      Generate Token
                    </Button>
                  </Stack>
                </Box>
              ))}
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Token Display */}
      {selectedToken && (
        <Card>
          <CardHeader
            title="Generated JWT Token"
            action={
              <Button variant="outlined" size="small" onClick={handleCopyToken}>
                Copy Token
              </Button>
            }
          />
          <CardContent>
            <Stack spacing={2}>
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Token:
                </Typography>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    backgroundColor: 'grey.100',
                    wordBreak: 'break-all',
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                  }}
                >
                  {selectedToken}
                </Box>
              </Box>

              <Divider />

              {decodedToken && (
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Decoded Payload:
                  </Typography>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 1,
                      backgroundColor: 'grey.50',
                      fontFamily: 'monospace',
                      fontSize: '0.875rem',
                    }}
                  >
                    <pre>{JSON.stringify(decodedToken, null, 2)}</pre>
                  </Box>
                </Box>
              )}
            </Stack>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
