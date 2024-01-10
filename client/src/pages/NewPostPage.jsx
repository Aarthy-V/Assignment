import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const NewPostPage = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const createPost = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("title", title);
    data.append("summary", summary);
    data.append("content", content);
    data.append("image", image);

    data.forEach((file) => console.log("File: ", file));

    await axios
      .post("http://localhost:3001/createpost", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then(
        (response) => {
          console.log(response);
          if (response.status == 200) {
            alert("Success");
            navigate("/");
          } else {
            alert("Failed");
          }
        },
        (error) => {
          console.log(error);
          alert("Failed");
        }
      )
      .catch();
  };

  return (
    <form className="newpost" onSubmit={createPost}>
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />
      <input
        type="text"
        placeholder="summary"
        value={summary}
        onChange={(event) => setSummary(event.target.value)}
        required
      />
      <input
        type="file"
        required
        onChange={(event) => {
          setImage(event.target.files[0]);
        }}
      />
      <ReactQuill
        value={content}
        onChange={(value) => setContent(value)}
        style={{
          marginLeft: "10px",
          width: "100%",
          backgroundColor: "aliceBlue",
        }}
        placeholder="content"
        modules={modules}
        required
      />
      <button type="submit" style={{ marginTop: "30px" }}>
        Post
      </button>
    </form>
  );
};

export default NewPostPage;
