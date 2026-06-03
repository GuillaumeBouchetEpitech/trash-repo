import express from 'express';

const _log = (...args: any) => {
  console.log(new Date().toISOString(), ...args);
};

export const getHttpServer = (host: string, port: number) => {
  const app = express();

  app.use((req, res, next) => {
    res.on('finish', () => {
      _log(res.statusCode, req.method, req.path);
    });
    next();
  });

  // will serve the static files
  app.use(express.static('./dist/client'));

  // will deliver the websocket config
  app.get('/ws-config', (req, res) => {
    res.json({ host, port });
  });

  return app;
};
