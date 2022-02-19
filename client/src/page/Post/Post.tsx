import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { gql, request } from 'graphql-request';
import { Urls } from '../../lib/urls';

export function Post() {
  const [post, setPost] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      // TODO `remove properties that not need`
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

      const response = await request(Urls.graphql, query, variables);
      setPost(response?.post);
    })();
  }, []);


  // @ts-ignore avoid ts-ignore and add types for response
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
