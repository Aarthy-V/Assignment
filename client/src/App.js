import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import { UserContextProvider } from "./userContext";

//component imports
import Layout from "./components/Layout";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import NewPostPage from "./pages/NewPostPage";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/create" element={<NewPostPage />} />
          
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
