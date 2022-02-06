import { gql } from 'apollo-server'

export const source = gql`
  type Source {
		id: String
		slug:      String
		title:     String
		feedId:    String
		articles:  [Article]
  }
`
