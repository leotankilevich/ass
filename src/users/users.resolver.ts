import { UseGuards } from '@nestjs/common';
import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ConnectionArgs } from 'nestjs-graphql-relay';

import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RoleEnum } from '../enums/roles.enum';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UserConnection } from './user.connection';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Mutation(() => User)
  createSuperAdmin(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create({
      ...createUserInput,
      roles: [RoleEnum.User, RoleEnum.SuperAdmin],
    });
  }

  @Query(() => UserConnection)
  findAll(@Args() argus: ConnectionArgs): Promise<UserConnection> {
    console.log(argus);
    return this.usersService?.findAll(argus);
  }

  @Query(() => User, { name: 'user' })
  findOne(
    @Args('id', { type: () => ID, nullable: true, defaultValue: null })
    id?: string,
  ) {
    return this.usersService.findOne(id);
  }

  @Query(() => User, { name: '' })
  findByUsername(
    @Args('username', {
      type: () => String,
      nullable: true,
      defaultValue: null,
    })
    username?: string,
  ) {
    return this.usersService.findByUsername(username);
  }

  @Mutation(() => User)
  @Roles([RoleEnum.SuperAdmin, RoleEnum.Admin])
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  @Roles([RoleEnum.SuperAdmin, RoleEnum.Admin])
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }
}
