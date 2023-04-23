import { CustomError } from './custom-error';

export class DuplicateUserError extends CustomError {
  statusCode = 403;
  constructor() {
    super('User already exist');
  }
  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }];
  }
}
