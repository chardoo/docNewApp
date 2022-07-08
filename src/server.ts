import http from 'http';
import Debug from 'debug';
import app from './app';

const debug = Debug('Loan_App:server');

const server = http.createServer(app);

server.on('listening', () => debug('connection up and running'));
server.on('close', () => {
  debug('server shutting down');
  process.exit(0);
  // TODO: Stop database and any service
});
server.on('error', (error) => {
  if ((error as NodeJS.ErrnoException).code === 'EADDRINUSE') {
    debug('Port in use, retrying...');
    debug(error);
    setTimeout(() => {
      server.close();
      server.listen(process.env.PORT);
    }, 1000);
  }
});

export default server;
// TODO: OpenTelemetry Tracing for tracing http request and prisma queries
