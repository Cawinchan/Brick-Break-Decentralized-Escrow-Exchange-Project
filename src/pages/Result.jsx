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
      <div className="BlueRoundDiv">{message}</div>
      <div className="flexbox">Withdrawal Amount <input readOnly className="GreyInputNarrow" value="3.0 Eth" /></div>
      <div className="flexbox">Withdrawal Address <input readOnly className="GreyInputNarrow" value="0xb794f5ea0ba39494ce839613fffba74279579268" /></div>
      <div className="flexbox">Withdrawal Request <textarea readOnly className="GreyInputWide" value="The buyer has been sent 50 units of the requested product as per agreed upon in the contract. I would like to withdraw the payment from the escrow account." /></div>
      <div className="flexbox">Rejection Reason <textarea readOnly className="GreyInputWide" value="The products sent by the seller has yet to arrive. I am unable to confirm that the transaction has been completed. Parcel Tracking Link: bit.ly/ParcelTracking12345678" /></div>
      <br />
      <div className="flexbox">Arbitration Fee <input readOnly className="GreyInputNarrow" value="0.03 Eth" /></div>
      <div className="flexbox">Transaction ID <input readOnly className="GreyInputNarrow" value={transactionID} /></div>
    </>
  )
}

export default Result