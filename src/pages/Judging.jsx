import { useState } from 'react'
import logo from '../escrow.png'
import '../App.css'
import WalletBalance from '../components/WalletBalance'
import Install from '../components/Install';
import { Routes, Route, Link } from 'react-router-dom';


function Judging() {
  var WithdrawalAmt = localStorage.getItem("WithdrawalAmt",WithdrawalAmt);
  var WithdrawalAddr = localStorage.getItem("WithdrawalAddr",WithdrawalAddr);
  var WithdrawalReason = localStorage.getItem("WithdrawalReason",WithdrawalReason);
  var RejectionReason = localStorage.getItem("RejectionReason",RejectionReason);

  return (
    <>
      <h1> Dispute Judging</h1>
      <img src={logo} className="App-logo Home-Button" alt="logo" />
      <Link to="/"><div style={{position:"absolute",top:"2%",left:"2%",width:"12%",height:"20%"}} /></Link>
      <div className="TopRightDiv">Arbitrators</div>
      <div className="BlueRoundDiv">The seller has made a request to withdraw the funds from the escrow account. However, the buyer has
rejected the withdrawal request. </div>
<div className="flexbox">Withdrawal Amount <input readOnly className="GreyInputNarrow" value={WithdrawalAmt+" Eth"} /></div>
      <div className="flexbox">Withdrawal Address <input readOnly className="GreyInputNarrow" value={WithdrawalAddr} /></div>
      <div className="flexbox">Withdrawal Request <textarea readOnly className="GreyInputWide" value={WithdrawalReason} /></div>
      <div className="flexbox">Rejection Reason <textarea readOnly className="GreyInputWide" value={RejectionReason} /></div>
      <button onClick={(e) => {
      e.preventDefault();
      window.location.href='https://drive.google.com/file/d/1urMDocXEXh0X_39Xn1ysyLJa6TJwRio_/view?usp=sharing';
      }}>File From Buyer</button>
      <button onClick={(e) => {
      e.preventDefault();
      window.location.href='https://drive.google.com/file/d/11x5R1CyLUS06YAoSusAj6u1GBPb87OQT/view?usp=sharing';
      }}>File From Seller</button>
      <Link to="/Result"><button className='BlueButton' style={{margin:"15px"}}>Approve Dispute</button></Link>
    </>
  )
}

export default Judging