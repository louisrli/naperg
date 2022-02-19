import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { gql, request } from 'graphql-request';
import { Urls } from '../../lib/urls';

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

      // TODO `avoid magic number and implement select total and page`
      const variables = {
        sourceId: parseInt(id, 10),
        total: 10,
        page: 1,
      };

      const response = await request(Urls.graphql, query, variables);
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
