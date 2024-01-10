import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signup = async (event) => {
    event.preventDefault();

    const response = await axios
      .post("http://localhost:3001/register", {
        username: username,
        email: email,
        password: password,
      })
      .then(
        (response) => {
          console.log(response);
          if (response.status != 200) {
            alert("Failed");
          } else {
            alert("Success");
            navigate("/login");
          }
        },
        (error) => {
          console.log(error);
          alert("Failed");
        }
      );
  };

  return (
    <form className="signup" onSubmit={signup}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        required
      />
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default SignUp;
