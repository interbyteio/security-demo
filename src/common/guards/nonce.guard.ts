import { CanActivate, ExecutionContext, ForbiddenException, Inject, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { PrismaService } from "src/common/services/prisma.service";
import { SERVICES } from "../utility/services";
import { ConfigService } from "@nestjs/config";
import * as argon2 from 'argon2';

@Injectable()
export class NonceGuard implements CanActivate {
     constructor(private readonly reflector: Reflector, @Inject(SERVICES.PRISMA) private readonly prisma: PrismaService, private readonly configService: ConfigService) {}
     
     async canActivate(context: ExecutionContext): Promise<boolean> {
          const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());

          if (isPublic) return true;

          const request: Request = context.switchToHttp().getRequest();

          if (!request.headers || !request.headers['nonce']) throw new UnauthorizedException('You must be authorized to access this endpoint.');

          const nonce = request.get('nonce');

          const nonceRecord = await this.prisma.nonce.findFirst({
               where: {
                    nonce
               }
          });

          if (!nonceRecord) throw new ForbiddenException('You must be authorized to access this endpoint');

          await this.prisma.nonce.delete({
               where: {
                    nonce: nonceRecord.nonce
               }
          });

          return true;
     }
}