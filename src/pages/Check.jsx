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
      <div className="BlueRoundDiv">The seller has made a request to withdraw the money from the escrow account. You may choose to accept
      or decline this request. In the event that you accept, the withdrawal transaction will proceed. In the event that
      you decline, the seller can choose to cancel the withdrawal request or to move the request to a group of 
      arbitrators to decide if the withdrawal request should be accepted or declined. 
      </div><br />
      <div className="RedRoundDiv"> Note that in the event of arbitration, a small fee may apply.</div>
      <div className="flexbox">Withdrawal Amount <input readOnly className="GreyInputNarrow" value="3.0 Eth" /></div>
      <div className="flexbox">Withdrawal Address <input readOnly className="GreyInputNarrow" value="0xb794f5ea0ba39494ce839613fffba74279579268" /></div>
      <div className="flexbox">Withdrawal Request <textarea readOnly className="GreyInputWide" value="The buyer has been sent 50 units of the requested product as per agreed upon in the contract. I would like to withdraw the payment from the escrow account." /></div>
      <p>If you are rejecting the withdrawal request, please provide a reason for rejection.</p>
      <div className="flexbox">Rejection Reason <textarea className="GreyInputWide" /></div>
      <div className="flexbox">
      <button className='BlueButton' style={{margin:"15px"}}>Accept</button>
      <button className='BlueButton' style={{margin:"15px"}}>Reject</button>
      </div>
    </>
  )
}

export default Check