import { Coffee } from './coffee.entity';

describe('CoffeeEntity', () => {
  it('should be defined', () => {
    expect(new Coffee()).toBeDefined();
  });
});
