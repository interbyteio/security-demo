import { SetMetadata } from "@nestjs/common";
import { ApiScope } from '@prisma/client';

export const Scopes = (...scopes: ApiScope[]) => SetMetadata('scopes', scopes);