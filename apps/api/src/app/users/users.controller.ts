import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  UpdateUserDto,
  AccommodationSearchDto,
  PaginatedResponseDto,
  ApiResponse,
} from '@exchange-core/shared';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ApiResponse<User>> {
    const data = await this.usersService.create(createUserDto);
    return {
      success: true,
      data,
    };
  }

  @Get()
  async findAll(
    @Query() searchDto: AccommodationSearchDto,
  ): Promise<PaginatedResponseDto<User>> {
    return this.usersService.findAll(searchDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ApiResponse<User>> {
    const data = await this.usersService.findOne(id);

    if (!data) {
      throw new NotFoundException('User not found');
    }

    return {
      success: true,
      data,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ApiResponse<User>> {
    const data = await this.usersService.update(id, updateUserDto);
    return {
      success: true,
      data,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ApiResponse<void>> {
    await this.usersService.remove(id);
    return {
      success: true,
      message: 'User deleted successfully',
    };
  }
}
