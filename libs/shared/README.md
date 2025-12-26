# @exchange-core/shared

Biblioteca compartilhada contendo tipos, DTOs com validação, enums e utilitários usados em todo o monorepo exchange-core.

## 📦 Instalação

A biblioteca é instalada automaticamente como dependência interna:

```json
{
  "dependencies": {
    "@exchange-core/shared": "*"
  }
}
```

## 🔧 Dependências

```json
{
  "dependencies": {
    "class-validator": "^0.14.0",
    "class-transformer": "^0.5.1"
  }
}
```

## 🚀 Como Usar

### 1. DTOs com Validação (Novidade!)

Os DTOs agora são **classes com validações** usando `class-validator`:

```typescript
import { CreateUserDto, validate } from '@exchange-core/shared';

// Backend - Validação automática
@Post()
async create(@Body() dto: CreateUserDto) {
  // dto já está validado automaticamente
}

// Frontend - Validação manual
const validateForm = async (data) => {
  const dto = Object.assign(new CreateUserDto(), data);
  const errors = await validate(dto);
  return errors.length === 0;
};
```

### 2. Tipos Base

```typescript
import { User, Accommodation, Course, Partner } from '@exchange-core/shared';

// Usando os tipos nas suas funções
function processUser(user: User) {
  console.log(`Processing user: ${user.name}`);
}
```

### 3. Enums

```typescript
import {
  UserStatus,
  AccommodationType,
  PartnerType
} from '@exchange-core/shared';

// No backend (NestJS)
@Query('status') status: UserStatus = UserStatus.STUDENT

// No frontend (React/React Native)
const userStatus = UserStatus.STUDENT;
```

### 4. DTOs para API com Validação

```typescript
import {
  CreateUserDto,
  UserResponseDto,
  ApiResponse
} from '@exchange-core/shared';

// Backend - Controller
@Post()
async create(@Body() dto: CreateUserDto): Promise<ApiResponse<UserResponseDto>> {
  // ...
}

// Frontend - API call
const createUser = async (data: CreateUserDto): Promise<UserResponseDto> => {
  // ...
}
```

### 4. Utilitários

```typescript
import {
  formatCurrency,
  calculateAverageRating,
  isValidEmail,
} from '@exchange-core/shared';

// Formatação de moeda
const price = formatCurrency(800); // "CA$800.00"

// Cálculo de rating médio
const rating = calculateAverageRating(4, 5, 3); // 4.0

// Validação
if (isValidEmail(email)) {
  // ...
}
```

## 📁 Estrutura

```
src/
├── lib/
│   ├── enums.ts      # Enums do Prisma + extras
│   ├── types.ts      # Interfaces base e com relações
│   ├── dtos.ts       # DTOs para API (Create, Update, Response)
│   └── utils.ts      # Funções utilitárias
└── index.ts          # Exports centralizados
```

## 🔧 Backend (NestJS)

```typescript
// users.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import {
  CreateUserDto,
  UserResponseDto,
  ApiResponse,
} from '@exchange-core/shared';

@Controller('users')
export class UsersController {
  @Post()
  async create(
    @Body() dto: CreateUserDto,
  ): Promise<ApiResponse<UserResponseDto>> {
    return {
      success: true,
      data: {
        id: 'new-id',
        email: dto.email,
        name: dto.name,
        // ... outros campos
      },
    };
  }
}
```

## 📱 Mobile (React Native)

```typescript
// UserProfile.tsx
import React from 'react';
import { View, Text } from 'react-native';
import {
  UserResponseDto,
  UserStatus,
  formatCurrency
} from '@exchange-core/shared';

const UserProfile = () => {
  const user: UserResponseDto = {
    id: '1',
    email: 'user@example.com',
    status: UserStatus.STUDENT,
    // ...
  };

  return (
    <View>
      <Text>Status: {user.status}</Text>
    </View>
  );
};
```

## 🏗️ Build

```bash
# Construir a lib
nx build shared

# Construir apps que dependem da lib
nx build api
nx build mobile
```

## ✅ Benefícios

- **Type Safety**: Tipos compartilhados garantem consistência
- **DRY**: Um lugar central para todos os tipos
- **Versionamento**: Mudanças se propagam automaticamente
- **Intellisense**: Autocompletar em toda aplicação
- **Refactoring**: Mudanças são refletidas em todo o codebase

## 📝 Contribuindo

1. Adicione novos tipos em `types.ts`
2. Crie DTOs correspondentes em `dtos.ts`
3. Adicione enums em `enums.ts` se necessário
4. Inclua utilitários em `utils.ts`
5. Exporte tudo no `index.ts`
6. Construa a lib: `nx build shared`
