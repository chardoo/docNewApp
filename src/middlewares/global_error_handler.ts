import { NextFunction, Request, Response } from 'express';
import Debug from 'debug';
import { UnauthorizedError } from 'express-jwt';
import {
  PrismaClientValidationError, PrismaClientKnownRequestError,
} from '@prisma/client/runtime';
import { MulterError } from 'multer';
import CustomError from '../errors/custom-errors';

const debug = Debug('photo:global error handler');

const globalErrorHandler = (
  error: Error,
  _: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({
      status: 'fail',
      data: error.serializeErrors(),
    });
  }
  if (error instanceof UnauthorizedError) {
    return res.status(error.status).json({ status: 'fail', data: [{ message: 'Please try authenticating again' }] });
  }

  if (error instanceof PrismaClientValidationError) {
    return res.status(400).json({ status: 'fail', data: [{ message: 'data validation error' }] });
  }

  if (error instanceof PrismaClientKnownRequestError) {
    console.log(error)
    // const data = error.meta as { target: string[] };
    // return res.status(400).json({ status:
    //  'fail', data: [{ message: `${data.target[0]} already exists` }] });
    return res.status(400).json({ status: 'fail', data: [{ message: 'unexpected error' }] });
  }

  if (error instanceof MulterError) {
    return res.status(400).json({ status: 'fail', data: [{ message: error.message }] });
  }
  debug('This is a 500 error: ', error.message);
  debug('This is a 500 error body: ', error);
  return res
    .status(500)
    .send({ status: 'fail', data: [{ message: 'unknown error occurred' }] });
};

export default globalErrorHandler;

// TODO: log 500 error
