import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    const token = request.cookies['accessToken'];
    if (!token) throw new ForbiddenException('Access token not found');

    let payload: any;
    try {

      payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string);

    } catch {
      throw new ForbiddenException('Invalid token');
    }

    if (!requiredRoles.includes(payload.role)) {
      throw new ForbiddenException('Access denied');
    }

    request.user = payload; 
    return true;
  }
}
