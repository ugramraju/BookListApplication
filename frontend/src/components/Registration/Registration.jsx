import React, { useState } from "react";
import axios from "axios";
import {Link,useNavigate} from "react-router-dom"
const Registration=()=>{
    const navigate = useNavigate()
    const [data,setData] = useState({});
    const[msg,setErrMsg] = useState("");
    const[msg1,setErrMsg1] = useState("")
    
    const handleLogin=(e)=>{
        e.preventDefault()
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!data.username || !data.password){
            setErrMsg("Kindly Fill All Details")
            return;
        }
        if(data.password !== data.confirmpassword){
            setErrMsg("Password And Confirm Passwords are not MAtched!")
            return;
        }
        axios.post("http://localhost:8000/api/user/registration", data)
        .then((res)=>{
            setData({});
            setErrMsg("");
            setErrMsg1("Registration Done!");
            console.log(res.data);
            if(res.data === "User Registered Successfully"){
                navigate("/login")
            }
        })
    }
    return(
        <div>
            <h1>Register</h1>
            <span id="err_msg">{msg}</span>
            <span id="err_msg_1">{msg1}</span>
            <form id="form">
                <input type="text"
                placeholder="Username"
                id="username"
                value={data.username || ""}
                onChange={(e)=>setData({...data,username:e.target.value})}
                />
                <br/>
                <input type="password"
                placeholder="Password"
                id="password"
                value={data.password || ""}
                onChange={(e)=>setData({...data,password:e.target.value,confirmpassword:data.confirmpassword})}
                />
                <br/>
                <input type="password"
                placeholder="Confirm Password"
                id="confirmpassword"
                value={data.confirmpassword || ""}
                onChange={(e)=>setData({...data,confirmpassword:e.target.value,password:data.password})}
                />
                <br/>
                <button type="submit" id="btn" onClick={handleSubmit}>REGISTER</button>
            </form>
            <span onClick={handleLogin} id="sign_btn">
                <Link to="/login">Member Login</Link>
            </span>
        </div>
    )
}
export default Registration;