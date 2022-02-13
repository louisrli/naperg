import { ApolloServer } from 'apollo-server';
import { resolvers } from './schema';
import { createContext } from './context';
import { makeExecutableSchema } from 'graphql-tools';
import { query } from './typeDefs/query';
import { user } from './typeDefs/user';
import { feed } from './typeDefs/feed';
import { source } from './typeDefs/source';
import { post } from './typeDefs/post';
import { mutation } from './typeDefs/mutation';

const schema = makeExecutableSchema({
  typeDefs: [query, user, feed, source, post, mutation],
  resolvers,
});

new ApolloServer({ schema, context: createContext }).listen(
  { port: 4000 },
  () => console.log(`🚀 Server ready at: http://localhost:4000 ⭐️⭐️⭐️⭐️`),
).catch((e) => {
  console.error(e);
  process.exit(1);
});
