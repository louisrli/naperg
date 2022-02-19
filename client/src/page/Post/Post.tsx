import { useParams } from 'react-router';
import { useQuery, gql } from '@apollo/client';

export function Post() {
  const { id } = useParams();

  const query = gql`
    query Post($postId: Int) {
      post(postId: $postId) {
        id
        sourceId
        title
        content
        url
        imgUrl
        createdAt
        updatedAt
      }
    }
  `;

  const variables = {
    postId: parseInt(id, 10),
  };

  const { loading, error, data } = useQuery(query, { variables });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { post } = data || {};

  return (
    <div>
      <h1>{post.title}</h1>
      <p dangerouslySetInnerHTML={{ __html: post.content }} />
      <a href={post.url} target='_blank' rel='noreferrer'>
        investigate us
      </a>
    </div>
  );
}
