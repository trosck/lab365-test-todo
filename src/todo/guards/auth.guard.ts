import { HttpService } from '@nestjs/axios';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { BadTokenException } from 'src/errors/bad-token-exception';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { data } = await firstValueFrom(
      this.httpService
        .get(this.configService.get('AUTH_SERVICE') + '/user', {
          headers: {
            authorization: request.headers.authorization,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            throw new BadTokenException();
          }),
        ),
    );
    request.user = data;
    return true;
  }
}
