# DTOs com Class Validator - Guia de Uso

## 📋 Implementação Aplicada

Convertemos todos os DTOs de interfaces TypeScript para classes com validações usando `class-validator`. Isso permite:

- ✅ **Backend**: Validação automática nas rotas da API
- ✅ **Frontend**: Reutilização das mesmas validações
- ✅ **Consistência**: Regras centralizadas

## 🔧 Configuração Backend

### ValidationPipe Configurado

```typescript
// apps/api/src/main.ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true, // Remove propriedades não definidas no DTO
    transform: true, // Transforma payload em instâncias de DTO
    forbidNonWhitelisted: true, // Erro se propriedades não permitidas
    transformOptions: {
      enableImplicitConversion: true, // Conversão de tipos automática
    },
  }),
);
```

### Uso nos Controllers

```typescript
// apps/api/src/app/users.controller.ts
import { CreateUserDto, UserResponseDto, ApiResponse } from '@exchange-core/shared';

@Post()
async create(
  @Body() createUserDto: CreateUserDto, // Validação automática
): Promise<ApiResponse<UserResponseDto>> {
  // createUserDto já está validado aqui
  return { success: true, data: newUser };
}
```

## 📱 Uso no Frontend

### 1. Validação Manual em Formulários

```typescript
import { validate } from 'class-validator';
import { CreateUserDto } from '@exchange-core/shared';

const validateUserForm = async (formData: any) => {
  // Criar instância do DTO
  const dto = Object.assign(new CreateUserDto(), formData);

  // Validar
  const errors = await validate(dto);

  if (errors.length > 0) {
    // Processar erros
    const errorMessages = errors
      .map((error) => Object.values(error.constraints || {}))
      .flat();

    return { isValid: false, errors: errorMessages };
  }

  return { isValid: true, data: dto };
};

// Uso em React
const handleSubmit = async (formData) => {
  const validation = await validateUserForm(formData);

  if (!validation.isValid) {
    setErrors(validation.errors);
    return;
  }

  // Enviar dados validados
  await api.post('/users', validation.data);
};
```

### 2. Integração com React Hook Form

```typescript
import { useForm } from 'react-hook-form';
import { validate } from 'class-validator';
import { CreateUserDto } from '@exchange-core/shared';

const UserForm = () => {
  const { register, handleSubmit, setError } = useForm<CreateUserDto>();

  const onSubmit = async (data: CreateUserDto) => {
    // Validar com class-validator
    const dto = Object.assign(new CreateUserDto(), data);
    const errors = await validate(dto);

    if (errors.length > 0) {
      errors.forEach(error => {
        setError(error.property as keyof CreateUserDto, {
          message: Object.values(error.constraints || {})[0]
        });
      });
      return;
    }

    // Enviar dados
    await api.post('/users', dto);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email')}
        type="email"
        placeholder="Email"
      />
      <input
        {...register('name')}
        placeholder="Nome"
      />
      <button type="submit">Criar Usuário</button>
    </form>
  );
};
```

### 3. Hook Customizado para Validação

```typescript
import { useState } from 'react';
import { validate } from 'class-validator';

function useValidation<T extends object>(DtoClass: new () => T) {
  const [errors, setErrors] = useState<string[]>([]);
  const [isValidating, setIsValidating] = useState(false);

  const validateData = async (data: Partial<T>) => {
    setIsValidating(true);

    const dto = Object.assign(new DtoClass(), data);
    const validationErrors = await validate(dto);

    if (validationErrors.length > 0) {
      const messages = validationErrors
        .map((error) => Object.values(error.constraints || {}))
        .flat();
      setErrors(messages);
      setIsValidating(false);
      return { isValid: false, errors: messages };
    }

    setErrors([]);
    setIsValidating(false);
    return { isValid: true, data: dto };
  };

  return { validateData, errors, isValidating };
}

// Uso
const UserForm = () => {
  const { validateData, errors } = useValidation(CreateUserDto);

  const handleSubmit = async (formData) => {
    const result = await validateData(formData);
    if (result.isValid) {
      await api.post('/users', result.data);
    }
  };
};
```

## 🔍 Exemplos de Validações

### CreateUserDto - Validações Aplicadas

```typescript
export class CreateUserDto {
  @IsEmail() // Deve ser email válido
  email: string;

  @IsOptional() // Campo opcional
  @IsString() // Deve ser string
  @MinLength(2) // Mínimo 2 caracteres
  @MaxLength(100) // Máximo 100 caracteres
  name?: string;

  @IsOptional()
  @IsEnum(UserRole) // Deve ser um valor do enum
  role?: UserRole;

  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;
}
```

### Resposta de Erro da API

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "email must be an email",
    "name must be longer than or equal to 2 characters",
    "role must be a valid enum value"
  ]
}
```

## 🎯 Benefícios

1. **Validação Consistente**: Mesmas regras no backend e frontend
2. **Melhor UX**: Validação no frontend previne erros
3. **Segurança**: Validação obrigatória no backend
4. **Tipagem Forte**: TypeScript + validação em runtime
5. **Manutenibilidade**: Single source of truth para regras

## 📦 Dependências Adicionadas

```json
{
  "dependencies": {
    "class-validator": "^0.14.0",
    "class-transformer": "^0.5.1"
  }
}
```

## 🚀 Próximos Passos

1. **Testes**: Criar testes unitários para validações
2. **Documentação**: Swagger com validações automáticas
3. **Middleware**: Error handling customizado
4. **Frontend**: Integrar com formulários existentes
