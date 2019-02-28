/* tslint:disable jsx-no-multiline-js */
import gql from 'graphql-tag';
import React from 'react';
import { Mutation, Query, QueryResult } from 'react-apollo';
import HelloView from './HelloView';

export interface HelloData {
  counter: number;
  hello: string;
}

class HelloQuery extends Query<HelloData> {}

const COUNTER_DECREMENT = gql`
  mutation {
    counterDecrement @client
  }
`;

const COUNTER_INCREMENT = gql`
  mutation {
    counterIncrement @client
  }
`;

const GET_HELLO = gql`
  {
    counter @client
    hello
  }
`;

const Hello = () => (
  <Mutation mutation={COUNTER_DECREMENT}>
    {counterDecrement => (
      <Mutation mutation={COUNTER_INCREMENT}>
        {counterIncrement => (
          <HelloQuery query={GET_HELLO}>
            {({ data, error, loading }: QueryResult<HelloData>) => (
              <HelloView
                data={data}
                error={error !== undefined}
                loading={loading}
                counterDecrement={counterDecrement}
                counterIncrement={counterIncrement}
              />
            )}
          </HelloQuery>
        )}
      </Mutation>
    )}
  </Mutation>
);

export default Hello;
