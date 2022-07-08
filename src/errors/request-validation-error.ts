import { ValidationError } from 'express-validator';
import CustomError from './custom-errors';

class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(private errors: ValidationError[]) {
    super('invalid request parameters');
    this.errors = errors;
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    const formattedError = this.errors.map((error) => ({ message: error.msg, field: error.param }));
    return formattedError;
  }
}

export default RequestValidationError;
