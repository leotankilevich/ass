import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { Flavor } from '../flavor.entity/flavor.entity';
import { Drink } from '../../../common/interfaces/drink.interface/drink.interface';

@Entity()
@ObjectType({ description: 'Coffee Model', implements: () => Drink })
export class Coffee implements Drink {
  @PrimaryGeneratedColumn()
  @Field(() => ID, {
    description: 'Coffee unique identifier',
  })
  id: number;

  @Column()
  @Field(() => String, {
    description: 'Coffee name',
  })
  name: string;

  @Column()
  @Field(() => String, {
    description: 'Coffee brand',
  })
  brand: string;

  @JoinTable()
  @ManyToMany((type) => Flavor, (flavor) => flavor.coffees, { cascade: true })
  flavors?: Flavor[];

  @CreateDateColumn()
  createdAt: Date;
}
