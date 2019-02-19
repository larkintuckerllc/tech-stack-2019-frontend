import gql from 'graphql-tag';

const query = gql`
  {
    counter @client
  }
`;

export default {
  Mutation: {
    counterDecrement: (_: any, params: any, { cache }: any) => {
      const { counter } = cache.readQuery({ query });
      const nextCounter = counter - 1;
      const data = {
        counter: nextCounter,
      };
      cache.writeData({ data });
      return nextCounter;
    },
    counterIncrement: (_: any, params: any, { cache }: any) => {
      const { counter } = cache.readQuery({ query });
      const nextCounter = counter + 1;
      const data = {
        counter: nextCounter,
      };
      cache.writeData({ data });
      return nextCounter;
    },
  },
};
