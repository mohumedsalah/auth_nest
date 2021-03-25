import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, hashPassword, comparePassword } from './users.model';
import { v4 as uuid } from 'uuid';
import {
  CreateUserRequest,
  LoginUserRequest
} from './validation/user-requests';
@Injectable()
export class UsersService {
  constructor(private readonly jwtService: JwtService) {}
  private users: User[] = [];

  creatUser(user: CreateUserRequest) {
    const created: User = {
      id: uuid(),
      username: user.username,
      password: hashPassword(user.password),
      fullName: user.fullName,
      age: user.age
    };
    if (this.checkFound(created.username)) {
      throw new BadRequestException('username already token');
    }
    this.users.push(created);
    return { token: this.generateToke(created) };
  }

  loginUser(user: LoginUserRequest) {
    const found = this.checkFound(user.username);
    if (!found || !comparePassword(user.password, found.password)) {
      throw new NotFoundException('there is error in username or password');
    }
    return { token: this.generateToke(found) };
  }

  userInfo(id: string) {
    const found = this.checkFound('', id);
    if (!found) {
      throw new UnauthorizedException();
    }
    delete found.password;
    return found;
  }
  // private section
  private generateToke(one: User) {
    return this.jwtService.sign({ id: one.id });
  }
  private checkFound(userName = '', id = '') {
    const inx = this.users.findIndex(
      (el) => el.username === userName || el.id === id
    );
    if (inx == -1) {
      return null;
    }
    return this.users[inx];
  }
}
