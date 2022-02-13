export function Post({ title, content, url) {
  return (
    <div>
      <h1>
        {title}
      </h1>
      <p dangerouslySetInnerHTML={{ __html: content }} />
      <a href={url} target="_blank">investigate us</a>
    </div>
  );
}
