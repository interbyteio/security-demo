import { Controller, Get, Inject } from '@nestjs/common';
import { SERVICES } from './common/constants/services';
import { AppSvc } from './common/interfaces/app.interface';
import { ROUTES } from './common/constants/routes';

@Controller(ROUTES.APP)
export class AppController {
     constructor(@Inject(SERVICES.APP) private readonly appService: AppSvc) {}

     @Get('health')
     getHealth() {
          return { message: "OK" }
     }

     @Get('nonce')
     getNonce() {
          const nonce = this.appService.generateNonce();

          return { nonce };
     }
}
