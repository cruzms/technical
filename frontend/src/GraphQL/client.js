import {
  ApolloClient, InMemoryCache, createHttpLink
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("gh_access_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLink = createHttpLink({
  uri: "https://api.github.com/graphql",
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;