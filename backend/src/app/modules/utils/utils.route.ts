import { Router } from 'express';
import utilsController from './utils.controller';

const router = Router();

router.get('/search-products', utilsController.getSearchProducts);

const utilsRouter = router;

export default utilsRouter;
