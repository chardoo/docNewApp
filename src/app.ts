import express, { json, urlencoded,   Response, Request, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';
import appRoutes from './routes/router';
import NotFoundError from './errors/not-found-error';
import globalErrorHandler from './middlewares/global_error_handler';

const app = express();
app.set('trust proxy', true);
app.disable('x-powered-by');
app.use(morgan('combined'));
app.use(helmet());
app.set('view engine', 'ejs');


app.use((req:Request, res:Response, next:NextFunction) => {
  json({ limit: '50mb' })(req, res, next);
});

app.use(urlencoded({ extended: false }));
app.use(cors({ methods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'] }));
app.use('/uploads', express.static(path.join('public', 'uploads')));
app.use(express.static(path.join('public')));

appRoutes(app);
app.use('*', () => {
  throw new NotFoundError();
});
app.use(globalErrorHandler);

export default app;
