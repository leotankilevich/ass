import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Tea } from './entities/tea.entity/tea.entity';
import { Flavor } from './entities/flavor.entity/flavor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Resolver(() => Tea)
export class TeaFlavorsResolver {
  constructor(
    @InjectRepository(Flavor)
    private readonly flavorsRepository: Repository<Flavor>,
  ) {}
  @ResolveField('flavors', () => [Flavor])
  async getTeaFlavors(@Parent() tea: Tea) {
    return this.flavorsRepository
      .createQueryBuilder('flavor')
      .innerJoin('flavor.teas', 'teas', 'tea.id = :teaId', {
        coffeeId: tea.id,
      })
      .getMany();
  }
}
