import { useNavigate, useParams } from 'react-router';
import { useQuery, gql } from '@apollo/client';

export function Source() {
  const { id } = useParams();
  const navigate = useNavigate();

  const query = gql`
    query SourcePostsPaginated($sourceId: Int, $total: Int, $page: Int) {
      sourcePostsPaginated(sourceId: $sourceId, total: $total, page: $page) {
        id
        title
      }
    }
  `;

  const variables = {
    sourceId: parseInt(id, 10),
    total: 10,
    page: 1,
  };

  const { loading, error, data } = useQuery(query, { variables });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <ul>
        {data?.sourcePostsPaginated.map((post) => (
          <li key={post.id}>
            <h4>{post.title}</h4>
            <button
              onClick={() => {
                navigate(`/posts/${post.id}`);
              }}
            >
              read more
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
