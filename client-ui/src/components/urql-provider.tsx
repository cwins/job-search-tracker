import { type Client, Provider } from 'urql';

interface UrqlProviderProps extends React.PropsWithChildren {
  client: Client;
}
export const UrqlProvider: React.FC<UrqlProviderProps> = (props) => {
  const { client, children } = props;

  return <Provider value={client}>{children}</Provider>;
};
