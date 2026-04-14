import { Router, Request, Response } from 'express';
import { getAllChecks } from './db';

const router = Router();

router.get('/history', (_req: Request, res: Response) => {
  res.status(200).json(getAllChecks());
});

export default router;
