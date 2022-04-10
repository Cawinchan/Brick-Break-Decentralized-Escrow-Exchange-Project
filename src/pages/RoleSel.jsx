import { useState } from 'react'
import logo from '../escrow.png'
import '../App.css'
import WalletBalance from '../components/WalletBalance'
import Install from '../components/Install';
import { Routes, Route, Link } from 'react-router-dom';


function RoleSel() {
  return (
    <>
    <h1>Role Selection</h1>
    <div className="GreyRoundDiv">
      <h2> Buyer </h2>
      <p>
        Fulfills the contract to obtain the money
      </p>
      
    </div>
    <div className="GreyRoundDiv">
      <h2> Seller </h2>
      <p>
        Pays the buyer after contract is fulfilled
      </p>
      
    </div>
    <h2> Are you the buyer or the seller?</h2>
    <div>
      <button className="BlueButton">Buyer</button>
      <button className="BlueButton">Seller</button>
    </div>
    </>
  )
}

export default RoleSel