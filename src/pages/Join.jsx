import { useState } from 'react'
import logo from '../escrow.png'
import '../App.css'
import WalletBalance from '../components/WalletBalance'
import Install from '../components/Install';
import { Routes, Route, Link } from 'react-router-dom';


function Join() {
  var dealID="ABCDEFGDHIJKLMNK";

  return (
    <>
    <div className="GreyRoundDiv">
      <p>
        To join an Escrow , ask the other party for their 16 digit code!
        <br /> <br />
        Input the code to proceed
      </p>
      <input></input>
      <br /><br />
      <button className="BlueButton">Join Escrow</button>
    </div>
    </>
  )
}

export default Join