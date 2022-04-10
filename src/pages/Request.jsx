import { useState } from 'react'
import logo from '../escrow.png'
import '../App.css'
import WalletBalance from '../components/WalletBalance'
import Install from '../components/Install';
import { Routes, Route, Link } from 'react-router-dom';


function Request() {

  return (
    <>
      <h1> Request Withdrawal</h1>
      <div>Upon withdrawal application confirmation, the other party will be asked for consent to withdraw the money. In the event that the other party refuses consent, the money in the escrow wallet will be transferred to a different wallet where the transaction will be decided by a group of independent arbitrators.</div>
      Withdrawal Amount <input></input>
      Withdrawal Address <input></input>
      Withdrawal Request <input></input>
      <button>Confirm Request</button>
    </>
  )
}

export default Request