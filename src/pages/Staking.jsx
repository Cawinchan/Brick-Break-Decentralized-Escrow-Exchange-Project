import { useState } from 'react'
import logo from '../escrow.png'
import '../App.css'
import WalletBalance from '../components/WalletBalance'
import Install from '../components/Install';
import { Routes, Route, Link } from 'react-router-dom';


function Staking() {
  var StakeAmt = 1;
  var StakeTotal = 10;

  return (
    <>
      <h1> Staking</h1>
      {StakeAmt} / {StakeTotal} Eth
      <div className="flexbox">
      <button className='BlueButton' style={{margin:"15px"}}>Stake</button>
      <button className='BlueButton' style={{margin:"15px"}}>Withdraw</button>
      </div>
    </>
  )
}

export default Staking