import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { gql, request } from 'graphql-request';

export function Source() {
  const [posts, setPosts] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    (async () => {
      const query = gql`
          query SourcePostsPaginated($sourceId: Int, $total: Int, $page: Int) {
              sourcePostsPaginated(sourceId: $sourceId, total: $total, page: $page) {
                  id
                  title
              }
          }
      `;

      const variables = {
        sourceId: +id,
        total: 10,
        page: 1,
      };

      const response = await request('http://localhost:4000/graphql', query, variables);
      console.log(response);
      setPosts(response?.sourcePostsPaginated || []);
    })();
  }, []);

  return (
    <div>
      <ul>
        {
          posts.map(post =>
            <li key={post.id}>
              <h4>
                {post.title}
              </h4>
              <button onClick={() => {
                navigate(`/posts/${post.id}`);
              }}>
                read more
              </button>
            </li>,
          )}
      </ul>
    </div>
  );
}
