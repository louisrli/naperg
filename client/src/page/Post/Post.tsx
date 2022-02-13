import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { gql, request } from 'graphql-request';

export function Post() {
  const [post, setPost] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
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
        postId: +id,
      };

      const response = await request('http://localhost:4000/graphql', query, variables);
      setPost(response?.post);
    })();
  }, []);


  return (
    <div>
      <h1>
        {/*@ts-ignore*/}
        {post.title}
      </h1>
      {/*@ts-ignore*/}
      <p dangerouslySetInnerHTML={{ __html: post.content }} />
      {/*@ts-ignore*/}
      <a href={post.url} target='_blank'>investigate us</a>
    </div>
  );
}
