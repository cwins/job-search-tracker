import { createRouter as createTanstackRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

export const createRouter = (context?: Record<string, unknown>) => {
  return createTanstackRouter({ routeTree, additionalContext: context || {} });
};

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
