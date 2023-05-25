import { Inject, Injectable } from '@nestjs/common';
import { AppSvc } from './common/interfaces/app.interface';
import * as crypto from 'crypto';
import { SERVICES } from './common/utility/services';
import { PrismaService } from './common/services/prisma.service';
import { Nonce } from '@prisma/client';

@Injectable()
export class AppService implements AppSvc {
     constructor(@Inject(SERVICES.PRISMA) private readonly prisma: PrismaService) {}

     generateNonce(): Promise<Nonce> {
          const nonce = crypto.randomUUID();

          return this.prisma.nonce.create({
               data: {
                    nonce
               }
          });
     }
}
