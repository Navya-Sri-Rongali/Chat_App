import React, { createContext, useContext, useEffect, useState } from "react";
import {person } from '../App.js'
import axios from "axios";
import "./Register.css";
import { personuser } from "../App.js";
function Signin() {
  const loginuser = useContext(personuser);
  const [usertextin, setusertextin] = useState({
    email: "",
    password: "",
  });
  const usertoken = useContext(person);
  const submithandler = async (e) => {
    e.preventDefault();
    console.log(
      "The email and Password is  : ",
      usertextin.email,
      usertextin.password
    );
    await axios
      .post("http://localhost:5000/login", {
        username:usertextin.username,
        email: usertextin.email,
        password: usertextin.password,
      })
      .then((res) => {
        console.log("data obtained from response:", res.data);

        localStorage.setItem("Token", res?.data?.token);
        usertoken[1](res?.data?.token);
        if (res?.data?.token === undefined) alert("Please register");
        else {
          alert("Loggedin Successfully");
        }
      })
      .catch((err) => {
        console.log("This error occured in sigin as user");
      });
  };

  return (
    <div>
      <form onSubmit={submithandler} className="in-form">
        <div>
          <input
            className="ininput"
            type="text"
            placeholder="Username*"
            value={usertextin.username}
            onChange={(e) => {
              setusertextin({ ...usertextin, username: e.target.value });
              loginuser[1](e.target.value);
            }}
          ></input>
        </div>
        <div>
          <input
            className="ininput"
            type="text"
            placeholder="Email*"
            value={usertextin.email}
            onChange={(e) => {
              setusertextin({ ...usertextin, email: e.target.value });
            }}
          ></input>
        </div>
        <div>
          <input
            type="text"
            className="ininput"
            placeholder="Password*"
            value={usertextin.password}
            onChange={(e) => {
              setusertextin({ ...usertextin, password: e.target.value });
            }}
          ></input>
        </div>
        <button className="inbutton">SignIn</button>
      </form>
    </div>
  );
}

export default Signin;
