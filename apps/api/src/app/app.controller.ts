import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('users')
  getUsers() {
    return this.appService.getUsers();
  }

  @Post('users')
  createUser(@Body() createUserDto: { email: string; originCountry?: string }) {
    return this.appService.createUser(createUserDto);
  }
}
