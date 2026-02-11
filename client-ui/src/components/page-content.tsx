import { Box } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';

export const PageContent: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <Box flex="1" borderLeft="sm" borderRight="sm" borderColor="gray.300" alignItems="center" justifyItems="stretch">
      <Box width="11/12" maxWidth="11/12" padding="16" margin="auto" justifySelf="stretch">
        {children}
      </Box>
    </Box>
  );
};
