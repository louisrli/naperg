import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

export function SourcesList() {
  const query = gql`
    query Sources {
      sources {
        id
        title
        url
      }
    }
  `;

  const { loading, error, data } = useQuery(query);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <ul>
        {data?.sources.map((source) => (
          <li key={source.id}>
            <Link to={`/sources/${source.id}`}>{source.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
