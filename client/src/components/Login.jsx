import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../userContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {setUserInfo} = useContext(UserContext);
  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();
    const response = await axios
      .post(
        "http://localhost:3001/login",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then(
        (response) => {
          console.log(response);
          if (response.status == 200) {
            // response.json().then((user) => {
            //   setUserInfo(user);
            //   alert("Success");
            //   navigate("/");
            // });
            console.log(response.data);
            setUserInfo(response.data);
            alert("Success");
            navigate("/");
          } else {
            alert("Login Failed");
          }
        },
        (error) => {
          if (error.response.status == 400) {
            if (error.response.data?.error == "User not found") {
              console.log(error.response.data?.error);
              alert("User not found");
            } else if (error.response.data?.error == "Password incorrect") {
              console.log(error.response.data?.error);
              alert("Username or Password incorrect");
            } else {
              console.log(error.response.data?.error);
              alert("Login Failed");
            }
          } else {
            alert("Login Failed");
          }
        }
      );
  };

  return (
    <form className="login" action="" onSubmit={login}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
