import CustomError from './custom-errors';

class NotFoundError extends CustomError {
  statusCode = 404;

  constructor(message = 'Route not found') {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }];
  }
}
export default NotFoundError;
