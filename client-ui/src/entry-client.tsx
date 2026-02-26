import './index.css';
import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { RouterClient } from '@tanstack/react-router/ssr/client';

import { UrqlProvider } from '@/components/urql-provider';
import { createRouter } from './create-router';
import { cacheExchange, Client, fetchExchange } from 'urql';

const router = createRouter();

interface ClientAppConfig {
  graphql?: {
    endpoint?: string;
  };
}

declare global {
  interface Window {
    /**
     * The config should be present, but we can't make any assumptions about the server-rendered HTML
     */
    __config?: ClientAppConfig;
  }
}

const urqlClient = new Client({
  url: window.__config?.graphql?.endpoint || '/graphql',
  exchanges: [cacheExchange, fetchExchange],
  preferGetMethod: false,
  suspense: true
});

hydrateRoot(
  document,
  <StrictMode>
    <UrqlProvider client={urqlClient}>
      <RouterClient router={router} />
    </UrqlProvider>
  </StrictMode>
);
