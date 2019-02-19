import ApolloClient from 'apollo-boost';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import Hello from './Hello';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
});

const App = () => (
  <ApolloProvider client={client}>
    <Hello />
  </ApolloProvider>
);

export default App;
