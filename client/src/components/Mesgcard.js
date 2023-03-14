import React from 'react'
import './Mesgcard.css'
function Mesgcard({ sendername, mesg ,now}) {
  return (
    <div className='mesgcard'> 
          <div className='sendername'>{sendername}</div>
          <div className='mesg'>{mesg}</div>
          <div className='time'>{ now}</div>
    </div>
  );
}

export default Mesgcard