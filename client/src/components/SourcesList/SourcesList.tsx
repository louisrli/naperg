import { useEffect, useState } from 'react';
import { request, gql } from 'graphql-request';
import { Link } from 'react-router-dom';
import { Urls } from '../../lib/urls';


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

      const response = await request(Urls.graphql, query);
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
