const Blog = ({ id, createdAt, summary, content, author ,image, title }) => {
  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  return (
    <div className="blog">
      <div className="image">
        <img
          // src="https://images.unsplash.com/photo-1474511320723-9a56873867b5?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          // use above line if no image is provided
          src={`http://localhost:3001/${image}`}
          alt="blog image"
        />
      </div>
      <div className="texts">
        <h2>{title}</h2>
        <p className="info">
          <a className="author">{author?.username || "user1"}</a>
          <time>{formatDate(createdAt)}</time>
        </p>
        <p className="tdlr">{summary}</p>
      </div>
    </div>
  );
};

export default Blog;
