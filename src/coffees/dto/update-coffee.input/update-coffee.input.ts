import { InputType, PartialType } from '@nestjs/graphql';
import { CreateCoffeeInput } from '../create-coffee.input/create-coffee.input';

@InputType({ description: 'Coffee update input object type description' })
export class UpdateCoffeeInput extends PartialType(CreateCoffeeInput) {}
