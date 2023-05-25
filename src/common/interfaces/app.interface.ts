import { Nonce } from "@prisma/client";

export interface AppSvc {
     generateNonce(): Promise<Nonce>;
}