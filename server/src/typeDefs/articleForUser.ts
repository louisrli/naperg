import { gql } from 'apollo-server'

export const articlesForUser = gql`
  type ArticlesForUser {
		userId:     String!
		articleId:  String!
		isRead:     Boolean!
		isFavorite: Boolean!
		isHidden:   Boolean
  }
`
