import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../userContext";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setUserInfo(response.data);
      });
  }, []);

  const logout = () => {
    axios
      .post(
        "http://localhost:3001/logout",
        {},
        {
          withCredentials: true,
        }
      )
      .then(
        (response) => {
          console.log(response);
          if (response.status == 200) {
            alert("Success");
            setUserInfo(null);
            navigate("/");
          } else {
            alert("Failed");
          }
        },
        (error) => {
          console.log(error);
          alert("Failed");
        }
      );
  };

  let username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {username ? (
          <>
            <Link to="/create">New Post</Link>
            <a onClick={logout}>Logout</a>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
