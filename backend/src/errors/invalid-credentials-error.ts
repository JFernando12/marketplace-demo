import { CustomError } from './custom-error';

export class InvalidCredentialsError extends CustomError {
  statusCode = 401;

  constructor() {
    super('Invalid credentials');
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }];
  }
}
