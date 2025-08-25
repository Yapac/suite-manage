import { Global, Module } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Global()
@Module({
  providers: [
    {
      provide: 'PUB_SUB',
      useValue: pubSub,
    },
  ],
  exports: ['PUB_SUB'],
})
export class PubSubModule {}

export interface TypedPubSub extends PubSub {
  asyncIterator<T>(triggers: string | string[]): AsyncIterableIterator<T>;
}
