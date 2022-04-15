import { useState } from 'react'
import logo from '../escrow.png'
import '../App.css'
import WalletBalance from '../components/WalletBalance'
import Install from '../components/Install';
import { Routes, Route, Link } from 'react-router-dom';


function Request() {

  return (
    <>
      <h1> Request Withdrawal</h1>
      <div className="BlueRoundDiv">Upon withdrawal application confirmation, the other party will be asked for consent to withdraw the money. In the event that the other party refuses consent, the money in the escrow wallet will be transferred to a different wallet where the transaction will be decided by a group of independent arbitrators.</div>
      <div className="flexbox">
      Withdrawal Amount <input className="GreyInputNarrow" />
      </div>
      <div className="flexbox">
      Withdrawal Address <input className="GreyInputNarrow" />
      </div>
      <div className="flexbox">
      Withdrawal Reason <textarea className="GreyInputWide" />
      </div>
      <button className='BlueButton' style={{width:"271",height:"95px"}}>Confirm Request</button>
    </>
  )
}

export default Request