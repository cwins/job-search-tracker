import { AvatarIcon, Bleed, Box, Button, Flex, Heading, HStack, Text } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '@/auth/auth-context';
import { Link } from './ui/link';
import { ColorModeButton, DarkMode } from './ui/color-mode';

const UserMenu: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  if (user) {
    return (
      <>
        <Text fontSize="normal" fontWeight="bold">
          {user.username}
          <AvatarIcon marginInlineStart="2" name={user.username} display="inline-block" />
        </Text>
        <Button
          size="sm"
          variant="plain"
          onClick={async () => {
            await logout();
            navigate({ to: '/login' });
          }}
        >
          Logout
        </Button>
      </>
    );
  }

  return (
    <Link to="/login">
      <Button size="sm" fontWeight="bold" variant="plain">
        Login
      </Button>
    </Link>
  );
};

export const PageHeader: React.FC = () => {
  return (
    <Bleed bg="gray.200" color="purple.contrast">
      <Flex
        direction="column"
        align="center"
        backgroundImage="url('/images/banner_bg_compressed.png')"
        backgroundSize="cover"
        backgroundPosition="center"
        padding="4"
      >
        <Box alignSelf="end" padding="2">
          <HStack gap="3">
            {/* the banner bg is dark, so force its children to always behave like it's dark mode */}
            <DarkMode>
              <UserMenu />
              <ColorModeButton />
            </DarkMode>
          </HStack>
        </Box>

        <Box paddingY="12" textAlign="center">
          <Heading as="h1" size="4xl" fontWeight="bold">
            Job Tracker
          </Heading>
          <p>Keep track of the jobs you're interested in or have already applied to. Nice and simple.</p>
        </Box>
      </Flex>
    </Bleed>
  );
};
