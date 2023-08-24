import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('Root');
});

export default router;
