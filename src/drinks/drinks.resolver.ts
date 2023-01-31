import { Query, Resolver } from '@nestjs/graphql';
import { Coffee } from '../coffees/entities/coffee.entity/coffee.entity';
import { Drink } from '../common/interfaces/drink.interface/drink.interface';
import { Tea } from '../teas/entities/tea.entity/tea.entity';

@Resolver()
export class DrinksResolver {
  @Query(() => [Drink], { name: 'drinks' })
  async findAll(): Promise<Drink[]> {
    const coffee = new Coffee();
    coffee.id = 1;
    coffee.name = 'Columbia';
    coffee.brand = 'podzlupnaya hueta';

    const tea = new Tea();
    tea.name = 'Lipton';

    return [coffee, tea];
  }
}
