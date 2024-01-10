import { useEffect, useState } from "react";
import axios from "axios";
import Blog from "../components/Blog";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function getBlogs() {
      const res = await axios.get("http://localhost:3001/blogs");
      if (res.status != 200) {
        alert("Failed to fetch data");
      } else {
        console.log(res.data);
        setBlogs(res.data);
      }

      console.log(res.data);
    }

    getBlogs();
  }, []);

  return (
    <>
      {blogs.length > 0 ? (
        blogs.map((blog) => <Blog {...blog} key={blog.id} />)
      ) : (
        <h3>No blogs to show</h3>
      )}
    </>
  );
};

export default Home;
