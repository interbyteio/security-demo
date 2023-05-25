import { Controller, Get, Inject } from '@nestjs/common';
import { SERVICES } from './common/utility/services';
import { AppSvc } from './common/interfaces/app.interface';
import { ROUTES } from './common/utility/routes';
import { Public } from './common/decorators/public.decorator';
import { Scopes } from './common/decorators/scopes.decorator';

@Controller(ROUTES.APP)
export class AppController {
     constructor(@Inject(SERVICES.APP) private readonly appService: AppSvc) {}

     @Get('health')
     @Public()
     getHealth() {
          return { message: "OK" }
     }

     @Get('nonce')
     @Scopes('RECEIVE_NONCE')
     async getNonce() {
          const nonce = await this.appService.generateNonce();

          return { nonce: nonce.nonce };
     }
}
