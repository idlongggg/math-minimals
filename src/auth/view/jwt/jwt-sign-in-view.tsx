'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useBoolean } from 'minimal-shared/hooks';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';
import { useRouter, useSearchParams } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

import { Field, Form } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';

import { FormHead } from '../../components/form-head';
import { signInWithPassword } from '../../context/jwt';
import { AUTH_METHODS } from '../../context/jwt/constant';
import { useAuthContext } from '../../hooks';
import { getErrorMessage } from '../../utils';

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
  const searchParams = useSearchParams();

  const showPassword = useBoolean();

  const { checkUserSession } = useAuthContext();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [authMethod, setAuthMethod] = useState<AuthMethod>(AUTH_METHODS.JWT);

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
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signInWithPassword({ 
        email: data.email, 
        password: data.password, 
        authMethod 
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
        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="body2" gutterBottom>
            <strong>Mock JWT Mode:</strong> Will generate a fake JWT token with:
          </Typography>
          <Typography variant="body2" component="div">
            • userId: "8864c717-587d-472a-929a-8e5f298024da-0"
            <br />
            • access: ["algebra", "statistics"]
            <br />
            • exp: 3 days from now
          </Typography>
        </Alert>
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
      <FormHead
        title="Sign in to your account"
        description={
          <>
            {`Don’t have an account? `}
            <Link component={RouterLink} href={paths.auth.jwt.signUp} variant="subtitle2">
              Get started
            </Link>
          </>
        }
        sx={{ textAlign: { xs: 'center', md: 'left' } }}
      />

      <Alert severity="info" sx={{ mb: 3 }}>
        {authMethod === AUTH_METHODS.JWT ? (
          <>
            Use <strong>{defaultValues.email}</strong>
            {' with password '}
            <strong>{defaultValues.password}</strong>
          </>
        ) : (
          <>
            <strong>Mock JWT Mode:</strong> You can use any email/password combination.
            The system will generate a fake JWT token.
          </>
        )}
      </Alert>

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
