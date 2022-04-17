import { useState } from 'react'
import logo from '../escrow.png'
import '../App.css'
import WalletBalance from '../components/WalletBalance'
import Install from '../components/Install';
import { Routes, Route, Link } from 'react-router-dom';


function Notice() {
  var WithdrawalAmt = localStorage.getItem("WithdrawalAmt",WithdrawalAmt);
  var WithdrawalAddr = localStorage.getItem("WithdrawalAddr",WithdrawalAddr);
  var WithdrawalReason = localStorage.getItem("WithdrawalReason",WithdrawalReason);
  var RejectionReason = localStorage.getItem("RejectionReason",RejectionReason);

  return (
    <>
      <div className="TopRightDiv">Buyer</div>
      <h1> Dispute Notice</h1>
      <div className="BlueRoundDiv">Buyer has disputed the request made by you.  You have made a request to transfer 5.0 Eth to address
0xb794f5ea0ba39494ce839613fffba74279579268. The buyer has rejected the request for the transfer.
<br /><br />
The request will now be forwarded to a group of independent arbitrators to resolve the dispute. Alternatively,
you can cancel the request.</div><br />
      <div className="RedRoundDiv">Note: Arbitration fees may apply.</div>
      <div className="flexbox">Withdrawal Amount <input readOnly className="GreyInputNarrow" value={WithdrawalAmt+" Eth"} /></div>
      <div className="flexbox">Withdrawal Address <input readOnly className="GreyInputNarrow" value={WithdrawalAddr} /></div>
      <div className="flexbox">Withdrawal Request <textarea readOnly className="GreyInputWide" value={WithdrawalReason} /></div>
      <p>The following reason has been provided for the rejection.</p>
      <div className="flexbox">Rejection Reason <textarea className="GreyInputWide" value={RejectionReason} /></div>
      <div className="flexbox">
      <Link to="/Start"><button className='BlueButton' style={{margin:"15px"}}>Cancel Request</button></Link>
      <Link to="/Arbitration"><button className='BlueButton' style={{margin:"15px"}}>Dispute Arbitration</button></Link>
      </div>
    </>
  )
}

export default Notice