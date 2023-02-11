import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { CreateUserInput } from '../users/dto/create-user.input';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any | null> {
    const user = await this.usersService.findByUsername(username);

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (user && isValidPassword) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async login(user: User) {
    const { password, ...result } = user;

    if (!user) {
      throw new Error();
    }

    const access_token = this.jwtService.sign(
      {
        username: user.username,
        sub: user.id,
      },
      { expiresIn: '10s', secret: process.env.JWT_SECRET },
    );

    const refresh_token = this.jwtService.sign(
      {
        username: user.username,
        sub: user.id,
        access_token,
      },
      { expiresIn: '7d', secret: process.env.JWT_SECRET },
    );

    return {
      refresh_token,
      user: result,
    };
  }

  async signup(
    createUserInput: CreateUserInput,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.findByEmail(createUserInput.email);

    if (user) {
      throw new Error('User already exists');
    }
    const password = await bcrypt.hash(createUserInput.password, 10);

    return this.usersService.create({ ...createUserInput, password });
  }
}
