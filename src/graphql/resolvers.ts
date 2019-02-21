import { InMemoryCache } from 'apollo-boost';
import gql from 'graphql-tag';

const query = gql`
  {
    counter @client
  }
`;

interface CounterData {
  counter: number;
}

export default {
  Mutation: {
    counterDecrement: (_: any, params: any, { cache }: { cache: InMemoryCache }) => {
      const data = cache.readQuery<CounterData>({ query });
      if (data === null) {
        return;
      }
      const { counter } = data;
      const nextCounter = counter - 1;
      const nextData = {
        counter: nextCounter,
      };
      cache.writeData({ data: nextData });
      return nextCounter;
    },
    counterIncrement: (_: any, params: any, { cache }: { cache: InMemoryCache }) => {
      const data = cache.readQuery<CounterData>({ query });
      if (data === null) {
        return;
      }
      const { counter } = data;
      const nextCounter = counter + 1;
      const nextData = {
        counter: nextCounter,
      };
      cache.writeData({ data: nextData });
      return nextCounter;
    },
  },
};
