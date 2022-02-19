import { useQuery, gql, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';

const query = gql`
  query UserSettings {
    userSettings {
      id
      theme
    }
  }
`;

const mutationQueryUpdateUserSettings = gql`
  mutation UpdateUserSettings($theme: String, $userId: Int!) {
    updateUserSettings(theme: $theme, userId: $userId) {
      theme
      userId
    }
  }
`;

export const User = () => {
  const [inputText, setInputText] = useState('');
  const [isFormEddited, setIsFormEddited] = useState(false);
  const { loading, error, data, refetch } = useQuery(query);
  const [updateUserSettings] = useMutation(mutationQueryUpdateUserSettings);

  const { id, theme } = data?.userSettings || {};

  const onSubmit = async (e) => {
    e.preventDefault();

    await updateUserSettings({
      variables: {
        theme: inputText,
        // TODO: delete hardcode userId when auth will be
        userId: 1,
      },
    });

    await refetch();

    setIsFormEddited(false);
  };

  const onChangeInput = (e) => {
    setInputText(e.target.value);
    setIsFormEddited(true);
  };

  useEffect(() => {
    setInputText(theme);
  }, [theme]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div className='user'>
      <h4>User</h4>
      <form onSubmit={onSubmit}>
        <p>id: {id}</p>
        <label>
          theme:{' '}
          <input type='text' value={inputText || ''} onChange={onChangeInput} />
        </label>
        {isFormEddited && <button type='submit'>Save</button>}
      </form>
    </div>
  );
};
