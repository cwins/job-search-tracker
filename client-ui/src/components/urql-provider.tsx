import { Client, Provider, cacheExchange, fetchExchange } from 'urql';

const client = new Client({
  url: 'http://localhost:4000/graphql',
  exchanges: [cacheExchange, fetchExchange],
});

export const UrqlProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <Provider value={client}>{children}</Provider>;
}
