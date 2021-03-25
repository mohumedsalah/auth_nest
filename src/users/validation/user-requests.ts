import { IsNotEmpty, IsNumber, MinLength } from 'class-validator';

export class CreateUserRequest {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  @MinLength(6)
  password: string;
  @IsNotEmpty()
  fullName: string;
  @IsNumber()
  age: number;
}

export class LoginUserRequest {
  @IsNotEmpty()
  username: string;
  password: string;
}
