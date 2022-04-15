import { useState } from 'react'
import logo from '../escrow.png'
import '../App.css'
import WalletBalance from '../components/WalletBalance'
import Install from '../components/Install';
import { Routes, Route, Link } from 'react-router-dom';


function Notice() {

  return (
    <>
      <h1> Dispute Notice</h1>
      <div className="BlueRoundDiv">Buyer has disputed the request made by you.  You have made a request to transfer 5.0 Eth to address
0xb794f5ea0ba39494ce839613fffba74279579268. The buyer has rejected the request for the transfer.
<br /><br />
The request will now be forwarded to a group of independent arbitrators to resolve the dispute. Alternatively,
you can cancel the request.</div><br />
      <div className="RedRoundDiv">Note: Arbitration fees may apply.</div>
      <div className="flexbox">Withdrawal Amount <input readOnly className="GreyInputNarrow" value="3.0 Eth" /></div>
      <div className="flexbox">Withdrawal Address <input readOnly className="GreyInputNarrow" value="0xb794f5ea0ba39494ce839613fffba74279579268" /></div>
      <div className="flexbox">Withdrawal Request <textarea readOnly className="GreyInputWide" value="The buyer has been sent 50 units of the requested product as per agreed upon in the contract. I would like to withdraw the payment from the escrow account." /></div>
      <p>The following reason has been provided for the rejection.</p>
      <div className="flexbox">Rejection Reason <textarea className="GreyInputWide" value="The products sent by the seller has yet to arrive. I am unable to confirm that the transaction has been completed. Parcel Tracking Link: bit.ly/ParcelTracking12345678" /></div>
      <div className="flexbox">
      <button className='BlueButton' style={{margin:"15px"}}>Cancel Request</button>
      <button className='BlueButton' style={{margin:"15px"}}>Dispute Arbitration</button>
      </div>
    </>
  )
}

export default Notice