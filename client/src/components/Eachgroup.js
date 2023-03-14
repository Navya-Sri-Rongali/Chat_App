import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Mygroups from "./Mygroups";
import "./Eachgroup.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import * as React from "react";
import axios from "axios";
import date from "date-and-time";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { getRandomAvatar } from "@fractalsoftware/random-avatar-generator";
//******* */
import Mesgcard from './Mesgcard.js'
import io from "socket.io-client";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import jwtDecode from "jwt-decode";
import { person } from '../App.js'
import { personuser } from "../App.js";
import { Avatar } from "@mui/material";

function Eachgroup() {
  const usertoken = useContext(person);
  console.log("usertoken :", usertoken[0]);
  const [clientsocket, setsocket] = useState(null);
  const { text } = useParams();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const SocketConnection = async () => {
    const temp_clientsocket = await io.connect("http://localhost:5000", {
      transports: ["websocket"],
    });
    return temp_clientsocket
  }
  useEffect(() => {
    axios
      .post("http://localhost:5000/groupinfo", {
        body: {
          goto: text,
        },
      })
      .then((res) => {
        console.log("ALL THE USRSIN THE GROUP:", res.data.groupusers);
        setinfo(res.data.groupusers);
        console.log("info array:", info);
      });
    
    SocketConnection().then((socket) => {
      setsocket(socket);
       const token = localStorage.getItem("Token");
       socket.emit("join", { usertoken: token, group: text });
       socket.on("send_to_other_grp_users", ({ user }) => {
         console.log("user has joined : ", user.username);
       });
       console.log("The socket is : ", clientsocket);
     })
  }, []);
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Participants"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      
        {info?.map((user) => {
          return <div className="divider">{user.username}</div>;
        })}
      
    </Box>
  );

  const [msg, setmsg] = useState("");
  /********* */
  /*************my own function of persons */
  const [info, setinfo] = useState(null);
  const [allmsgs,setallmsgs] = useState([]);
  const messagehandler = (e, arg) => {
        var now = new Date();
        const pattern = date.compile("ddd,MMM DD, HH:mm A");
        now = date.format(now, pattern);
    e.preventDefault();
    console.log("argggggggggg:", arg);
    const username = jwtDecode(localStorage.getItem('Token')).user.username
    console.log("The user name is : ", username)
    clientsocket?.emit("send_message", { message: arg, group: text, username: username, time: now });
    clientsocket?.on("send_message_to_other_users", ({
      message,
      group,
      username,
      time,
    }) => {
      console.log("The message is : ", message, username, group);
      var prev = allmsgs;
      prev.push({
        mesg: message,
        personname: username,
        time:time
      })
      setallmsgs(prev)
    });
    axios
      .post("http://localhost:5000/postmesg", {
        body: {
          mesg: arg,
          groupname: text,
          personname: username,
          time:now
        },
      })
      .then((res) => {
        setallmsgs(res.data.newmessages)
        console.log("recieverd messages:", res.data.newmessages);
      });
  };
  useEffect(() => {
    console.log("hiiiiiiiiiiiiiiiii")
    axios
      .post("http://localhost:5000/getmesges", {
        groupname: text,
      })
      .then((res) => {
        console.log("The messages are in useefffect: ", res.data.messages);
        setallmsgs(res.data.messages);
      });
  }, [])
  return (
    <div className="eachgroup">
      <div className="first-half">
        <Mygroups />
      </div>
      <div className="second-half">
        <div className="inside-header">
          <div className="inside-header-text">
            {text}
          </div>
          <div className="info-icon">
            {["right"].map((anchor) => (
              <React.Fragment key={anchor}>
                <PeopleAltIcon onClick={toggleDrawer(anchor, true)}>
                  {anchor}
                </PeopleAltIcon>
                <Drawer
                  anchor="right"
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                >
                  {list(anchor)}
                </Drawer>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="msg_container">
          {allmsgs?.map((arg) => {
            return <Mesgcard mesg={arg.mesg} sendername={arg.personname} now={arg.time} />;
          })}
        </div>
        <div className="sending">
          {/* {allmsgs.map((arg) => {
            return <Mesgcard   mesg={arg.mesg} sendername={arg.personname}  />;
          })} */}
          <form
            onSubmit={(e) => {
              messagehandler(e, msg);
            }}
          >
            <input
              value={msg}
              onChange={(e) => {
                setmsg(e.target.value);
              }}
              type="text"
              placeholder="Send a message"
              className="textinput"
            ></input>
            <ArrowForwardIosIcon className="send" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Eachgroup;
