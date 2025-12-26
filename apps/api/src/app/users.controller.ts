import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { UserStatus, UserObjective } from '@exchange-core/shared';
import type {
  UserResponseDto,
  CreateUserDto,
  AccommodationResponseDto,
  AccommodationSearchDto,
  PaginatedResponseDto,
  ApiResponse,
} from '@exchange-core/shared';

@Controller('users')
export class UsersController {
  @Get()
  async findAll(
    @Query() searchDto: AccommodationSearchDto,
  ): Promise<PaginatedResponseDto<UserResponseDto>> {
    // Exemplo de uso dos types compartilhados
    return {
      data: [
        {
          id: '1',
          email: 'user@example.com',
          name: 'John Doe',
          status: UserStatus.STUDENT,
          objective: UserObjective.BOTH,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      pagination: {
        page: 1,
        limit: 20,
        total: 1,
        totalPages: 1,
      },
    };
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<ApiResponse<UserResponseDto>> {
    return {
      success: true,
      data: {
        id,
        email: 'user@example.com',
        name: 'John Doe',
        status: UserStatus.STUDENT,
        objective: UserObjective.BOTH,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };
  }

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ApiResponse<UserResponseDto>> {
    // Aqui você usaria o PrismaService para criar o usuário
    return {
      success: true,
      data: {
        id: 'new-id',
        email: createUserDto.email,
        name: createUserDto.name,
        status: createUserDto.status,
        objective: createUserDto.objective,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };
  }
}
