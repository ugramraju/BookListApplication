import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios";
import "./Login.css"
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
      const res = await axios.post("https://booklistapplication.onrender.com/api/user/login", data,{withCredentials:true});
      if(res.data.msg === "Login Successfully"){
        navigate("/displaydata")
      }
      console.log(res)
    } catch (err) {
      setErrormsg("Invalid username or password");
    }
  };

  return (
    <div className="maincontainer">
      <div className="container">
      <h1 id="Signin-Heading">Member Login</h1>
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
     
        <input type="submit" id="btn" onClick={handleSubmit} value="LOGIN"/>
         
        
        <p id="forgot">Forgot Password?</p>
      </form>
    </div>
    </div>
  );
};

export default Login;
