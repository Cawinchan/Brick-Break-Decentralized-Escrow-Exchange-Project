import { useState } from 'react'
import logo from '../escrow.png'
import '../App.css'
import WalletBalance from '../components/WalletBalance'
import Install from '../components/Install';
import { Routes, Route, Link } from 'react-router-dom';
import React from "react";
import { ethers } from "ethers";


class TermsConfirm extends React.Component {
  async deployContract() {
    const buyerAddr = localStorage.getItem("buyerAddr");
    const sellerAddr = localStorage.getItem("sellerAddr");
    const EthAmt = localStorage.getItem("EthAmt");
    const contractTerms = JSON.parse(localStorage.getItem("terms"));
    const EscrowContract = await ethers.getContractFactory("EscrowContract");
    const contract = await EscrowContract.deploy(
      buyerAddr, //'0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // Buyer
      sellerAddr, //'0x70997970c51812dc3a010c7d01b50e0d17dc79c8', // Seller (Same as buyer address to trick the hardhat into thinking we are the seller)
      EthAmt, //'200000000000000000' // value in wei (1 eth = 1*10^18 wei)0
      contractTerms
    );
    console.log("Contract deployed between:",contract.buyerAddr," and ",contract.sellerAddr);
  }

  render() {
  var dealID="ABCDEFGDHIJKLMNK";
  var contractTerms = JSON.parse(localStorage.getItem("terms"));
  var contractList = contractTerms.map((contractTerm,index) =>
    <li>{contractTerm} </li>
  );

  return (
    <>
    <div className="GreyRoundDiv" style={{paddingTop:"0px",maxHeight:"70vh",overflowY:"scroll"}}>
      <h3>Contract Terms</h3>
      <ol style={{textAlign:"left"}}>{contractList}</ol>
    </div>
    <div style={{display:"flex",marginTop:"15px"}}>
    Value of Contract:
    <input className="GreyInput" id="EthAmt" type="numbers" step="0.01" style={{marginLeft:"150px",height:"30px",width:"100px",color:"black"}} value={localStorage.getItem("EthAmt")} readOnly /> Eth
    </div>
    <h3>Press review the contract.</h3>
    <button className="BlueButton" style={{position:"absolute",bottom:"5vh",left:"12vw",width:"34vw",height:"8vh"}} onClick={this.deployContract}>Accept Contract</button>
    <button className="BlueButton" style={{position:"absolute",bottom:"5vh",right:"12vw",width:"34vw",height:"8vh"}}>Decline Contract</button>
    </>
  )
  }
}

export default TermsConfirm