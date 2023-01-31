import { Drink } from '../../../common/interfaces/drink.interface/drink.interface';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from '../flavor.entity/flavor.entity';

@Entity()
@ObjectType({ description: 'Tea Model', implements: () => Drink })
export class Tea implements Drink {
  @PrimaryGeneratedColumn()
  @Field(() => ID, {
    description: 'Coffee unique identifier',
  })
  id: number;

  @Field(() => String, { description: 'Tea name' })
  name: string;

  @Column()
  @Field(() => String, {
    description: 'Coffee brand',
  })
  brand: string;

  @JoinTable()
  @ManyToMany((type) => Flavor, (flavor) => flavor.teas, { cascade: true })
  flavors?: Flavor[];

  @CreateDateColumn()
  createdAt: Date;
}
