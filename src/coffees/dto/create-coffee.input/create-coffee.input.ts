import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';
import { Flavor } from '../../entities/flavor.entity/flavor.entity';

@InputType({ description: 'Coffee input object type description' })
export class CreateCoffeeInput {
  @MinLength(3)
  @Field(() => String, {
    nullable: false,
    description: 'A new coffee name',
  })
  name: string;
  brand: string;
  flavors?: Flavor[];
}
