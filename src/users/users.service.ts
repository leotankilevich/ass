import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ConnectionArgs, findAndPaginate } from 'nestjs-graphql-relay';
import { Repository } from 'typeorm';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const salt = await bcrypt.genSalt();
    const user = this.userRepository.create({
      ...createUserInput,
      password: await bcrypt.hash(createUserInput.password, salt),
    });

    console.log(user);

    return await this.userRepository.save(user);
  }

  async findAll(args: ConnectionArgs) {
    console.log(args);
    return await findAndPaginate(undefined, args, this.userRepository);
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error(`User does not exist`);
    }

    return user;
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({ where: { username } });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
