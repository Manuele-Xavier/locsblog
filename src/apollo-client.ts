import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: 'https://admlocsblog.com.br/graphql', 
    cache: new InMemoryCache(),
  });
  
  export default client;