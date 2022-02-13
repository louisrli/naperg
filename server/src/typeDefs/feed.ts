import { gql } from 'apollo-server';

export const feed = gql`
    type AddSourceFeedRelation {
        feedId: ID!
    }

`;
