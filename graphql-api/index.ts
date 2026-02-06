import { startServer } from './src/server';

const { port, fetch } = await startServer();

console.log(`GraphQL API server is running on http://localhost:${port}/graphql`);

// Bun will start the server automatically with these exports
export default { port, fetch };
