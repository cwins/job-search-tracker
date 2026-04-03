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

const NavLinks: React.FC = () => {
  return (
    <HStack gap="4" flexWrap="wrap" justify="center">
      <Link to="/">
        <Text fontWeight="semibold">Browse</Text>
      </Link>
      <Link to="/my-recipes">
        <Text fontWeight="semibold">My recipes</Text>
      </Link>
      <Link to="/my-saves">
        <Text fontWeight="semibold">My saves</Text>
      </Link>
    </HStack>
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
            <DarkMode>
              <UserMenu />
              <ColorModeButton />
            </DarkMode>
          </HStack>
        </Box>

        <Box paddingY="8" textAlign="center" width="100%">
          <Heading as="h1" size="4xl" fontWeight="bold">
            Recipe box
          </Heading>
          <Text mt="2" mb="4" maxW="lg" mx="auto">
            Share and discover recipes: prep time, cook time, ingredients, and directions—all in one place.
          </Text>
          <DarkMode>
            <NavLinks />
          </DarkMode>
        </Box>
      </Flex>
    </Bleed>
  );
};
