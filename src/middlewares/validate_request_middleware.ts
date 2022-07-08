import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import RequestValidationError from '../errors/request-validation-error';

const validateRequestWare = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const serializedErrors = new RequestValidationError(errors.array());
    return res.status(400).json({ success: false, errors: serializedErrors });
  }
  return next();
};

export default validateRequestWare;
