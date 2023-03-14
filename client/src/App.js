import './App.css';
import Register from "./components/Register";
import Signin from "./components/Signin";
import Signout from "./components/Signout";
import Home from "./components/Home";
import Mygroups from "./components/Mygroups";
import { Link } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext, useEffect, useState } from 'react';
import  Selectuser  from './components/Selectuser';
import Check from './components/Check';
import Eachgroup from './components/Eachgroup';

import Homeheader from './components/Homeheader';
export const person = createContext();
export const personid = createContext();
export const personuser = createContext();
function App() {
  const [usertoken, setusertoken] = useState(null);
  const [userid, setuserid] = useState(null);
  const [loginuser, setloginuser] = useState("");
  useEffect( () => {
    const user =  localStorage.getItem("Token");
    setusertoken(user);
  },[usertoken])
  return (
    <person.Provider value={[usertoken, setusertoken]}>
      <personid.Provider value={[userid, setuserid]}>
        <personuser.Provider value={[loginuser,setloginuser]}>
          <div className="App">
            <Homeheader />
            <Routes>
              <Route path="/" exact element={<Home />}></Route>
              <Route path="/register" exact element={<Register />}></Route>
              <Route path="/signin" exact element={<Signin />}></Route>
              <Route path="/creategroup" exact element={<Selectuser />}></Route>
              <Route path="/check" exact element={<Check />}></Route>
              <Route path="/mygroups" exact element={<Mygroups />}></Route>
              <Route
                path="/mygroups/:text"
                element={<Eachgroup />}
              ></Route>
            </Routes>
          </div>
        </personuser.Provider>
      </personid.Provider>
    </person.Provider>
  );
}

export default App;
