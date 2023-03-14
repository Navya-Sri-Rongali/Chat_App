import React, { createContext, useContext, useEffect, useState } from "react";
import { person, personid } from "../App.js";
import axios from "axios";
import { Link } from 'react-router-dom'

function Signout() {
    const userid = useContext(personid);
    const user = useContext(person);
    const userdeletehandler = () => {
      localStorage.clear();
      user[1](null);
  };
  
  return (
    <div>
      <button onClick={userdeletehandler} className="popup-buttons">
        SignOut
      </button>
    </div>
  );
}

export default Signout;
