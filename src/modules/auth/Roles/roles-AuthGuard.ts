// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { Reflector } from '@nestjs/core';
// import { Roles } from './roles.decorator';

// @Injectable()
// export class RolesAuthGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const roles = this.reflector.get(Roles, context.getHandler());
//     if (!roles) {
//       return true;
//     }
//     const request = context.switchToHttp().getRequest();
//     const requestRoles = request.user?.roles ?? [];
//     console.log(roles);
//     return requestRoles.some((reqRole: string) => roles.includes(reqRole));
//   }
// }
