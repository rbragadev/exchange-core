import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async getUsers() {
    return this.prisma.user.findMany();
  }

  async createUser(data: { email: string; originCountry?: string }) {
    return this.prisma.user.create({
      data,
    });
  }
}
