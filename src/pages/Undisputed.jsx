import { useState } from 'react'
import logo from '../escrow.png'
import '../App.css'
import WalletBalance from '../components/WalletBalance'
import Install from '../components/Install';
import { Routes, Route, Link } from 'react-router-dom';


function Undisputed() {
  var WithdrawalAmt = localStorage.getItem("WithdrawalAmt",WithdrawalAmt);
  var WithdrawalAddr = localStorage.getItem("WithdrawalAddr",WithdrawalAddr);
  var WithdrawalReason = localStorage.getItem("WithdrawalReason",WithdrawalReason);
  var RejectionReason = localStorage.getItem("RejectionReason",RejectionReason);

  var result = "Accepted";
  const accepted = "The following transaction has been accepted by the other party. Hence, the transaction has been approved and will proceed. The transaction information is below. The transaction ID for the transaction to the address is listed below.";
  var message = "";
  message = accepted;
  var transactionID = "0xc0b00b52d0e4ea19d81f51730adc79a1850ce4c08c38e630b0c66687";
  return (
    <>
      <img src={logo} className="App-logo Home-Button" alt="logo" />
      <Link to="/"><div style={{position:"absolute",top:"2%",left:"2%",width:"12%",height:"20%"}} /></Link>
      <h1> Withdrawal Accepted</h1>
      <div className="TopRightDiv">Buyer</div>
      <div className="BlueRoundDiv">{message}</div>
      <div className="flexbox">Withdrawal Amount <input readOnly className="GreyInputNarrow" value={WithdrawalAmt+" Eth"} /></div>
      <div className="flexbox">Withdrawal Address <input readOnly className="GreyInputNarrow" value={WithdrawalAddr} /></div>
      <div className="flexbox">Withdrawal Request <textarea readOnly className="GreyInputWide" value={WithdrawalReason} /></div>
      <br />
      <div className="flexbox">Transaction ID <input readOnly className="GreyInputNarrow" value={transactionID} /></div>
    </>
  )
}

export default Undisputed