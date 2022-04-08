import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/modules/users/schemas/user.schema';

export const imports = [
  MongooseModule.forFeature([
    {
      name: User.name,
      schema: UserSchema,
    },
  ]),
];
