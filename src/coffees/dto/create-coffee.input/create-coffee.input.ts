import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'Coffee input object type description' })
export class CreateCoffeeInput {
  @Field(() => String, {
    nullable: false,
    description: 'A new coffee name',
  })
  name: string;

  @Field(() => String, {
    nullable: true,
    description: 'A new coffee brand',
  })
  brand: string;

  @Field(() => [String], {
    nullable: true,
    description: 'A new coffee flavors',
  })
  flavors: string[];
}
