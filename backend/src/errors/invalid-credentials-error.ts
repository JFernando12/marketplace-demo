import { CustomError } from './custom-error';

export class InvalidCredentialsError extends CustomError {
  statusCode = 401;

  constructor() {
    super('Credenciales incorrectas.');
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }];
  }
}
