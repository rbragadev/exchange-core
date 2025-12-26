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
import { UsersService } from './users.service';
import {
  CreateUserDto,
  UpdateUserDto,
  SearchDto,
  PaginatedResponseDto,
  ApiResponse,
} from '@exchange-core/shared';

import { IsPublic, CurrentUser } from '../auth';
import type { JwtPayload } from '../auth';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @IsPublic()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ApiResponse<any>> {
    const data = await this.usersService.create(createUserDto);
    return {
      success: true,
      data,
    };
  }

  @Get('profile')
  async getMyProfile(
    @CurrentUser() user: JwtPayload,
  ): Promise<ApiResponse<any>> {
    const data = await this.usersService.findOne(user.sub);

    if (!data) {
      throw new NotFoundException('User not found');
    }

    return {
      success: true,
      data,
    };
  }

  @Get()
  async findAll(
    @Query() searchDto: SearchDto,
  ): Promise<PaginatedResponseDto<any>> {
    return this.usersService.findAll(searchDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ApiResponse<any>> {
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
  ): Promise<ApiResponse<any>> {
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
