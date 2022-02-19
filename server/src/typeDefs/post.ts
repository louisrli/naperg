import { gql } from 'apollo-server';

export const post = gql`
    type Post {
        id: ID!,
        sourceId: Int,
        source: Source,
        title: String,
        content: String,
        url: String,
        imgUrl: String,
        createdAt: DateTime,
        updatedAt: DateTime,
    }

`;
