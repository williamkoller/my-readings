import { GraphQLModule } from '@nestjs/graphql';

export const imports = [
  GraphQLModule.forRoot({
    autoSchemaFile: './schema.gql',
    debug: true,
    playground: true,
  }),
];
