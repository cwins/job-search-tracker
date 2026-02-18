import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Router, RouterProvider, createRouter } from '@tanstack/react-router';
import './index.css';

import { Provider } from '@/components/ui/provider.tsx';

import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  export interface RegisterRouter {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
