import { Field, InterfaceType, ObjectType } from '@nestjs/graphql';

@InterfaceType()
export abstract class Drink {
  @Field()
  name: string;
}
