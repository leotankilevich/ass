import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType({ description: 'Coffee Model' })
export class Coffee {
  @PrimaryGeneratedColumn()
  @Field(() => ID, {
    nullable: false,
    description: 'Coffee unique identifier',
  })
  id: number;

  @Column()
  @Field(() => String, {
    nullable: false,
    description: 'Coffee name',
  })
  name: string;

  @Column()
  @Field(() => String, {
    nullable: true,
    description: 'Coffee brand',
  })
  brand: string;

  @Column({ type: 'json' })
  @Field(() => [String], {
    nullable: true,
    description: 'Coffee flavors',
  })
  flavors: string[];
}
