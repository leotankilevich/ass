import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';

import { Base } from '../../common/entities/base.entity/base.entity';
import { RoleEnum } from '../../enums/roles.enum';

@Entity('User')
@ObjectType({ description: 'User Model' })
export class User extends Base {
  @Column({ unique: true })
  @Field(() => String, {
    description: 'username',
  })
  username: string;

  @Column({ unique: true })
  @Field(() => String, {
    description: 'email',
    nullable: false,
  })
  email: string;

  @Column()
  @Field(() => String, {
    description: 'password',
  })
  password: string;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    array: true,
    default: [RoleEnum.User],
  })
  @Field(() => [String], {
    description: 'role',
    nullable: true,
  })
  roles?: string[] = [RoleEnum.User];
}
