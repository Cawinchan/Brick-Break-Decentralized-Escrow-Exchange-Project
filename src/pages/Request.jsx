import { useState } from 'react'
import logo from '../escrow.png'
import '../App.css'
import WalletBalance from '../components/WalletBalance'
import Install from '../components/Install';
import { Routes, Route, Link } from 'react-router-dom';


function Request() {

  function SubmitRequest() {
    var WithdrawalAmt = document.getElementById("WithdrawalAmt").value;
    if (Number.isInteger(WithdrawalAddr)) {
      alert("Withdraw Amount is not a number!")
    } else if ((WithdrawalAmt)<0) {
      alert("Withdraw Amount cannot be less than 0!")
    }
    else {
      localStorage.setItem("WithdrawalAmt",WithdrawalAmt);
      var WithdrawalAddr = document.getElementById("WithdrawalAddr").value;
      localStorage.setItem("WithdrawalAddr",WithdrawalAddr);
      var WithdrawalReason = document.getElementById("WithdrawalReason").value;
      localStorage.setItem("WithdrawalReason",WithdrawalReason);
      console.log("Save Withdrawal Request");
    }
  }

  return (
    <>
      <h1> Request Withdrawal</h1>
      <img src={logo} className="App-logo Home-Button" alt="logo" />
      <Link to="/"><div style={{position:"absolute",top:"2%",left:"2%",width:"12%",height:"20%"}} /></Link>
      <div className="TopRightDiv">Seller</div>
      <div className="BlueRoundDiv">Upon withdrawal application confirmation, the other party will be asked for consent to withdraw the money. In the event that the other party refuses consent, the money in the escrow wallet will be transferred to a different wallet where the transaction will be decided by a group of independent arbitrators.</div>
      <div className="flexbox">
      Withdrawal Amount <input type="number" className="GreyInputNarrow" id="WithdrawalAmt" />
      </div>
      <div className="flexbox">
      Withdrawal Address <input className="GreyInputNarrow" id="WithdrawalAddr" />
      </div>
      <div className="flexbox">
      Withdrawal Reason <textarea className="GreyInputWide" id="WithdrawalReason" />
      </div>
      <Link to="/Check"><button className='BlueButton' style={{width:"271",height:"95px"}} onClick={SubmitRequest}>Confirm Request</button></Link>
    </>
  )
}

export default Request