import { useState } from 'react'
import logo from '../escrow.png'
import '../App.css'
import WalletBalance from '../components/WalletBalance'
import Install from '../components/Install';
import { Routes, Route, Link } from 'react-router-dom';


function Start() {
  return (
    <>
    <div className="GreyRoundDiv">
      <p>
        Start an Escrow Request
        <br /> <br />
        You can define your contract here and rely on independent arbitrators should a dispute occur.
      </p>
      <button className="BlueButton">Start Escrow Request</button>
    </div>
    <div className="GreyRoundDiv">
      <p>
        Did the other party already create a Request?
        <br /> <br />
        Join their deal now to ensure a fuss free,secure and fair deal.
      </p>
      <button className="BlueButton">Join an Escrow</button>
    </div>
    </>
  )
}

export default Start