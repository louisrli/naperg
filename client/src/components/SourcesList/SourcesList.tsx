import { useEffect, useState } from 'react';
import { request, gql } from 'graphql-request';
import { Link } from 'react-router-dom';


export function SourcesList() {
  const [sources, setSources] = useState([]);
  useEffect(() => {
    (async () => {
      const query = gql`
          query Sources {
              sources {
                  id
                  title
                  url
              }
          }
      `;

      const response = await request('http://localhost:4000/graphql', query);
      setSources(response?.sources || []);
    })();
  }, []);

  return (
    <div>
      <ul>
        {
          sources.map(source =>
            <li key={source.id}>
              <Link to={`/sources/${source.id}`}>
                {source.title}
              </Link>
            </li>,
          )
        }
      </ul>
    </div>
  );
}
