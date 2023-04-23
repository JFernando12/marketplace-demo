import { CustomError } from './custom-error';

export class DuplicateUserError extends CustomError {
  statusCode = 403;
  constructor() {
    super('Este usuario ya existe.');
  }
  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }];
  }
}
