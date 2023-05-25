import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { SERVICES } from './common/constants/services';

@Module({
     imports: [],
     controllers: [ AppController ],
     providers: [
          { provide: SERVICES.APP, useClass: AppService }
     ],
})
export class AppModule {}
