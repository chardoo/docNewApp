import { NextFunction, Request, Response } from 'express';
import ExpressJwt from 'express-jwt';
import NotAuthorizedError from '../errors/not-authorized-error';

const adminAuthorizationRequestWare = (req: Request, _: Response, next: NextFunction) => {
  if (!req.user) {
    throw new NotAuthorizedError();
  }
  if (req.user.role !== 'manager') {
    throw new NotAuthorizedError();
  }
  return next();
};

const authorizationRequestWare = () => {
  const jwtSecret = process.env.JWT_SECRET!;
  const bufferSecret = Buffer.from(jwtSecret, 'base64');
  return ExpressJwt({ secret: bufferSecret, algorithms: ['HS256'] });
};

export default { adminAuthorizationRequestWare, authorizationRequestWare };
