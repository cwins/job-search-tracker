import { StrictMode } from 'react';
import { createRequestHandler, renderRouterToStream, RouterServer } from '@tanstack/react-router/ssr/server';
import path from 'path';

import { createRouter } from './create-router';
import { UrqlProvider } from './components/urql-provider';
import { cacheExchange, Client, fetchExchange } from 'urql';

const GRAPHQL_API_ENDPOINT = process.env.GRAPHQL_API_ENDPOINT || 'http://localhost:4000/graphql';

const getManifest = async () => {
  if (process.env.NODE_ENV === 'production') {
    const manifestPath = path.join(process.cwd(), 'dist', 'client', '.vite', 'ssr-manifest.json');

    return import(manifestPath);
  }
  return {};
};

export const render = async (req: Request): Promise<string> => {
  const manifest = await getManifest();
  const urqlClient = new Client({
    url: GRAPHQL_API_ENDPOINT,
    exchanges: [cacheExchange, fetchExchange],
    preferGetMethod: false,
    suspense: true
  });

  const handler = createRequestHandler({
    request: req,
    createRouter: () =>
      createRouter({
        clientEntry: manifest['src/entry-client.tsx']?.file
      })
  });

  const renderResponse = await handler((context) => {
    const { request, responseHeaders, router } = context;

    return renderRouterToStream({
      request,
      responseHeaders,
      router,
      children: (
        <html>
          <StrictMode>
            <UrqlProvider client={urqlClient}>
              <RouterServer router={router} />
            </UrqlProvider>
          </StrictMode>
        </html>
      )
    });
  });

  return renderResponse.text();
};
