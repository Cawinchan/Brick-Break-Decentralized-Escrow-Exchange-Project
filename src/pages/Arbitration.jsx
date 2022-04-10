import { useState } from 'react'
import logo from '../escrow.png'
import '../App.css'
import WalletBalance from '../components/WalletBalance'
import Install from '../components/Install';
import { Routes, Route, Link } from 'react-router-dom';


function Arbitration() {

  return (
    <>
      <h1> Dispute Arbitration</h1>
      <div>The buyer and seller have disputed on the withdrawal of funds to the following address with the provided reasons.
Please attach a file containing additional information for the group of arbitrators to review, before they
decide to accept or reject the transaction.</div>
      Withdrawal Amount <p>3.0 Eth</p>
      Withdrawal Address <p>0xb794f5ea0ba39494ce839613fffba74279579268</p>
      Withdrawal Request <p>The buyer has been sent 50 units of the requested product as per agreed upon in the contract. I would like to withdraw the payment from the escrow account.</p>
      <p>If you are rejecting the withdrawal request, please provide a reason for rejection.</p>
      Rejection Request <p>The products sent by the seller has yet to arrive. I am unable to confirm that
the transaction has been completed.
Parcel Tracking Link: bit.ly/ParcelTracking12345678</p>
      Attach File (Placholder)
      <button>Browse File</button>
      <button>Confirm</button>
    </>
  )
}

export default Arbitration