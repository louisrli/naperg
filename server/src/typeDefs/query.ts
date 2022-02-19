import { gql } from 'apollo-server';

export const query = gql`
enum CacheControlScope {
    PUBLIC
    PRIVATE
  }
  
  directive @cacheControl(
    maxAge: Int
    scope: CacheControlScope
    inheritMaxAge: Boolean
  ) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION
  
    type Query {
        # user: User!
        user(userId: Int): User!
        userSettings(userId: Int): UserSetting!
        post(postId: Int): Post
        sourcePosts(sourceId: Int): [Post]
        source(sourceId: Int): Source
        sourcePostsPaginated(sourceId: Int, total: Int, page: Int): [Post]
        sources: [Source]


        #    usersPagination(page: Float!, where: UserWhereInput): UsersPagination!
        #    user(userId: String!): User!
        #
        #    me: User!
    }
`;
