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
      <div>Buyer has disputed the request made by you.  You have made a request to transfer 5.0 Eth to address
0xb794f5ea0ba39494ce839613fffba74279579268. The buyer has rejected the request for the transfer.
<br /><br />
The request will now be forwarded to a group of independent arbitrators to resolve the dispute. Alternatively,
you can cancel the request.</div>
      <div>Note: Arbitration fees may apply.</div>
      Withdrawal Amount <p>3.0 Eth</p>
      Withdrawal Address <p>0xb794f5ea0ba39494ce839613fffba74279579268</p>
      Withdrawal Request <p>The buyer has been sent 50 units of the requested product as per agreed upon in the contract. I would like to withdraw the payment from the escrow account.</p>
      <p>If you are rejecting the withdrawal request, please provide a reason for rejection.</p>
      Rejection Request <p>The products sent by the seller has yet to arrive. I am unable to confirm that
the transaction has been completed.
Parcel Tracking Link: bit.ly/ParcelTracking12345678</p>
      <button>Cancel Request</button>
      <button>Dispute Arbitration</button>
    </>
  )
}

export default Notice