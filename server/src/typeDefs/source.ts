import { gql } from 'apollo-server';

export const source = gql`
    type Source {
        id: ID!,
        title: String,
        url: String,
    }
`;
