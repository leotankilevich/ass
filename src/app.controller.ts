import { Controller, Get, Session } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  async getSession(@Session() session: Record<string, any>) {
    console.log(session);
  }
}
