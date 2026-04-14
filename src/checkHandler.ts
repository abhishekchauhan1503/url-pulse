import { Router, Request, Response } from 'express';

const router = Router();

router.post('/check', async (req: Request, res: Response) => {
  const { url } = req.body ?? {};

  if (typeof url !== 'string' || url === '') {
    res.status(400).json({ error: 'url is required and must be a string' });
    return;
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(400).json({ error: `Invalid URL: ${message}` });
    return;
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    res.status(400).json({ error: 'URL must use http or https protocol' });
    return;
  }

  // Fetch, timing, and persistence handled in subsequent tasks.
});

export default router;
