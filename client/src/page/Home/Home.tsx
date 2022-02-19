import { useQuery, gql } from '@apollo/client';
import {PostPreview} from '../../components/PostPreview/PostPreview'

export function Home() {
  
  const query = gql`
  query Query {
    headlines {
      title
      id
    }
  }
  `;
  
  const { loading, error, data } = useQuery(query);
  
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div>
      <div>
        <p>Hello, that's super application here you read awesome rss feeds</p>
        <h2>Headlines</h2>
        <ul>
        {data?.headlines.map((post) => (
          <li key={post.id}>
            {/* @ts-ignore*/}
            <PostPreview title={post.title} id={post.id}/>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}
