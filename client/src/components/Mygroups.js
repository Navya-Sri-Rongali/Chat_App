import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { person } from "../App";
import { Link } from "react-router-dom";

import "./Mygroups.css";

import { getRandomAvatar } from "@fractalsoftware/random-avatar-generator";
import { Avatar } from "@mui/material";

function Mygroups() {
  const usertoken = useContext(person);
  const [groups, setgroups] = useState([]);
  const gettingmygroups = async () => {
    const token = localStorage.getItem("Token");
    const res = await axios.post("http://localhost:5000/mygroups", {
      usertoken: token,
    });
    const grps = await res.data.mygroupslist?.groupsin;
    console.log("res.data in my groups:", res.data);
    return grps
  };
  useEffect(() => {
    gettingmygroups().then((grps) => {
      setgroups(grps);
    });
  }, []);

  /*********************************************************************************************************** */
  // const [info, setinfo] = useState([]);
  // Avatar
  var avatar = getRandomAvatar(4);
  return (
    <div className="mygroups">
      {groups?.map((arg) => {
        //arg is an group object
        avatar = getRandomAvatar(4)
        return (
          // <div className="grpholder">
          <a
            href={`/mygroups/${arg}`}
            className="mygroups_link"
          >
            <Avatar className="avatar" src={`data:image/svg+xml;base64,${btoa(avatar)}`} />
            {arg}
          </a>
          // </div>
        );
      })}
    </div>
  );
}

export default Mygroups;
