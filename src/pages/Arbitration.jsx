import { useState } from 'react'
import logo from '../escrow.png'
import '../App.css'
import WalletBalance from '../components/WalletBalance'
import Install from '../components/Install';
import { Routes, Route, Link } from 'react-router-dom';


function Arbitration() {
  var WithdrawalAmt = localStorage.getItem("WithdrawalAmt",WithdrawalAmt);
  var WithdrawalAddr = localStorage.getItem("WithdrawalAddr",WithdrawalAddr);
  var WithdrawalReason = localStorage.getItem("WithdrawalReason",WithdrawalReason);
  var RejectionReason = localStorage.getItem("RejectionReason",RejectionReason);

  return (
    <>
      <h1> Dispute Arbitration</h1>
      <img src={logo} className="App-logo Home-Button" alt="logo" />
      <Link to="/"><div style={{position:"absolute",top:"2%",left:"2%",width:"12%",height:"20%"}} /></Link>
      <div className="TopRightDiv">Buyer</div>
      <div className="BlueRoundDiv">The buyer and seller have disputed on the withdrawal of funds to the following address with the provided reasons.
Please attach a file containing additional information for the group of arbitrators to review, before they
decide to accept or reject the transaction.</div>
      <div className="flexbox">Withdrawal Amount <input readOnly className="GreyInputNarrow" value={WithdrawalAmt+" Eth"} /></div>
      <div className="flexbox">Withdrawal Address <input readOnly className="GreyInputNarrow" value={WithdrawalAddr} /></div>
      <div className="flexbox">Withdrawal Request <textarea readOnly className="GreyInputWide" value={WithdrawalReason} /></div>
      <p>The following reason has been provided for the rejection.</p>
      <div className="flexbox">Rejection Reason <textarea readOnly className="GreyInputWide" value={RejectionReason} /></div>
      <div className="flexbox">
      File URL <input className='GreyInputNarrow' style={{marginLeft:"30px"}} value="https://drive.google.com/file/d/1urMDocXEXh0X_39Xn1ysyLJa6TJwRio_/view?usp=sharing" />
      </div>
      <Link to="/Judging"><button className='BlueButton' style={{margin:"15px"}}>Confirm</button></Link>
    </>
  )
}

export default Arbitration