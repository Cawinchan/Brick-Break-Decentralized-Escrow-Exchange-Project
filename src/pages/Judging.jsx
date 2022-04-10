import { useState } from 'react'
import logo from '../escrow.png'
import '../App.css'
import WalletBalance from '../components/WalletBalance'
import Install from '../components/Install';
import { Routes, Route, Link } from 'react-router-dom';


function Judging() {

  return (
    <>
      <h1> Dispute Judging</h1>
      <div>The seller has made a request to withdraw the funds from the escrow account. However, the buyer has
rejected the withdrawal request. </div>
      Withdrawal Amount <p>3.0 Eth</p>
      Withdrawal Address <p>0xb794f5ea0ba39494ce839613fffba74279579268</p>
      Withdrawal Request <p>The buyer has been sent 50 units of the requested product as per agreed upon in the contract. I would like to withdraw the payment from the escrow account.</p>
      <p>If you are rejecting the withdrawal request, please provide a reason for rejection.</p>
      Rejection Request <p>The products sent by the seller has yet to arrive. I am unable to confirm that
the transaction has been completed.
Parcel Tracking Link: bit.ly/ParcelTracking12345678</p>
      <button>File From Buyer</button>
      <button>File From Seller</button>
      <button>Approve Transaction</button>
      <button>Decline Transaction</button>
    </>
  )
}

export default Judging