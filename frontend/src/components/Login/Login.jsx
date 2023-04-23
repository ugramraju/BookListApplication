import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios";

const Login = () => {
const navigate=useNavigate()
  const [data, setData] = useState({});
  const [msg, setErrormsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.username || !data.password) {
      setErrormsg("Please fill in all the fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/api/user/login", data,{withCredentials:true});
      if(res.data.msg === "Login Successfully"){
        navigate("/displaydata")
      }
      console.log(res)
    } catch (err) {
      setErrormsg("Invalid username or password");
    }
  };

  return (
    <div className="container">
      <h4 id="Signin-Heading">Member Login</h4>
      <span id="errMsg-1">{msg}</span>
      <form id="form">
        <input
          type="text"
          placeholder="Username"
          id="username"
          value={data.username || ""}
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          id="user_password"
          autoComplete="on"
          value={data.password || ""}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <br />
        <button type="submit" id="btn" onClick={handleSubmit}>
          LOGIN
        </button>
        <p id="forgot">Forgot Password?</p>
      </form>
    </div>
  );
};

export default Login;
