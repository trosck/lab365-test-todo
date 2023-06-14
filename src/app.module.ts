import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TodoModule } from './todo/todo.module';
import { HttpModule } from '@nestjs/axios';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './todo/guards/auth.guard';

const configService = new ConfigService();

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(configService.get('MONGODB_URI'), {
      dbName: configService.get('MONGODB_NAME'),
    }),
    TodoModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
