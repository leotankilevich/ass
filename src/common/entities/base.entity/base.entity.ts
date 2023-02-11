import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
export abstract class Base {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'Id' })
  public id: string;

  @CreateDateColumn()
  @Field(() => Date, { description: 'created at' })
  public createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date, { description: 'update at' })
  public updatedAt: Date;
}
