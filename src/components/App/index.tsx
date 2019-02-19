import ApolloClient from 'apollo-boost';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import defaults from '../../graphql/defaults';
import resolvers from '../../graphql/resolvers';
import typeDefs from '../../graphql/typeDefs';
import Hello from './Hello';

const client = new ApolloClient({
  clientState: {
    defaults,
    resolvers,
    typeDefs,
  },
  uri: 'http://localhost:3000/graphql',
});

const App = () => (
  <ApolloProvider client={client}>
    <Hello />
  </ApolloProvider>
);

export default App;
