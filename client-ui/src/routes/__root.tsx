import { Flex } from '@chakra-ui/react';
import { PageHeader } from '../components/page-header';
import { PageContent } from '../components/page-content';
import { createRootRouteWithContext, HeadContent, Outlet, Scripts } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { useEffect } from 'react';
import { Provider } from '@/components/ui/provider';
import { AuthProvider } from '@/auth/auth-context';

const App = () => {
  useEffect(() => {
    console.log('App mounted');
  }, []);

  return (
    <>
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Job Tracker</title>
        <HeadContent />
      </head>
      <body>
        <Provider>
          <AuthProvider>
            <div id="app">
              <Flex direction="column" align="center" alignItems="stretch" width="100%" minHeight="100vh" boxShadow="md">
                <PageHeader />
                <PageContent>
                  <Outlet />
                </PageContent>
              </Flex>
            </div>
            <div id="ssr-scripts">
              <script type="text/javascript" dangerouslySetInnerHTML={{ __html: getInlineConfigScript() }} />
              <Scripts />
            </div>
            <div id="tanstack-router-devtools">
              <TanStackRouterDevtools position="bottom-right" />
            </div>
          </AuthProvider>
        </Provider>
      </body>
    </>
  );
};

const getReactRefreshScript = () => {
  if (import.meta.env.DEV) {
    return [
      'import RefreshRuntime from "/@react-refresh";',
      'RefreshRuntime.injectIntoGlobalHook(window);',
      'window.$RefreshReg$ = () => {};',
      'window.$RefreshSig$ = () => (type) => type;',
      'window.__vite_plugin_react_preamble_installed__ = true;'
    ].join('\n');
  }

  return '';
};

const getInlineConfigScript = () => {
  return `Object.defineProperty(window, '__config', { writable: false, enumerable: false, configurable: false, value: Object.freeze({ graphql: { endpoint: [window.location.protocol, '//', window.location.host, '/graphql'].join(''), headers: [] }})});`;
};

type RootRouteContext = {
  // TODO
  appConfig?: unknown;
};

export const Route = createRootRouteWithContext<RootRouteContext>()({
  head: () => ({
    scripts: [
      {
        type: 'module',
        children: getReactRefreshScript()
      },
      {
        type: 'module',
        src: import.meta.env.PROD ? '/static/entry-client.js' : '/src/entry-client.tsx'
      }
    ]
  }),
  component: App
});
