import { gql } from 'apollo-server'

export const mutation = gql`
  type Mutation {
    signupUser(email: String!, password: String!): AuthPayload!
#    updateUser(data: UserUpdateInput!, userId: String!): User!
#    loginUser(email: String!, password: String!): AuthPayload!
#    forgetPassword(email: String!): Boolean!
#    resetPassword(password: String!, resetPasswordToken: String!): AuthPayload!
#    deleteUser(userId: String!): User!
  }
`
