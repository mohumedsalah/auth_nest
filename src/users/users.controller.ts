import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserRequest,
  LoginUserRequest
} from './validation/user-requests';

@Controller('user')
export class UsersController {
  constructor(private readonly Service: UsersService) {}
  @Post('create')
  @UsePipes(ValidationPipe)
  creatUser(@Body() user: CreateUserRequest) {
    const ret = this.Service.creatUser(user);
    return ret;
  }

  @Post('auth')
  @UsePipes(ValidationPipe)
  loginUser(@Body() user: LoginUserRequest) {
    const ret = this.Service.loginUser(user);
    return ret;
  }

  @Get('me')
  userInfo(@Body('user') user: { id: string }) {
    const ret = this.Service.userInfo(user.id);
    return ret;
  }
}
