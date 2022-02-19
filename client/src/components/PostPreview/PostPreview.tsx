import { useNavigate } from 'react-router';

export function PostPreview({title, id}) {
  const navigate = useNavigate();
  return (
    <div>
      <h4>{title}</h4>
      <button
        onClick={() => {
          navigate(`/posts/${id}`);
        }}
      >
        read more
      </button>
    </div>
  );
}
