import { Injectable } from '@nestjs/common';
import { AppSvc } from './common/interfaces/app.interface';
import * as crypto from 'crypto';

@Injectable()
export class AppService implements AppSvc {
     generateNonce(): string {
          return crypto.randomUUID();
     }
}
