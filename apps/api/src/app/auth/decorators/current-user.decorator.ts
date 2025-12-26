import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../dto';

export const CurrentUser = createParamDecorator(
  (data: keyof JwtPayload | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
