import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Box, Button, Field, Input, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useAuth } from '@/auth/auth-context';

interface ErrorResult {
  data?: {
    error?: string;
  };
}

const RouteComponent = () => {
  const navigate = useNavigate();
  const { login, signup } = useAuth();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setError(null);
    setSubmitting(true);
    try {
      if (mode === 'login') {
        await login(username, password);
      } else {
        await signup(username, password);
      }
      navigate({ to: '/' });
    } catch (errorResult: unknown) {
      setError((errorResult as ErrorResult)?.data?.error || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box maxWidth="md" margin="0 auto">
      <Stack gap="4">
        <Text fontSize="2xl" fontWeight="bold">
          {mode === 'login' ? 'Login' : 'Create account'}
        </Text>

        <Stack gap="3">
          <Field.Root>
            <Field.Label>Username</Field.Label>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" />
          </Field.Root>

          <Field.Root>
            <Field.Label>Password</Field.Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          </Field.Root>

          {error ? (
            <Text color="red.600" fontSize="sm">
              {error}
            </Text>
          ) : null}

          <Button onClick={submit} loading={submitting} variant="solid" colorPalette="blue">
            {mode === 'login' ? 'Login' : 'Sign up'}
          </Button>

          <Button
            variant="subtle"
            colorPalette="bg"
            onClick={() => {
              setError(null);
              setMode((m) => (m === 'login' ? 'signup' : 'login'));
            }}
          >
            {mode === 'login' ? 'Need an account? Sign up' : 'Already have an account? Login'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export const Route = createFileRoute('/login')({
  component: RouteComponent
});
