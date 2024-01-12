import { Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

import { ApiTags } from '@nestjs/swagger';

@ApiTags()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string[] {
    return this.appService.getHello();
  }

  @Get('saludate/:name')
  getSaludate(@Param('name') name: string): string {
    return this.appService.getSaludate(name);
  }
}
