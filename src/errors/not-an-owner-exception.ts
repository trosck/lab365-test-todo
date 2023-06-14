import { HttpException } from '@nestjs/common';

export class NotAnOwnerException extends HttpException {
  constructor() {
    super(
      {
        error_message: 'Is not an owner',
      },
      403,
    );
  }
}
