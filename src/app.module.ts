import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { SERVICES } from './common/utility/services';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/guards/auth.guard';
import { PrismaService } from './common/services/prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
     imports: [
          ConfigModule
     ],
     controllers: [ AppController ],
     providers: [
          { provide: SERVICES.PRISMA, useClass: PrismaService },
          { provide: APP_GUARD, useClass: AuthGuard },
          { provide: SERVICES.APP, useClass: AppService },
     ],
})
export class AppModule {}
