import React,{useContext} from 'react'
import { person } from "../App.js";
import Popup from "./Popup.js";
import Popupsignin from "./Popupsignin";
import Signout from "./Signout";
import './Homeheader.css'
const mygroupdirect = () => {
  window.location.replace("/mygroups");
};
const direct = () => {
  window.location.replace("/creategroup");
};
function Homeheader() {
    const usertoken = useContext(person);
  return (
    <div className="homeheader-margin">
      
        {usertoken !== undefined ? (
          <>
            {usertoken[0] ? (
              <div className="row-buttons">
                <button
                  className="homeheader-buttons"
                  onClick={() => mygroupdirect()}
                >
                  MyGroups
                </button>

                <button
                  className="homeheader-buttons"
                  onClick={() => {
                    direct();
                  }}
                >
                  CreateGroup
                </button>

                <Signout  />
              </div>
            ) : (
              <div className='signup-in-bottons'>
                <Popup  />
                <Popupsignin  />
              </div>
            )}
          </>
        ) : (
          <></>
        )}
    </div>
  );
}

export default Homeheader