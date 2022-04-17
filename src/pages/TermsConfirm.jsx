import { useState } from 'react'
import logo from '../escrow.png'
import '../App.css'
import WalletBalance from '../components/WalletBalance'
import Install from '../components/Install';
import { Routes, Route, Link } from 'react-router-dom';
import React from "react";
import { ethers } from 'ethers';

class TermsConfirm extends React.Component {

  render() {
  var dealID="ABCDEFGDHIJKLMNK";
  var contractTerms = JSON.parse(localStorage.getItem("terms"));
  var contractList = contractTerms.map((contractTerm,index) =>
    <li>{contractTerm} </li>
  );

  return (
    <>
    <img src={logo} className="App-logo Home-Button" alt="logo" />
    <Link to="/"><div style={{position:"absolute",top:"2%",left:"2%",width:"12%",height:"20%"}} /></Link>
    <h1 style={{position:"absolute",top:"5%"}}>Terms Confirmation</h1>
    <div className="TopRightDiv">Seller</div>
    <div className="GreyRoundDiv" style={{paddingTop:"0px",maxHeight:"70vh",overflowY:"scroll"}}>
      <h3>Contract Terms</h3>
      <ol style={{textAlign:"left"}}>{contractList}</ol>
    </div>
    <div style={{display:"flex",marginTop:"15px"}}>
    Value of Contract:
    <input className="GreyInput" id="EthAmt" type="numbers" step="0.01" style={{marginLeft:"150px",height:"30px",width:"100px",color:"black"}} value={localStorage.getItem("EthAmt")} readOnly /> Eth
    </div>
    <h3>Press review the contract.</h3>
    <Link to="/Deposit"><button className="BlueButton" style={{position:"absolute",bottom:"5vh",left:"12vw",width:"34vw",height:"8vh"}}>Accept Contract</button></Link>
    <Link to="/"><button className="BlueButton" style={{position:"absolute",bottom:"5vh",right:"12vw",width:"34vw",height:"8vh"}}>Decline Contract</button></Link>
    </>
  )
  }
}

export default TermsConfirm