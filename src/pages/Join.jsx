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
    <div className="TopRightDiv">Seller</div>
    <img src={logo} className="App-logo Home-Button" alt="logo" />
    <Link to="/"><div style={{position:"absolute",top:"2%",left:"2%",width:"12%",height:"20%"}} /></Link>
    <div className="GreyRoundDiv">
      <p>
        To join an Escrow , ask the other party for their 16 digit code!
        <br /> <br />
        Input the code to proceed
      </p>
      <input></input>
      <br /><br />
      <Link to="/RoleSel"><button className="BlueButton">Join Escrow</button></Link>
    </div>
    </>
  )
}

export default Join