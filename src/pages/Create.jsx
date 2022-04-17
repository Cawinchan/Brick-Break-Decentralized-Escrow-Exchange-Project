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
    <div className="TopRightDiv">Buyer</div>
    <img src={logo} className="App-logo Home-Button" alt="logo" />
    <Link to="/"><div style={{position:"absolute",top:"2%",left:"2%",width:"12%",height:"20%"}} /></Link>
    <div className="GreyRoundDiv">
      <p>
      You have now created a deal!
        <br /> <br />
        To proceed, send the code below to the other party and have them join the deal!
      </p>
      <Link to="/Join"><button className="BlueButton" onClick={() =>  navigator.clipboard.writeText(dealID)}>{dealID.substring(0,4)}-{dealID.substring(4,8)}-{dealID.substring(8,12)}-{dealID.substring(12)}</button></Link>
    </div>
    </>
  )
}

export default Create