import { Field, InputType } from '@nestjs/graphql';

import { RoleEnum } from '../../enums/roles.enum';

@InputType()
export class CreateUserInput {
  @Field(() => String, {
    description: 'username',
  })
  username: string;

  @Field(() => String, {
    description: 'email',
  })
  email: string;

  @Field(() => String, {
    description: 'password',
  })
  password: string;

  @Field(() => [String], {
    description: 'role',
    nullable: true,
  })
  roles?: string[] = [RoleEnum.User];
}
