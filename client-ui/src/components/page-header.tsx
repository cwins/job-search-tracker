import { AvatarIcon, Bleed, Box, Flex, Text } from '@chakra-ui/react';

export const PageHeader: React.FC = () => {
  return (
    <Bleed bg="gray.200" color="purple.contrast">
      <Flex direction="column" align="center" backgroundImage="url('/banner_bg_compressed.png')" backgroundSize="cover" backgroundPosition="center" padding="4">
        <Box alignSelf="end" padding="2">
          <Text fontSize="normal" fontWeight="bold">
            Person
            <AvatarIcon name="foo" display="inline-block" />
          </Text>
        </Box>

        <Box paddingY="12">
          <h1>Job Tracker</h1>
          <p>Keep track of the jobs you're interested in or have already applied to. Nice and simple.</p>
        </Box>
      </Flex>
    </Bleed>
  );
};
