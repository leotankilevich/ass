import { Injectable } from '@nestjs/common';
import { CreateCoffeeInput } from './dto/create-coffee.input/create-coffee.input';

@Injectable()
export class CoffeesService {
  async indAll() {
    return [];
  }

  async findOne(id: number) {
    return null;
  }

  async create(createCoffeeInput: CreateCoffeeInput) {
    return null;
  }
}
