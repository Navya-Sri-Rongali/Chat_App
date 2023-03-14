import React, { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";
import './Register.css'
import { personid } from "../App";
function Register() {
  const userid = useContext(personid);
  const [usertext, setusertext] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const submithandler = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/register", {
      username: usertext.username,
      email: usertext.email,
      password: usertext.password,
      confirm_password: usertext.confirm_password,
    }).then((res) => {
      userid[1](res?.data?._id);
    })
    alert("User registered Successfully🙌");
  };

  return (
    <div className="register-back">
      <center>
        
        <form onSubmit={submithandler} >
          <div className="register_input">
            <input 
              className="rinput"
              type="text"
              placeholder="Username*"
              value={usertext.username}
              onChange={(e) => {
                setusertext({ ...usertext, username: e.target.value });
              }}
            ></input>
          </div>
          <div className="register_input">
            <input
              className="rinput"
              type="text"
              placeholder="Email*"
              value={usertext.email}
              onChange={(e) => {
                setusertext({ ...usertext, email: e.target.value });
              }}
            ></input>
          </div>
          <div className="register_input">
            <input
              className="rinput"
              type="text"
              placeholder="Password*"
              value={usertext.password}
              onChange={(e) => {
                setusertext({ ...usertext, password: e.target.value });
              }}
            ></input>
          </div>
          <div className="register_input">
            <input
              className="rinput"
              type="text"
              placeholder="Confirm_password*"
              value={usertext.confirm_password}
              onChange={(e) => {
                setusertext({ ...usertext, confirm_password: e.target.value });
              }}
            ></input>
          </div>
          <button className="inbutton">SignUp</button>
        </form>
        <br />
        
      </center>
    </div>
  );
}

export default Register;
