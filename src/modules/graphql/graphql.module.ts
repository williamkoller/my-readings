import { Module } from '@nestjs/common';
import { imports } from './graphql.settings';

@Module({
  imports,
})
export class GraphqlModule {}
