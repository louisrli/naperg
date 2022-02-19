import { gql } from 'apollo-server';

const headlinesAge = 30 * 60 * 60

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
      user: User!
      userSettings: UserSetting!
      post(postId: Int): Post
      headlines: [Post] @cacheControl(maxAge: ${headlinesAge})
      sourcePosts(sourceId: Int): [Post] @cacheControl(maxAge: 30)
      source(sourceId: Int): Source
      sourcePostsPaginated(sourceId: Int, total: Int, page: Int): [Post] @cacheControl(maxAge: 30)
      sources: [Source]


      #    usersPagination(page: Float!, where: UserWhereInput): UsersPagination!
      #    user(userId: String!): User!
      #
      #    me: User!
  }
`;
