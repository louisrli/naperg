import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { gql, request } from 'graphql-request';
import { Link } from 'react-router-dom';

export function Source() {
  const [posts, setPosts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const query = gql`
          query Query($sourceId: Int) {
              sourcePosts(sourceId: $sourceId) {
                  id
                  sourceId
                  title
                  url
                  imgUrl
                  createdAt
              }
          }
      `;

      const variables = {
        'sourceId': +id,
      };

      const response = await request('http://localhost:4000/graphql', query, variables);
      setPosts(response?.sourcePosts || []);
    })();
  }, []);

  return (
    <div>
      <ul>
        {posts.map(post =>
          <li>
            <Link to={'null'}>
              {post.title}
            </Link>
          </li>)}
      </ul>
    </div>
  );
}
