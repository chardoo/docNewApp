import { Application } from 'express';
import merchantRouter from './merchant';
import clientRouter from './client';

const initAppRoutes = (app:Application) =>{

    app.use('/merchant', merchantRouter)
    app.use('/client', clientRouter)
    return app;
}

export default initAppRoutes;