import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';

import {
  ADMIN_KEY,
  PUBLIC_KEY,
  ROLES_KEY,
} from 'src/common/constants/key-decorators';
import { ROLES } from 'src/common/constants/roles';
import { createCustomException } from 'src/utils/exceptionsGenerator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) return true;

    const roles = this.reflector.get<Array<keyof typeof ROLES>>(
      ROLES_KEY,
      context.getHandler(),
    );

    const admin = this.reflector.get<string>(ADMIN_KEY, context.getHandler());

    const { roleUser } = context.switchToHttp().getRequest<Request>();

    if (roles === undefined) {
      if (!admin) {
        return true;
      } else if (admin && roleUser === admin) {
        return true;
      } else {
        throw createCustomException(
          'Forbidden access',
          403,
          'Auth',
        );
      }
    }
    
    if (roleUser === ROLES.ADMIN) 
      return true;
    

    // si el role que me llega con el controlador es el mismo role del usuario
    const isAuth = roles.some((role) => role === roleUser);

    if (!isAuth) {
      throw createCustomException(
        'No tienes permiso',
        403,
        'Auth',
      );
    }
    return true;
  }
}
