import express, { Request, Response } from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import cors from 'cors';
import { routerProduct, routerUser } from './routes';
import { NotFoundError } from './errors';
import { currentUser, errorHandler } from './middlewares';

const app = express();

// Settings
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: 'http://localhost:5000',
    credentials: true,
  })
);
app.use(morgan('dev'));

// Authentication
app.use(currentUser);

// Routes
app.use('/users', routerUser);
app.use('/products', routerProduct);
app.use('*', (req: Request, res: Response) => {
  throw new NotFoundError();
});

// Error handler
app.use(errorHandler);

export { app };
