import { useState } from 'react'
import logo from '../escrow.png'
import '../App.css'
import WalletBalance from '../components/WalletBalance'
import Install from '../components/Install';
import { Routes, Route, Link } from 'react-router-dom';
import React from "react";


class Terms extends React.Component {
  constructor(props) {
    super(props);
    this.state={contractList:[
      "The seller will receive the agreed upon quantity of goods before 3rd April 2023.",
      "The goods must be in satisfactory condition upon delivery."
    ]};
  }
  
  save() {
    var contractList = [...this.state.contractList];
    contractList.push(this.newText.value);
    this.setState({contractList});
  }

  pop() {
    var contractList = [...this.state.contractList];
    contractList.pop(this.newText.value);
    this.setState({contractList});  
  }

  render() {



  var dealID="ABCDEFGDHIJKLMNK";
  var contractTerms = this.state.contractList;
  var contractList = contractTerms.map((contractTerm,index) =>
    <li>{contractTerm} </li>
  );

  function submit() {
    
    var EthAmt = document.getElementById("EthAmt").value;
    if (isNaN(parseFloat(EthAmt))) {
      alert("Ethereum Amount is not a number!")
    } else if (parseFloat(EthAmt)<=0) {
      alert("Ethereum Amount cannot be less than 0!")
    }
    else {
      localStorage.setItem("terms",JSON.stringify(contractTerms));
      localStorage.setItem("EthAmt",EthAmt);
      console.log("Eth Amount set")
    }
  }

  return (
    <>
    <div className="TopRightDiv">Buyer</div>
    <div className="GreyRoundDiv" style={{paddingTop:"0px",maxHeight:"45vh",overflowY:"scroll"}}>
      <h3>Contract Terms</h3>
      <ol style={{textAlign:"left"}}>{contractList}</ol>
    </div>
    <h3>Press the add clause button after writing the clause to be added.</h3>
    <textarea className="GreyInput" type="text" ref={(ip) => {this.newText = ip}}/>
    <div style={{display:"flex",marginTop:"15px"}}>
    Value of Contract:
    <input className="GreyInput" id="EthAmt" type="numbers" step="0.01" style={{marginLeft:"150px",height:"30px",width:"100px"}} /> Eth
    <button className="BlueButton" style={{position:"absolute",bottom:"5vh",left:"8vw",width:"27vw",height:"8vh"}} onClick={this.save.bind(this)}>Add Clause</button>
    </div>
    <button className="BlueButton" style={{position:"absolute",bottom:"5vh",width:"27vw",height:"8vh"}}onClick={this.pop.bind(this)}>Delete Last</button>
    <Link to="/TermsConfirm"><button className="BlueButton" style={{position:"absolute",bottom:"5vh",right:"8vw",width:"27vw",height:"8vh"}} onClick={submit}>Confirm Contract</button></Link>
    </>
  )
  }
}

export default Terms