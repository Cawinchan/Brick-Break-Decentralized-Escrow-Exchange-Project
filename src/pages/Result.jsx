import { useState } from 'react'
import logo from '../escrow.png'
import '../App.css'
import WalletBalance from '../components/WalletBalance'
import Install from '../components/Install';
import { Routes, Route, Link } from 'react-router-dom';


function Result() {
  var result = "Accepted";
  const accepted = "The following transaction has been accepted by the group of arbitrators. Hence, the transaction has been approved and will proceed. The transaction information is below. The transaction ID for the transaction to the address is listed below.";
  const rejected = "The following transaction has been rejected by the group of arbitrators. Hence, the transaction has been rejected and will not proceed. The transaction fee has been deducted. The transaction ID for the returning of funds to the escrow account has been recorded.";
  var message = "";
  if (result == "Accepted") {
    message = accepted;
  } else {
    message = rejected;
  }
  var transactionID = "0xc0b00b52d0e4ea19d81f51730adc79a1850ce4c08c38e630b0c66687";
  return (
    <>
      <h1> Dispute {result}</h1>
      <div>{message}</div>
      Withdrawal Amount <p>3.0 Eth</p>
      Withdrawal Address <p>0xb794f5ea0ba39494ce839613fffba74279579268</p>
      Withdrawal Request <p>The buyer has been sent 50 units of the requested product as per agreed upon in the contract. I would like to withdraw the payment from the escrow account.</p>
      <p>If you are rejecting the withdrawal request, please provide a reason for rejection.</p>
      Rejection Request <p>The products sent by the seller has yet to arrive. I am unable to confirm that
the transaction has been completed.
Parcel Tracking Link: bit.ly/ParcelTracking12345678</p>
      Transaction ID
      <p>{transactionID}</p>
    </>
  )
}

export default Result