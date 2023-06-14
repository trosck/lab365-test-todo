import { HttpException } from '@nestjs/common';

export class BadTokenException extends HttpException {
  constructor() {
    super(
      {
        error_message: 'Bad token',
      },
      403,
    );
  }
}
