import { useEffect, useState } from 'react';
import { request, gql } from 'graphql-request';


export function SourcesList() {
  const [sources, setSources] = useState([]);
  useEffect(() => {
    (async () => {
      const query = gql`
          mutation Mutation {
              refreshFeeds
          }
      `;
      const data = await request('http://localhost:4000/graphql', query);
      setSources()
    })();
  }, []);

  return (
    <div>
      List of source
    </div>
  );
}
