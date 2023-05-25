import { CanActivate, ExecutionContext, ForbiddenException, Inject, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { PrismaService } from "src/common/services/prisma.service";
import { SERVICES } from "../utility/services";
import { ConfigService } from "@nestjs/config";
import * as argon2 from 'argon2';
import { ApiScope } from "@prisma/client";

@Injectable()
export class AuthGuard implements CanActivate {
     constructor(private readonly reflector: Reflector, @Inject(SERVICES.PRISMA) private readonly prisma: PrismaService, private readonly configService: ConfigService) {}
     
     async canActivate(context: ExecutionContext): Promise<boolean> {
          const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());

          if (isPublic) return true;

          const request: Request = context.switchToHttp().getRequest();

          if (!request.headers || !request.headers['x-api-key'] || !request.headers['x-api-key-for']) throw new UnauthorizedException('You must be authorized to access this endpoint.');

          const requestAPIKey = request.get('x-api-key');
          const requestUser = request.get('x-api-key-for');

          const apiKeyRecord = await this.prisma.apiKey.findUnique({
               where: {
                    for: requestUser
               }
          });

          if (!apiKeyRecord) throw new ForbiddenException("You are not authorized to access this endpoint");
          if (apiKeyRecord.expires && new Date().getTime() > apiKeyRecord.expires.getTime()) throw new ForbiddenException('Your API key has expired.');

          try {
               if (await argon2.verify(apiKeyRecord.key, requestAPIKey, { secret: Buffer.from(this.configService.get('KEY_SECRET')) })) {
                    const scopes = this.reflector.get<ApiScope[]>('scopes', context.getHandler());

                    if (!scopes) return true;

                    for (const scope of scopes) {
                         if (apiKeyRecord.scopes.includes(scope) || apiKeyRecord.scopes.includes('ADMIN')) return true;
                    }
               } else throw new ForbiddenException('You are not authorized to access this endpoint');
          } catch (error) {
               console.log(error);

               throw new InternalServerErrorException('An error occurred. Please try again later.');
          }
     }
}