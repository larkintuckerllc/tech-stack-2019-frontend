import gql from 'graphql-tag';
import React from 'react';
import { Query, QueryResult } from 'react-apollo';
import HelloView from './HelloView';

const GET_HELLO = gql`
  {
    hello
  }
`;

export interface HelloData {
  hello: string;
}

class HelloQuery extends Query<HelloData> {}

const Hello = () => (
  <HelloQuery query={GET_HELLO}>
    {({ ...props }: QueryResult<HelloData>) => <HelloView {...props} />}
  </HelloQuery>
);

export default Hello;
