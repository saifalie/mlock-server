import { Router } from 'express';
import lockerStationRoutes from './lockerStation.routes.js';

const rootRouter: Router = Router();

rootRouter.use('/lockerStation', lockerStationRoutes);

export default rootRouter;
