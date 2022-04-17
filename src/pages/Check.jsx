import { useState } from 'react'
import logo from '../escrow.png'
import '../App.css'
import WalletBalance from '../components/WalletBalance'
import Install from '../components/Install';
import { Routes, Route, Link } from 'react-router-dom';

function Check() {
  var WithdrawalAmt = localStorage.getItem("WithdrawalAmt",WithdrawalAmt);
  var WithdrawalAddr = localStorage.getItem("WithdrawalAddr",WithdrawalAddr);
  var WithdrawalReason = localStorage.getItem("WithdrawalReason",WithdrawalReason);

  function Reject() {
    var RejectionReason = document.getElementById("RejectionReason").value;
    localStorage.setItem("RejectionReason",RejectionReason);
    console.log("Rejection Submitted")
  }

  return (
    <>
      <h1> Withdrawal Check</h1>
      <img src={logo} className="App-logo Home-Button" alt="logo" />
      <Link to="/"><div style={{position:"absolute",top:"2%",left:"2%",width:"12%",height:"20%"}} /></Link>
      <div className="TopRightDiv">Buyer</div>
      <div className="BlueRoundDiv">The seller has made a request to withdraw the money from the escrow account. You may choose to accept
      or decline this request. In the event that you accept, the withdrawal transaction will proceed. In the event that
      you decline, the seller can choose to cancel the withdrawal request or to move the request to a group of 
      arbitrators to decide if the withdrawal request should be accepted or declined. 
      </div><br />
      <div className="RedRoundDiv"> Note that in the event of arbitration, a small fee may apply.</div>
      <div className="flexbox">Withdrawal Amount <input readOnly className="GreyInputNarrow" value={WithdrawalAmt+" Eth"} /></div>
      <div className="flexbox">Withdrawal Address <input readOnly className="GreyInputNarrow" value={WithdrawalAddr} /></div>
      <div className="flexbox">Withdrawal Request <textarea readOnly className="GreyInputWide" value={WithdrawalReason} /></div>
      <p>If you are rejecting the withdrawal request, please provide a reason for rejection.</p>
      <div className="flexbox">Rejection Reason <textarea className="GreyInputWide" id="RejectionReason" /></div>
      <div className="flexbox">
      <Link to="/Undisputed"><button className='BlueButton' style={{margin:"15px"}}>Accept</button></Link>
      <Link to="/Notice"><button className='BlueButton' style={{margin:"15px"}} onClick={Reject}>Reject</button></Link>
      </div>
    </>
  )
}

export default Check