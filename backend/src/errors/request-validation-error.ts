import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  statusCode = 403;
  errs: ValidationError[];

  constructor(errs: ValidationError[]) {
    super('Request validation error');
    this.errs = errs;
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return this.errs.map(({ msg, param }) => {
      return { message: msg, field: param };
    });
  }
}
