const express = require("express");
const mongoose = require("mongoose");
const registeruser = require("./model.js");
const jwt = require("jsonwebtoken");
const port = 5000;
const app = express();
app.use(express.json());
const cors = require("cors");
const middleware = require("./middleware.js");
const groups = require("./groups.js");
const { db } = require("./groups.js");


//converting app into http request
const http = require('http');
const apphttp = http.createServer(app);
 //creating socket io server
const { Server } = require('socket.io');
const socketserver = new Server(apphttp);


mongoose
  .connect(
    "mongodb+srv://Navya:Navya@cluster0.f2flhy9.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("mongo db connected"));
// mongoose.set("strictQuery", true);

app.use(
  cors({
    origin: "*",
  })
);
app.get("/", (req, res) => {
  res.send("hi");
});
app.post("/register", async (req, res) => {
  try {
    const { username, email, password, confirm_password } = req.body;
    console.log("The data in register is : ", req.body);
    const exist = await registeruser.findOne({ email });
    console.log("exist in regsiter:", exist);
    if (exist) {
      res.status(403).send("user already registered");
    } else if (password != confirm_password) {
      res.status(400).send("passowrds not matched"); //status any 400 is fail,200 is success
    }
    //otherwise save the user details
    else {
      let newuser = new registeruser({
        username,
        email,
        password,
        confirm_password,
      });
      console.log("email:", email);
      newuser.save();

      res.status(200).json(newuser);
    }
  } catch (err) {
    console.log("error occurred:", err);
    res.status(500).send("server error");
  }
});

app.post("/login", async (req, res) => {
  // res.status(200).json(await registeruser.find());
  const {username, email, password } = req.body;
  console.log(req.body.email);
  const exist = await registeruser.findOne({ email });
  console.log("This data is from login : ", exist);
  if (!exist) {
    res.send("user not registered,first you have to register");
  } else if (exist?.password != password) {
    res.send("login invalid,passwords not matched");
  }
  let payload = {
    user: {
      username: username,
      email:email
    },
  };
  jwt.sign(payload, "jwtPassword", { expiresIn: 20 }, (err, token) => {
    if (err) throw err;
    return res.json({ token });
  });
});

app.get('/allusers',async (req, res) => {
  try {
    let data = await registeruser.find();
    res.send({alluserlist:data});
  } catch (error) {
    console.log("error in get all users:", err);
  }
})

/***creating group */
app.post('/formgroup', (req, res) => {
  let { groupname, groupadmin, messages, users } = req.body;
  console.log("formgroup in server:", req.body);
  let newgroup = new groups({
    groupname,groupadmin,messages,users
  })
  newgroup.save();
  res.send({group:newgroup})
})
/***dispaly mygroups of user****************************************************** */
app.post("/mygroups", async (req, res) => {
  try {
    let personname = jwt.decode(req.body.usertoken).user.username
    // console.log("This is Mygroups: ", typeof(jwt.decode(req.body.usertoken)));
    console.log("mygroups decode:", personname);
    let data = await registeruser.findOne({username:personname});
    console.log("hereeeee",data)
    res.send({ mygroupslist: data});
  } catch (err) {
    console.log("error in get my groups:", err);
  }
});

//pushing groupname into user**********************************************************************************************************/
app.post('/updateusers', async (req, res) => {
  let {gpname,personid} = req.body
  console.log("req from server of updateusers:",req.body);
  let person = await registeruser.findOne({username:personid});
  
  let prevgroup;
  if (person?.groupsin.length >= 1) {
    prevgroup = person?.groupsin;
    console.log("before group from updateusers:", prevgroup);
  }
  else{
    prevgroup = [];
  }
  prevgroup.push(gpname);
  await registeruser.updateOne({ username: personid }, {
    $set: {
      groupsin: prevgroup
    }
  })
  console.log("after group from updateusers:", person?.groupsin);
})



app.post('/groupinfo', async (req, res) => {
  let { goto } = req.body.body;
  console.log("Goto is :", goto);
  let ourgroup = await groups.findOne({ groupname:goto });
  console.log("SSSSSSSSSSSSSSSSSSSSSSS:", ourgroup);
  res.send({groupusers:ourgroup?.users})
})


app.post('/postmesg', async (req, res) => {
  let { mesg, groupname, personname,time } = req.body.body;
  console.log("reqqq.bodyyyyy:",req.body.body)
  console.log("mesgggggggggggggg:", mesg);
  console.log("groupnameeeeeeeeeeeee:", groupname);
  let grp=await groups.findOne({groupname})
  let prevmesges;
  if (grp?.messages?.length >= 1) {
    prevmesges = grp.messages;
    prevmesges.push({ mesg ,personname,time});
  }
  else {
    prevmesges = [];
    prevmesges.push({ mesg ,personname,time});
  }
  await groups.updateOne({ groupname: groupname }, {
    $set: {
      messages:prevmesges,
    }
  })
  console.log("newmessagesnnnnnnnnnnn:", prevmesges);
  res.send({
    newmessages: prevmesges
  })
})


//get mesges
app.post('/getmesges', async(req, res) => {
  let { groupname } = req.body;
  let group = await groups.findOne({ groupname: groupname });
  console.log("getallmesges:::::::", group?.messages);
  res.send({ messages: group?.messages });
})

//socket io connection
socketserver.on('connection', (clientsocket) => {
  console.log("client socket connected to apphttp:", clientsocket.id);
  clientsocket.on('join', ({ usertoken, group }) => {
    clientsocket.join(group)
    const user = jwt.decode(usertoken);
    console.log("User has joined : ", user.user.username);
    socketserver.to(group).emit("send_to_other_grp_users", { user:  user.user });
  })
  clientsocket.on("send_message", ({ message, group, username, time }) => {
    console.log("The messages are : ",message,group,username,time)
    socketserver.to(group).emit("send_message_to_other_users", {
      message: message,
      group: group,
      username: username,
      time: time,
    });
  });

})

apphttp.listen(port, () => {
  console.log("server is listening to port", port);
});

