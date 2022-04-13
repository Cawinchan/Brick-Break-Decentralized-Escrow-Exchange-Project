import { useState } from 'react'
import logo from '../escrow.png'
import '../App.css'
import WalletBalance from '../components/WalletBalance'
import Install from '../components/Install';
import { Routes, Route, Link } from 'react-router-dom';


function RoleSel() {
  return (
    <>
    <h1 style={{position:"absolute",top:"10%"}}>Role Selection</h1>
    <div className="" style={{width:"30vw",marginRight:"5vw", position: "absolute", top:"206px",left:"207px"}}>
      <h2> Buyer </h2>
      <p>
        Fulfills the contract to obtain the money
      </p>
      
    </div>
    <div className="" style={{width:"30vw",marginRight:"5vw", position: "absolute", top:"206px",left:"850px"}}>
      <h2> Seller </h2>
      <p>
        Pays the buyer after contract is fulfilled
      </p>
      
    </div>
    <h2 style={{marginTop:"20%"}}> Are you the buyer or the seller?</h2>
    <div>
      <button className="BlueButton" style={{marginRight: "5vw"}}>Buyer</button>
      <button className="BlueButton" style={{marginLeft: "5vw"}}>Seller</button>
    </div>
    </>
  )
}

export default RoleSel