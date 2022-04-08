import { User } from '@/modules/users/schemas/user.schema';

export interface Encrypter {
  encrypt: (user: User) => Promise<string>;
}
