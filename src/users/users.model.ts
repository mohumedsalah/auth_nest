import * as bcrypt from 'bcrypt';

export interface User {
  id: string;
  username: string;
  password: string;
  fullName: string;
  age: number;
}

export const comparePassword = (Password: string, hashedPassword: string) => {
  return bcrypt.compareSync(Password, hashedPassword);
};

export const hashPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash + '';
};
