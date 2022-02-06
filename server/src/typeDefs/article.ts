import { gql } from 'apollo-server'

export const article = gql`
  type Article {
		id:           String!
		createdAt:    DateTime!
		updatedAt:    DateTime!
		sourceId:    String!
		author:       String
		title:        String!
		slug:         String!
		shortContent: String!
		users:        [ArticlesForUser]
  }
`
