import { useEffect, useState } from 'react';
import { request, gql } from 'graphql-request';


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
      console.log(response);
      setSources(response?.sources || []);
    })();
  }, []);

  return (
    <div>
      <ul>
        {sources.map(source =>
          <li>
            {source.title}
          </li>)
        }
      </ul>
    </div>
  );
}
