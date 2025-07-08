'use client';

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useBoolean } from 'minimal-shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import InputAdornment from '@mui/material/InputAdornment';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { MOCK_JWT_USERS } from 'src/_mock/_jwt';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { useAuthContext } from '../../hooks';
import { getErrorMessage } from '../../utils';
import { FormHead } from '../../components/form-head';
import { signInWithPassword } from '../../context/jwt';
import { AUTH_METHODS } from '../../context/jwt/constant';

import type { AuthMethod } from '../../context/jwt/constant';

// ----------------------------------------------------------------------

export type SignInSchemaType = zod.infer<typeof SignInSchema>;

export const SignInSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  password: zod
    .string()
    .min(1, { message: 'Password is required!' })
    .min(6, { message: 'Password must be at least 6 characters!' }),
});

// ----------------------------------------------------------------------

export function JwtSignInView() {
  const router = useRouter();

  const showPassword = useBoolean();

  const { checkUserSession } = useAuthContext();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [authMethod, setAuthMethod] = useState<AuthMethod>(AUTH_METHODS.JWT);
  const [selectedMockUser, setSelectedMockUser] = useState<number>(0);

  const defaultValues: SignInSchemaType = {
    email: 'demo@minimals.cc',
    password: '@2Minimal',
  };

  const methods = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const handleMockUserChange = (userIndex: number) => {
    setSelectedMockUser(userIndex);
    const selectedUser = MOCK_JWT_USERS[userIndex];
    if (selectedUser) {
      setValue('email', selectedUser.email);
      setValue('password', '@2Minimal'); // Use consistent password
    }
  };

  // Initialize form with mock user data when switching to mock JWT
  useEffect(() => {
    if (authMethod === AUTH_METHODS.MOCK_JWT) {
      const selectedUser = MOCK_JWT_USERS[selectedMockUser];
      if (selectedUser) {
        setValue('email', selectedUser.email);
        setValue('password', '@2Minimal'); // Use consistent password
      }
    } else {
      // Reset to default values for real JWT
      setValue('email', 'demo@minimals.cc');
      setValue('password', '@2Minimal');
    }
  }, [authMethod, selectedMockUser, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signInWithPassword({
        email: data.email,
        password: data.password,
        authMethod,
        mockUserIndex: selectedMockUser,
      });
      await checkUserSession?.();

      // After successful login, the GuestGuard will handle the redirect
      // and preserve the workspace parameter
      router.refresh();
    } catch (error) {
      console.error(error);
      const feedbackMessage = getErrorMessage(error);
      setErrorMessage(feedbackMessage);
    }
  });

  const renderForm = () => (
    <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
      {/* Auth Method Selection */}
      <Stack spacing={2}>
        <Typography variant="subtitle2">Authentication Method</Typography>
        <ToggleButtonGroup
          value={authMethod}
          exclusive
          onChange={(event, newMethod) => {
            if (newMethod !== null) {
              setAuthMethod(newMethod);
            }
          }}
          aria-label="auth method"
          fullWidth
        >
          <ToggleButton value={AUTH_METHODS.JWT} aria-label="jwt">
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body2">JWT API</Typography>
              <Chip label="Real" size="small" color="primary" />
            </Stack>
          </ToggleButton>
          <ToggleButton value={AUTH_METHODS.MOCK_JWT} aria-label="mock jwt">
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body2">Mock JWT</Typography>
              <Chip label="Demo" size="small" color="secondary" />
            </Stack>
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      {/* Show mock info when mock JWT is selected */}
      {authMethod === AUTH_METHODS.MOCK_JWT && (
        <Stack spacing={2}>
          <Stack spacing={1}>
            <Typography variant="subtitle2">Select Mock User:</Typography>
            <Select
              value={selectedMockUser}
              onChange={(e) => handleMockUserChange(e.target.value as number)}
              fullWidth
              size="small"
              displayEmpty
            >
              {MOCK_JWT_USERS.map((user, index) => (
                <MenuItem key={user.id} value={index}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" fontWeight="medium">
                        {user.displayName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {user.email}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      {user.access.map((subject) => (
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
                </MenuItem>
              ))}
            </Select>
          </Stack>
        </Stack>
      )}

      <Field.Text name="email" label="Email address" slotProps={{ inputLabel: { shrink: true } }} />

      <Box sx={{ gap: 1.5, display: 'flex', flexDirection: 'column' }}>
        <Link
          component={RouterLink}
          href="#"
          variant="body2"
          color="inherit"
          sx={{ alignSelf: 'flex-end' }}
        >
          Forgot password?
        </Link>

        <Field.Text
          name="password"
          label="Password"
          placeholder="6+ characters"
          type={showPassword.value ? 'text' : 'password'}
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={showPassword.onToggle} edge="end">
                    <Iconify
                      icon={showPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      <Button
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="Sign in..."
      >
        Sign in
      </Button>
    </Box>
  );

  return (
    <>
      <FormHead title="Sign in to your account" sx={{ textAlign: { xs: 'center', md: 'left' } }} />

      {!!errorMessage && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMessage}
        </Alert>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm()}
      </Form>
    </>
  );
}
