import { useState } from 'react'
import logo from '../escrow.png'
import '../App.css'
import WalletBalance from '../components/WalletBalance'
import Install from '../components/Install';
import { Routes, Route, Link } from 'react-router-dom';


function Terms() {
  var dealID="ABCDEFGDHIJKLMNK";
  var contractTerms = [
    "The seller will receive the agreed upon quantity of goods before 3rd April 2023.",
    "The goods must be in satisfactory condition upon delivery."
  ]
  var contractList = contractTerms.map((contractTerm,index) =>
    <li>{contractTerm} <button>delete</button></li>
  );
  return (
    <>
    <div>
      <h3>Contract Terms</h3>
      <ol>{contractList}</ol>
    </div>
    <h3>Press the add clause button after writing the clause to be added.</h3>
    <input></input>
    <button className="BlueButton">Add Clause</button>
    <button className="BlueButton">Confirm Contract</button>
    </>
  )
}

export default Terms