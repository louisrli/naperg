import { gql } from 'apollo-server'

export const feed = gql`
  scalar DateTime
  type Feed {
    id: String!
    title: String!
    createdAt: DateTime!
    user: User!
    userId: String!
    sources: [Source]
  }
`