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

  return (
    <>
    <div className="GreyRoundDiv" style={{paddingTop:"0px",maxHeight:"45vh",overflowY:"scroll"}}>
      <h3>Contract Terms</h3>
      <ol style={{textAlign:"left"}}>{contractList}</ol>
    </div>
    <h3>Press the add clause button after writing the clause to be added.</h3>
    <textarea className="GreyInput" type="text" ref={(ip) => {this.newText = ip}}/>
    <button className="BlueButton" style={{position:"absolute",bottom:"5vh",left:"8vw",width:"27vw",height:"8vh"}} onClick={this.save.bind(this)}>Add Clause</button>
    <button className="BlueButton" style={{position:"absolute",bottom:"5vh",width:"27vw",height:"8vh"}}onClick={this.pop.bind(this)}>Delete Last</button>
    <button className="BlueButton" style={{position:"absolute",bottom:"5vh",right:"8vw",width:"27vw",height:"8vh"}} onClick={localStorage.setItem("terms",JSON.stringify(contractTerms))}>Confirm Contract</button>
    </>
  )
  }
}

export default Terms