import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Tea } from '../tea.entity/tea.entity';

@Entity()
@ObjectType()
export class Flavor {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany((type) => Tea, (Tea) => Tea.flavors)
  teas: Tea[];
}
