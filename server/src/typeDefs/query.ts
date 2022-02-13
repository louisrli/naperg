import { gql } from 'apollo-server';

export const query = gql`
    type Query {
        # user: User!
        user(userId: Int): User!
        userSettings(userId: Int): UserSetting!
        sources: [Source]

        #    usersPagination(page: Float!, where: UserWhereInput): UsersPagination!
        #    user(userId: String!): User!
        #
        #    me: User!
    }
`;
