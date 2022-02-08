import { gql } from 'apollo-server'

export const subscriptionPlan = gql`
  scalar DateTime
  type SubscriptionPlan {
    id: String!
    type: String!
    createdAt: DateTime!
    expirationDate: DateTime!
    originalExpirationDate: DateTime!
    user: User!
    userId: String!
  }

  type AvailableSubscriptionPlan {
    type: String!
    title: String!
    priceWithSale: Int!
    priceWithoutSale: Int!
    duration: String!
    currency: String!
  }
`
