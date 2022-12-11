import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Coffee Model' })
export class Coffee {
  @Field(() => ID, {
    nullable: false,
    description: 'Coffee unique identifier',
  })
  id: number;

  @Field(() => String, {
    nullable: false,
    description: 'Coffee name',
  })
  name: string;

  @Field(() => String, {
    nullable: true,
    description: 'Coffee brand',
  })
  brand: string;

  @Field(() => [String], {
    nullable: true,
    description: 'Coffee flavors',
  })
  flavors: string[];
}
