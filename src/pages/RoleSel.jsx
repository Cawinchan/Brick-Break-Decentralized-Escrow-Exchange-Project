import { useState } from 'react'
import logo from '../escrow.png'
import '../App.css'
import WalletBalance from '../components/WalletBalance'
import Install from '../components/Install';
import { Routes, Route, Link } from 'react-router-dom';

function RoleSel() {
  function submitSeller() {
    var SellerAddr = document.getElementById("Address").value;
    localStorage.setItem("SellerAddr",SellerAddr);
    console.log("Seller Addr set");
  }

  function submitBuyer() {
    var BuyerAddr = document.getElementById("Address").value;
    localStorage.setItem("BuyerAddr",BuyerAddr);
    console.log("Buyer Addr set");
  }

  return (
    <>
    <div className="TopRightDiv">Buyer</div>
    <img src={logo} className="App-logo Home-Button" alt="logo" />
    <Link to="/"><div style={{position:"absolute",top:"2%",left:"2%",width:"12%",height:"20%"}} /></Link>
    <h1 style={{position:"absolute",top:"5%"}}>Role Selection</h1>
    <div className="" style={{width:"30vw",marginRight:"5vw", position: "absolute", top:"20%",left:"12%"}}>
      <h2> Buyer </h2>
      <p>
        Fulfills the contract to obtain the money
      </p>
      
    </div>
    <div className="" style={{width:"30vw",marginRight:"5vw", position: "absolute", top:"20%",right:"12%"}}>
      <h2> Seller </h2>
      <p>
        Pays the buyer after contract is fulfilled
      </p>
      
    </div>
    {/* <div className="flexbox" style={{position:"absolute",top:"40%"}}>Your Address <input className="GreyInputNarrow" id="Address" /></div> */}
    <h2 style={{marginTop:"20%"}}> Are you the buyer or the seller?</h2>
    <div>
    <Link to="/Terms"><button className="BlueButton" style={{marginRight: "5vw"}} onClick={submitBuyer}>Buyer</button></Link>
    <Link to="/Terms"><button className="BlueButton" style={{marginLeft: "5vw"}} onClick={submitSeller}>Seller</button></Link>
    </div>
    </>
  )
}

export default RoleSel