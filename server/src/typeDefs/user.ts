import { gql } from 'apollo-server'

export const user = gql`
  scalar DateTime
  type User {
    id: ID!
    fullName: String
    email: String!
    createdAt: DateTime!
  }
  enum Role {
    ADMIN
    USER
  }

  input UserWhereInput {
    search: String
    name: SearchObj
  }
  input SearchObj {
    contains: String
  }
  type UsersPagination {
    users: [User!]!
    count: Float!
    take: Float!
  }
  input UserUpdateInput {
    name: String
    role: Role
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input UserCreateInput {
    email: String!
    password: String!
    name: String
  }

  type UserSetting {
    id: Int!
    userId: Int!
    theme: String
  }
`
