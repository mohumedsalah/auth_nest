import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { JwtModule } from '@nestjs/jwt';
import { AuthenticateMiddleware } from 'src/middleware/authenticate.middleware';

@Module({
  imports: [JwtModule.register({ privateKey: 'find me' })],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticateMiddleware).forRoutes('/user/me');
  }
}
