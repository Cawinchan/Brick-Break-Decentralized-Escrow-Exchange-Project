import { useState } from 'react'
import logo from '../escrow.png'
import '../App.css'
import WalletBalance from '../components/WalletBalance'
import Install from '../components/Install';
import { Routes, Route, Link } from 'react-router-dom';


function Check() {

  return (
    <>
      <h1> Withdrawal Check</h1>
      <div>The seller has made a request to withdraw the money from the escrow account. You may choose to accept
      or decline this request. In the event that you accept, the withdrawal transaction will proceed. In the event that
      you decline, the seller can choose to cancel the withdrawal request or to move the request to a group of 
      arbitrators to decide if the withdrawal request should be accepted or declined. Note that in the event of 
      arbitration, a small fee may apply.</div>
      Withdrawal Amount <p>3.0 Eth</p>
      Withdrawal Address <p>0xb794f5ea0ba39494ce839613fffba74279579268</p>
      Withdrawal Request <p>The buyer has been sent 50 units of the requested product as per agreed upon in the contract. I would like to withdraw the payment from the escrow account.</p>
      <p>If you are rejecting the withdrawal request, please provide a reason for rejection.</p>
      Rejection Request <input></input>
      <button>Accept</button>
      <button>Reject</button>
    </>
  )
}

export default Check