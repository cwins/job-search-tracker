'use client';

import { Link as ChakraLink } from '@chakra-ui/react';
import { Link as RouterLink, type LinkComponentProps } from '@tanstack/react-router';

export const Link = (props: LinkComponentProps) => {
  return (
    <ChakraLink asChild>
      <RouterLink {...props} />
    </ChakraLink>
  );
};

Link.displayName = 'Link';
