import { VerifyTokenType } from '@/modules/auth/types/verify-token/verify-token.type';

export interface Decrypter {
  decrypt: (token: string) => Promise<VerifyTokenType>;
}
