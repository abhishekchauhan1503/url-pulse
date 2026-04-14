import { Router, Request, Response } from 'express';
import { getAllChecks, getCheckById } from './db';

const router = Router();

router.get('/history', (_req: Request, res: Response) => {
  res.status(200).json(getAllChecks());
});

router.get('/history/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id) || id < 1) {
    res.status(400).json({ error: 'id must be a positive integer' });
    return;
  }
  const row = getCheckById(id);
  if (row === null) {
    res.status(404).json({ error: 'Check not found' });
    return;
  }
  res.status(200).json(row);
});

export default router;
