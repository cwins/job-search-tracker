import { startServer } from './src/server';

const { port, fetch } = await startServer();

console.log(`Client UI server is running on http://localhost:${port}`);

// Bun will start the server automatically with these exports
export default { port, fetch };
