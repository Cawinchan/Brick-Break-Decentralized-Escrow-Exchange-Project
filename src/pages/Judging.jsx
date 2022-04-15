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
      <div className="BlueRoundDiv">The seller has made a request to withdraw the funds from the escrow account. However, the buyer has
rejected the withdrawal request. </div>
<div className="flexbox">Withdrawal Amount <input readOnly className="GreyInputNarrow" value="3.0 Eth" /></div>
      <div className="flexbox">Withdrawal Address <input readOnly className="GreyInputNarrow" value="0xb794f5ea0ba39494ce839613fffba74279579268" /></div>
      <div className="flexbox">Withdrawal Request <textarea readOnly className="GreyInputWide" value="The buyer has been sent 50 units of the requested product as per agreed upon in the contract. I would like to withdraw the payment from the escrow account." /></div>
      <div className="flexbox">Rejection Reason <textarea readOnly className="GreyInputWide" value="The products sent by the seller has yet to arrive. I am unable to confirm that the transaction has been completed. Parcel Tracking Link: bit.ly/ParcelTracking12345678" /></div>
      <button>File From Buyer</button>
      <button>File From Seller</button>
      <button className='BlueButton' style={{margin:"15px"}}>Approve Transaction</button>
    </>
  )
}

export default Judging