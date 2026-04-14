import express, { NextFunction, Request, Response } from 'express';
import checkRouter from './checkHandler';
import historyRouter from './historyHandler';

interface HttpError extends Error {
  status?: number;
}

const app = express();

app.use(express.json());

app.use(checkRouter);
app.use(historyRouter);

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: HttpError, _req: Request, res: Response, _next: NextFunction) => {
  res.status(err.status ?? 500).json({ error: err.message });
});

export default app;
