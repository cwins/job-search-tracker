import { Flex } from '@chakra-ui/react';
import { PageHeader } from '../components/page-header';
import { PageContent } from '../components/page-content';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

const App = () => {
  return (
    <>
      <Flex direction="column" align="center" alignItems="stretch" width="100%" minHeight="100vh" boxShadow="md">
        <PageHeader />
        <PageContent>
          <Outlet />
        </PageContent>
      </Flex>
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
};

export const Route = createRootRoute({ component: App });
