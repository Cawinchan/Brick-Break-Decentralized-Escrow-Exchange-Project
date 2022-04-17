import { useState } from 'react'
import logo from '../escrow.png'
import '../App.css'
import WalletBalance from '../components/WalletBalance'
import Install from '../components/Install';
import { Routes, Route, Link } from 'react-router-dom';
//const Web3 = require('web3')


function Start() {
  return (
    <>
    <img src={logo} className="App-logo Home-Button" alt="logo" />
    <Link to="/"><div style={{position:"absolute",top:"2%",left:"2%",width:"12%",height:"20%"}} /></Link>
    <div className="GreyRoundDiv" style={{position: "absolute",width: "40vw",height: "80vh", left: "7vw", top: "85px"}}>
      <p>
        Start an Escrow Request
        <br /> <br />
        You can define your contract here and rely on independent arbitrators should a dispute occur.
      </p>
      <Link to="/Create"><button className="BlueButton" style={{marginTop: "60px"}}>Start Escrow Request</button></Link>
    </div>
    <div className="GreyRoundDiv" style={{position: "absolute",width: "40vw",height: "80vh", right: "7vw", top: "85px"}}>
      <p>
        Did the other party already create a Request?
        <br /> <br />
        Join their deal now to ensure a fuss free,secure and fair deal.
      </p>
      <Link to="/Create"><button className="BlueButton" style={{marginTop: "60px"}}>Join an Escrow</button></Link>
    </div>
    </>
  )
}

export default Start