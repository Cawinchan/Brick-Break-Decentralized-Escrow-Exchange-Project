import { useState } from 'react'
import logo from '../escrow.png'
import '../App.css'
import WalletBalance from '../components/WalletBalance'
import Install from '../components/Install';
import { Routes, Route, Link } from 'react-router-dom';


function Result() {
  var WithdrawalAmt = localStorage.getItem("WithdrawalAmt",WithdrawalAmt);
  var WithdrawalAddr = localStorage.getItem("WithdrawalAddr",WithdrawalAddr);
  var WithdrawalReason = localStorage.getItem("WithdrawalReason",WithdrawalReason);
  var RejectionReason = localStorage.getItem("RejectionReason",RejectionReason);

  var result = "Resolved";
  const accepted = "The following dispute has been approved by the group of arbitrators. Hence, the transaction has been approved and will proceed. The transaction information is below. The transaction ID for the transaction to the address is listed below.";
  const rejected = "The following dispute has been rejected by the group of arbitrators. Hence, the transaction has been rejected and will not proceed. The transaction fee has been deducted. The transaction ID for the returning of funds to the escrow account has been recorded.";
  var message = "";
  if (result == "Resolved") {
    message = accepted;
  } else {
    message = rejected;
  }
  var transactionID = "0xc0b00b52d0e4ea19d81f51730adc79a1850ce4c08c38e630b0c66687";
  return (
    <>
      <h1> Dispute {result}</h1>
      <img src={logo} className="App-logo Home-Button" alt="logo" />
      <Link to="/"><div style={{position:"absolute",top:"2%",left:"2%",width:"12%",height:"20%"}} /></Link>
      <div className="TopRightDiv">Buyer</div>
      <div className="BlueRoundDiv">{message}</div>
      <div className="flexbox">Withdrawal Amount <input readOnly className="GreyInputNarrow" value={WithdrawalAmt+" Eth"} /></div>
      <div className="flexbox">Withdrawal Address <input readOnly className="GreyInputNarrow" value={WithdrawalAddr} /></div>
      <div className="flexbox">Withdrawal Request <textarea readOnly className="GreyInputWide" value={WithdrawalReason} /></div>
      <div className="flexbox">Rejection Reason <textarea readOnly className="GreyInputWide" value={RejectionReason} /></div>
      <br />
      <div className="flexbox">Arbitration Fee <input readOnly className="GreyInputNarrow" value="0.03 Eth" /></div>
      <div className="flexbox">Transaction ID <input readOnly className="GreyInputNarrow" value={transactionID} /></div>
    </>
  )
}

export default Result