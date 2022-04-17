import { useState } from 'react'
import logo from '../escrow.png'
import '../App.css'
import WalletBalance from '../components/WalletBalance'
import Install from '../components/Install';
import { Routes, Route, Link } from 'react-router-dom';


function Create() {
  var dealID="ABCDEFGDHIJKLMNK";

  return (
    <>
    <div className="GreyRoundDiv">
      <p>
      You have now created a deal!
        <br /> <br />
        To proceed, send the code below to the other party and have them join the deal!
      </p>
      <Link to="/Join"><button className="BlueButton">{dealID.substring(0,4)}-{dealID.substring(4,8)}-{dealID.substring(8,12)}-{dealID.substring(12)}</button></Link>
    </div>
    </>
  )
}

export default Create