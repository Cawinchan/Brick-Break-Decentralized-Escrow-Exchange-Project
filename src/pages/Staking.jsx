import { useState } from 'react'
import logo from '../escrow.png'
import '../App.css'
import WalletBalance from '../components/WalletBalance'
import Install from '../components/Install';
import { Routes, Route, Link } from 'react-router-dom';
import { ethers } from 'ethers';


function Staking() {
  var StakeAmt = 1;
  var StakeTotal = 10;
  var address="0x6b87509a2d41f2194f694535852Ea094c24080C3"

  async function stake() {
    const Staker = await ethers.Contract(address);
    const staker = await Staker.attach(address);
    staker.stake();
    console.log("Staked");
  }

  async function withdraw() {
    const Staker = await ethers.Contract(address);
    const staker = await Staker.attach(address);
    staker.withdraw();
    console.log("Withdrawed");
  }

  return (
    <>
      <h1> Staking</h1>
      {StakeAmt} / {StakeTotal} Eth
      <div className="flexbox">
      <button className='BlueButton' style={{margin:"15px"}} onClick={stake}>Stake</button>
      <button className='BlueButton' style={{margin:"15px"}} onClick={withdraw}>Withdraw</button>
      </div>
    </>
  )
}

export default Staking